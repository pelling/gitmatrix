import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import TopNav from './topnav.js';
import GitHubConsole from './githubconsole.js';
import Home from './home.js';
import LoadAccessToken from './loadAccessToken.js';
import LoadUser from './loadUser.js';
import LoadRepositories from './loadRepositories.js';
import LoadContributors from './loadContributors.js';
import LoadIssues from './loadIssues.js';
import LoadRepoVotes from './loadRepoVotes.js';
import LoadRepoTokens from './loadRepoTokens.js';
import Initialize from './initialize.js';
import ViewUserData from './viewUserData.js';
import ViewRepositoriesData from './viewRepositoriesData.js';
import ViewContributorsData from './viewContributorsData.js';
import ViewIssuesData from './viewIssuesData.js';
import ViewRepoVotesData from './viewRepoVotesData.js';
import ViewRepoTokensData from './viewRepoTokensData.js';
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
      contributors: 'not found',
      issues: 'not found',
      repo_votes: 'not found',
      repo_tokens: 'not found',
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

      var access_token = readCookie("access_token");
      if (access_token.length !== null) {
        this.setState({access_token : access_token});
        browserHistory.push('/loadUser');
      }
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
    document.cookie="access_token=" + accessToken;
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

  handleContributorsLoaded: function(contributors){
    var contributorsJson = JSON.parse(contributors);
    this.setState({contributors : contributorsJson});
    consoleLog('contributors loaded - number found: ' +  contributorsJson.length);
  },

  handleIssuesLoaded: function(issues){
    var issuesJson = JSON.parse(issues);
    this.setState({issues : issuesJson});
    consoleLog('issues loaded - number found: ' +  issuesJson.length);
  },

  handleRepoVotesLoaded: function(repoVotes){
    var repoVotesJson = JSON.parse(repoVotes);
    this.setState({repo_votes : repoVotesJson});
    consoleLog('repo votes loaded - number found: ' +  repoVotesJson.length);
  },

  handleRepoTokensLoaded: function(repoTokens){
    var repoTokensJson = JSON.parse(repoTokens);
    this.setState({repo_tokens : repoTokensJson});
    consoleLog('tokens loaded - number found: ' +  repoTokensJson.length);
  },


  handleRefreshTokens: function() {
    fetch('getrepotokens?access_token=' + this.state.access_token + '&repo_id=' + this.state.repository.id)
    .then((response) => response.json())
    .then((responseData) => {
      this.handleRepoTokensLoaded(responseData);
    })
    .catch((error) => {
      consoleLog('Error updating tokens: ' + error);
    });
  },



  handleAddTokens: function(issue_id, tokens){
    this.handleAddToGitHubConsole('adding tokens');
    fetch('addtokens?access_token=' + this.state.access_token + '&repo_id=' + this.state.repository.id + '&issue_id=' + issue_id + '&tokens=' + tokens)
    .then((response) => response.json())
    .then((responseData) => {
      this.handleClearGitHubConsole();
      var repoVotesJson = JSON.parse(responseData);
      this.setState({repo_votes : repoVotesJson});
      this.handleRefreshTokens();
    })
    .catch((error) => {
      consoleLog('Error adding tokens: ' + error);
    });
  },

  handleSignOut : function(){
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    this.setState({oauth_code : 'not found'});
    this.setState({access_token : 'not found'});
    this.setState({user : 'not found'});
    this.setState({repositories : 'not found'});
    this.setState({repository : 'not found'});
    this.setState({contributors : 'not found'});
    this.setState({issues : 'not found'});
    this.setState({repo_votes : 'not found'});
    this.setState({repo_tokens : 'not found'});
  },


  handleBacklogLoaded: function(newBacklog){
    this.setState({backlog : newBacklog});
    consoleLog('backlog loaded');
  },

  handleChangeTokensPerSecond: function(new_tokens_per_second){
    alert(new_tokens_per_second);
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
          contributors: this.state.contributors,
          issues: this.state.issues,
          repo_votes: this.state.repo_votes,
          repo_tokens: this.state.repo_tokens,
          session: this.state.session,
          backlog: this.state.backlog,
          onAddToGitHubConsole: this.handleAddToGitHubConsole.bind(this),
          onClearGitHubConsole: this.handleClearGitHubConsole.bind(this),
          onOauthCodeLoaded: this.handleOauthCodeLoaded.bind(this),
          onAccessTokenLoaded: this.handleAccessTokenLoaded.bind(this),
          onUserLoaded: this.handleUserLoaded.bind(this),
          onRefreshTokens: this.handleRefreshTokens.bind(this),
          onRepositoriesLoaded: this.handleRepositoriesLoaded.bind(this),
          onSelectRepository: this.handleRepositorySelected.bind(this),
          onContributorsLoaded: this.handleContributorsLoaded.bind(this),
          onIssuesLoaded: this.handleIssuesLoaded.bind(this),
          onRepoVotesLoaded: this.handleRepoVotesLoaded.bind(this),
          onRepoTokensLoaded: this.handleRepoTokensLoaded.bind(this),
          onAddTokens: this.handleAddTokens.bind(this),
          onSignOut: this.handleSignOut.bind(this),
          onBacklogLoaded: this.handleBacklogLoaded.bind(this),
          onChangeTokensPerSecond: this.handleChangeTokensPerSecond.bind(this)
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
                      <Link to="/viewContributorsData">contributors data</Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/viewIssuesData">issues data</Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/viewRepoVotesData">repo votes data</Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/viewRepoTokensData">repo tokens data</Link>
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
      <Route path="loadContributors" component={LoadContributors} />
      <Route path="loadIssues" component={LoadIssues} />
      <Route path="loadRepoVotes" component={LoadRepoVotes} />
      <Route path="loadRepoTokens" component={LoadRepoTokens} />
      <Route path="initialize" component={Initialize} />
      <Route path="viewUserData" component={ViewUserData} />
      <Route path="viewRepositoriesData" component={ViewRepositoriesData} />
      <Route path="viewContributorsData" component={ViewContributorsData} />
      <Route path="viewIssuesData" component={ViewIssuesData} />
      <Route path="viewRepoVotesData" component={ViewRepoVotesData} />
      <Route path="viewRepoTokensData" component={ViewRepoTokensData} />
      <Route path="selectProduct" component={SelectProduct} />
      <Route path="backlogLoader" component={BacklogLoader} />
      <Route path="backlog" component={Backlog} />
      <Route path="calibrate" component={Calibrate} />
    </Route>
  </Router>
), document.getElementById('root'));


function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

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
