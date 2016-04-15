var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');




function gm_db() {


}


gm_db.initialize = function(openshift_env_vars) {

  // Set up the GitMatrix MongoDB variables using Openshifts pattern above
  var dbhost = openshift_env_vars.OPENSHIFT_MONGODB_DB_HOST;
  var dbport = openshift_env_vars.OPENSHIFT_MONGODB_DB_PORT;
  var dbusername = openshift_env_vars.OPENSHIFT_MONGODB_DB_USERNAME;
  var dbpassword = openshift_env_vars.OPENSHIFT_MONGODB_DB_PASSWORD;
  var dbsocket = openshift_env_vars.OPENSHIFT_MONGODB_DB_SOCKET;
  var dburl = openshift_env_vars.OPENSHIFT_MONGODB_DB_URL;
  var dbconnectionstring = 'mongodb://' + dbusername + ":" + dbpassword + "@" + dbhost + ':' + dbport + '/' + "gitmatrix";


  if (typeof dburl === "undefined") {
      //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
      //  allows us to run/test the app locally.
      console.warn('No OPENSHIFT_MONGODB_DB_URL, using local DB');
      dbconnectionstring = 'mongodb://localhost:27017/mydatabase';
  };

  this.db = mongojs(dbconnectionstring);

}



gm_db.saveGitHubAuth = function(client_id, client_secret, callback) {
  var githubAuthCollection = gm_db.db.collection('githubAuthCollection');
  githubAuthCollection.save({_id:"001", client_id: client_id, client_secret: client_secret});
  callback();

}



gm_db.getGitHubAuth = function(callback) {
  var githubAuthCollection = gm_db.db.collection('githubAuthCollection');
  githubAuthCollection.findOne({
    _id: '001'
  }, function(err, doc) {
    return callback(doc);
  });
}



gm_db.getRepoVotes = function(repo_id, callback) {

  var repo_votes = gm_db.db.collection('repo_votes');

  repo_votes.findOne({
    _id: repo_id
  }, function(err, doc) {
    if(doc === null) {
      // repo does not exist yet.  insert it
      repo_votes.insert(
        {_id: repo_id,
          repo_votes:[]
        }
      )
      callback('{"_id": "' + repo_id + '", "repo_votes":[]}');
    } else {
      callback(doc);
    }
  });

}



gm_db.addIssueVote = function(repo_id, issue_id, issue_vote, callback) {
  var repo_votes = gm_db.db.collection('repo_votes');
  // first add an issue to repo if it doesn't exist

  repo_votes.findOne(
    { _id: repo_id, "repo_votes.issue_id": issue_id },
    function(err, doc) {
      if (doc === null) {
        // issue has not been added yet (no tokens).  Need to add blank issue to repo_votes
        repo_votes.update(
          { _id: repo_id },
          { $push: { repo_votes: {issue_id: issue_id} } }
        );

      }

      repo_votes.update(
        { _id: repo_id, "repo_votes.issue_id": issue_id },
        { $push: { "repo_votes.$.issue_votes" : issue_vote } },
        function(err, doc) {

            repo_votes.findOne({
              _id: repo_id
            }, function(err, doc) {
              callback(doc);
            });
        }
      );

  });

}




module.exports = gm_db
