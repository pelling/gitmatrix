import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import TopNav from './topnav.js';
import GitHubConsole from './githubconsole.js';
import Home from './home.js';
import LoadAccessToken from './loadAccessToken.js';
import LoadUser from './loadUser.js';
import LoadRepositories from './loadRepositories.js';
import LoadIssues from './loadIssues.js';
import ViewUserData from './viewUserData.js';
import ViewRepositoriesData from './viewRepositoriesData.js';
import ViewIssuesData from './viewIssuesData.js';
import SelectProduct from './selectProduct.js';
import BacklogLoader from './backlogLoader.js';
import Backlog from './backlog.js';
import Calibrate from './calibrate.js';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';

var Main = React.createClass({


  getInitialState : function() {
    return {
      github_console: [],
      client_id: 'not found',
      oauth_code: 'not found',
      access_token: 'not found',
      user: 'not found',
      repositories: 'not found',
      repository: 'not found',
      issues: 'not found',
      session: false,
      projects: [],
      backlog: { "contributors":[], "items":[]}
    };
  },



  componentDidMount: function() {
      fetch('getclientid')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({client_id: responseData});
      })
      .catch((error) => {
        consoleLog('Error loading client_id: ' + error);
      });

    },


  handleAddToGitHubConsole: function(message){
      this.setState({github_console : this.state.github_console.concat([message])});
    },

  handleClearGitHubConsole: function(){
    this.setState({github_console : []});
    },

  handleOauthCodeLoaded: function(oauthCode){
    this.setState({oauth_code : oauthCode});
    consoleLog('oauth code loaded: ' +  oauthCode);
  },

  handleAccessTokenLoaded: function(accessToken){
    this.setState({access_token : accessToken});
    consoleLog('access token loaded: ' +  accessToken);
  },

  handleUserLoaded: function(user){
    var userJson = JSON.parse(user);
    this.setState({user : userJson});
    consoleLog('user loaded: ' +  userJson.name);
  },

  handleRepositoriesLoaded: function(repositories){
    var repositoriesJson = JSON.parse(repositories);
    this.setState({repositories : repositoriesJson});
    consoleLog('repositories loaded - number found: ' +  repositoriesJson.length);
  },

  handleRepositorySelected: function(index){
    var repository = this.state.repositories[index];
    this.setState({repository : repository});
    consoleLog('repository selected: ' +  repository.name);
  },

  handleIssuesLoaded: function(issues){
    var issuesJson = JSON.parse(issues);
    this.setState({issues : issuesJson});
    consoleLog('issues loaded - number found: ' +  issuesJson.length);
  },

  handleSignOut : function(){
    this.setState({oauth_code : 'not found'});
    this.setState({access_token : 'not found'});
    this.setState({user : 'not found'});
  },


  handleBacklogLoaded: function(newBacklog){
    this.setState({backlog : newBacklog});
    consoleLog('backlog loaded');
  },

    render: function () {
        var localDevLink = "http://127.0.0.1:8080?access_token=" + this.state.access_token;
        let child = this.props.children && React.cloneElement(this.props.children, {
          github_console: this.state.github_console,
          client_id: this.state.client_id,
          oauth_code: this.state.oauth_code,
          access_token: this.state.access_token,
          user: this.state.user,
          repositories: this.state.repositories,
          repository: this.state.repository,
          issues: this.state.issues,
          session: this.state.session,
          backlog: this.state.backlog,
          onAddToGitHubConsole: this.handleAddToGitHubConsole.bind(this),
          onClearGitHubConsole: this.handleClearGitHubConsole.bind(this),
          onOauthCodeLoaded: this.handleOauthCodeLoaded.bind(this),
          onAccessTokenLoaded: this.handleAccessTokenLoaded.bind(this),
          onUserLoaded: this.handleUserLoaded.bind(this),
          onRepositoriesLoaded: this.handleRepositoriesLoaded.bind(this),
          onSelectRepository: this.handleRepositorySelected.bind(this),
          onIssuesLoaded: this.handleIssuesLoaded.bind(this),
          onSignOut: this.handleSignOut.bind(this),
          onBacklogLoaded: this.handleBacklogLoaded.bind(this)
        } );

        return (
            <div>
                   <div id="topnav"><TopNav oauth_code={this.state.oauth_code} client_id={this.state.client_id} user={this.state.user} onSignOut={this.handleSignOut.bind(this)} /></div>
                   <GitHubConsole github_console={this.state.github_console} />
                   <div id="app">
                     {child}
                   </div>
                   <div id="gm-footer">
                      <a href={localDevLink}><i className="fa fa-copyright"></i></a> 2016
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/viewUserData">user data</Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/viewRepositoriesData">repositories data</Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/viewIssuesData">issues data</Link>
                   </div>

            </div>
        );
    }
});



React.render((
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="loadAccessToken" component={LoadAccessToken} />
      <Route path="loadUser" component={LoadUser} />
      <Route path="loadRepositories" component={LoadRepositories} />
      <Route path="loadIssues" component={LoadIssues} />
      <Route path="viewUserData" component={ViewUserData} />
      <Route path="viewRepositoriesData" component={ViewRepositoriesData} />
      <Route path="viewIssuesData" component={ViewIssuesData} />
      <Route path="viewIssuesData" component={ViewIssuesData} />
      <Route path="selectProduct" component={SelectProduct} />
      <Route path="backlogLoader" component={BacklogLoader} />
      <Route path="backlog" component={Backlog} />
      <Route path="calibrate" component={Calibrate} />
    </Route>
  </Router>
), document.getElementById('root'));




/*
var page = <Home session={this.state.session} onSessionChange={this.handleSessionChange.bind(this)} onPageChange={this.handlePageChange.bind(this)} />;
if (this.state.page === "selectProject" && !this.state.projectsLoaded ) {
  page = <ProjectLoader onProjectsLoaded={this.handleProjectsLoaded.bind(this)} onPageChange={this.handlePageChange.bind(this)}  />;
}
if (this.state.page === "selectProject" && this.state.projectsLoaded) {
  page = <SelectProject projects={this.state.projects} onPageChange={this.handlePageChange.bind(this)}  />;
}
if (this.state.page === "backlog") {
  page = <Backlog session={this.state.session} onPageChange={this.handlePageChange.bind(this)}  />;
}
*/
