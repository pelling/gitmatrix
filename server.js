//  OpenShift sample Node application
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var fs      = require('fs');
var config = require('./config.json');
var gm_db = require('./gm_db');




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

        gm_db.initialize(process.env);

        gm_db.getGitHubAuth(function(doc) {
          self.client_id = doc.client_id;
          self.client_secret = doc.client_secret;
          console.log("client id = " +  self.client_id);
        });



        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };




    };


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

          gm_db.getRepoVotes(repo_id, function(doc){
            res.json(JSON.stringify(doc));
            res.end();
          });


        });



        self.app.get('/getrepotokens', function(req, res){
          var access_token = req.query.access_token;
          var repo_id = req.query.repo_id;
          var d = new Date();
          var n = d.getTime();

          var user_tokens = [{"login":"pelling", "total_at_last_transaction":"12000", "time_at_last_transaction":"1460432008498", "tokens_per_second":".001"}];

          for (var j = 0; j < user_tokens.length; j++){
            user_tokens[j].seconds_transpired = (n - Number(user_tokens[j].time_at_last_transaction)) / 1000;
            user_tokens[j].tokens_accumulated = user_tokens[j].seconds_transpired * Number(user_tokens[j].tokens_per_second);
            user_tokens[j].new_total =  user_tokens[j].tokens_accumulated  + Number(user_tokens[j].total_at_last_transaction);
          }

          var doc = {_id: repo_id, user_tokens: user_tokens};
          res.json(JSON.stringify(doc));
          res.end();

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
                gm_db.addIssueVote(repo_id, issue_id, issue_vote, function(doc){
                  res.json(JSON.stringify(doc));
                  res.end();
                });

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
          gm_db.saveGitHubAuth(req.body.client_id, req.body.client_secret, function(){
            res.send("success: keys have been updated");
            res.end();
            console.log("saved client_id = " + client_id);
            console.log("saved client_secret = " + client_secret);
          });

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
