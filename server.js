//  OpenShift sample Node application
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var fs      = require('fs');
var config = require('./config.json');
var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');



/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        // Set up the GitMatrix MongoDB variables using Openshifts pattern above
        self.dbhost = process.env.OPENSHIFT_MONGODB_DB_HOST;
        self.dbport = process.env.OPENSHIFT_MONGODB_DB_PORT;
        self.dbusername = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
        self.dbpassword = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
        self.dbsocket = process.env.OPENSHIFT_MONGODB_DB_SOCKET;
        self.dburl = process.env.OPENSHIFT_MONGODB_DB_URL;
        self.dbconnectionstring = 'mongodb://' + self.dbusername + ":" + self.dbpassword + "@" + self.dbhost + ':' + self.dbport + '/' + "gitmatrix";


        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };

        if (typeof self.dburl === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_MONGODB_DB_URL, using local DB');
            self.dbconnectionstring = 'mongodb://localhost:27017/mydatabase';
        };


        // TEMPORARY
        self.issue_votes = [{"issue":"142180356", "votes":[{"login":"pelling", "time":"555", "tokens":"100"},{"login":"pelling", "time":"666", "tokens":"200"}]},
          {"issue":"142180328", "votes":[{"login":"pelling", "time":"555", "tokens":"100"},{"login":"wilma", "time":"999", "tokens":"900"}]}
        ];


    };


    self.setupDatabase = function() {
      self.db = mongojs(self.dbconnectionstring);

      var githubAuthCollection = self.db.collection('githubAuthCollection');
      githubAuthCollection.findOne({
        _id: '001'
      }, function(err, doc) {
          self.client_id = doc.client_id;
          self.client_secret = doc.client_secret;
      });

    }


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'app.html': '' };
        }

        //  Local cache for static content.
        self.zcache['app.html'] = fs.readFileSync('./build/app.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('app.html') );
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        self.app.get('/getclientid', function(req, res){
          res.json(self.client_id);
          res.end();
        });

        self.app.get('/getaccesstoken', function(req, res){
          var code = req.query.code;
          var requestUrl = 'https://github.com/login/oauth/access_token?client_id=' + self.client_id + '&client_secret=' + self.client_secret + '&code=' + code;
          request.post(requestUrl, function(err, httpResponse, body){
                           console.log('httpResponse.body = ' + JSON.stringify(httpResponse.body));
                           var body_with_access_token = JSON.stringify(httpResponse.body);
                           var access_token_start = body_with_access_token.indexOf("access_token=") + 13;
                           var access_token_end = body_with_access_token.indexOf("&", access_token_start);
                           var access_token = JSON.stringify(httpResponse.body).slice(access_token_start, access_token_end);
                           console.log('access_token = ' + access_token);
                           res.json(access_token);
                           res.end();
                       }
          );
        });


        self.app.get('/getuser', function(req, res){
          var access_token = req.query.access_token;
          var relativeUrl = 'user?access_token=' + access_token;
          self.requestFromGitHub(relativeUrl, function(body) { res.json(body); res.end(); });





        });

        self.app.get('/getrepositories', function(req, res){
          var access_token = req.query.access_token;
          var relativeUrl = 'user/repos?access_token=' + access_token;
          self.requestFromGitHub(relativeUrl, function(body) { res.json(body); res.end(); });
        });



        self.app.get('/getcontributors', function(req, res){
          var access_token = req.query.access_token;
          var full_name = req.query.full_name;
          var relativeUrl = 'repos/' + full_name + '/contributors?access_token=' + access_token;
          self.requestFromGitHub(relativeUrl, function(body) { res.json(body); res.end(); });

        });


        self.app.get('/getissues', function(req, res){
          var access_token = req.query.access_token;
          var full_name = req.query.full_name;
          var relativeUrl = 'repos/' + full_name + '/issues?access_token=' + access_token;
          self.requestFromGitHub(relativeUrl, function(body) { res.json(body); res.end(); });

        });


        self.app.get('/getrepovotes', function(req, res){
          var access_token = req.query.access_token;
          var repo_id = req.query.repo_id;

          var repo_votes = self.db.collection('repo_votes');

          // first add an issue to repo if it doesn't exist

          repo_votes.update(
            { _id: repo_id },
            {
               $set: { _id: repo_id },
               $setOnInsert: { repo_votes:[] }
            },
            { upsert: true }
          );

          repo_votes.findOne({
            _id: repo_id
          }, function(err, doc) {
            console.log("repo_votes=" + doc._id);
            res.json(JSON.stringify(doc));
            res.end();
          });
        });


        self.app.get('/addtokens', function(req, res){
          var access_token = req.query.access_token;
          var repo_id = req.query.repo_id;
          var issue_id = req.query.issue_id;
          var tokens = req.query.tokens;
          var d = new Date();
          var n = d.getTime();

          var relativeUrl = 'user?access_token=' + access_token;
          self.requestFromGitHub(relativeUrl, function(body) {
                var login = JSON.parse(body).login;
                var issue_vote = {"login":login, "time":n, "tokens":tokens};

                var repo_votes = self.db.collection('repo_votes');
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
                            console.log("repo_votes=" + doc._id);
                            res.json(JSON.stringify(doc));
                            res.end();
                          });
                      }
                    );




                });


                /*
                repo_votes.findOne({
                  _id: repo_id
                }, function(err, doc) {
                  res.json(JSON.stringify(doc));
                  res.end();
                });
                */

          });
        });


        self.app.get('/consoleLog', function(req, res){
          var message = req.query.message;
          res.end();
          console.log(message);
        });


        // create application/x-www-form-urlencoded parser
        var urlencodedParser = bodyParser.urlencoded({ extended: false })

        self.app.post('/setgithubauth', urlencodedParser, function(req, res) {
          if (!req.body) return res.sendStatus(400)
          console.log("saved client_id = " + req.body.client_id);
          console.log("saved client_secret = " + req.body.client_secret);
          var githubAuthCollection = self.db.collection('githubAuthCollection');
          githubAuthCollection.save({_id:"001", client_id: req.body.client_id, client_secret: req.body.client_secret})
          res.send("success: keys have been updated");
          res.end();
        });




        self.app.use(express.static(__dirname + '/build'));

        if (config.enableAdmin) {
          self.app.use(express.static(__dirname + '/admin'));
        }


        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    self.requestFromGitHub = function(relativeUrl, callback) {
      var requestUrl = 'https://api.github.com/' + relativeUrl;
      request({
        uri: requestUrl,
        headers: {'User-Agent': 'gitmatrix'},
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
        }, function(error, response, body) {
          callback(body);
        });
    }



    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.setupDatabase();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();
