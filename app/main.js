import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import TopNav from './topnav.js';
import Home from './home.js';
import LoadAccessToken from './loadAccessToken.js';
import LoadUser from './loadUser.js';
import LoadRepositories from './loadRepositories.js';
import ProjectLoader from './projectLoader.js';
import SelectProject from './selectProject.js';
import BacklogLoader from './backlogLoader.js';
import Backlog from './backlog.js';
import Calibrate from './calibrate.js';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';

var Main = React.createClass({


  getInitialState : function() {
    return {
      client_id: 'not found',
      oauth_code: 'not found',
      access_token: 'not found',
      user: 'not found',
      repositories: 'not found',
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

  handleSignOut : function(){
    this.setState({oauth_code : 'not found'});
    this.setState({access_token : 'not found'});
    this.setState({user : 'not found'});
  },

  handleProjectsLoaded: function(newProjects){
    this.setState({projects : newProjects});
    consoleLog('projects loaded');
  },

  handleBacklogLoaded: function(newBacklog){
    this.setState({backlog : newBacklog});
    consoleLog('backlog loaded');
  },

    render: function () {
        let child = this.props.children && React.cloneElement(this.props.children, {
          client_id: this.state.client_id,
          oauth_code: this.state.oauth_code,
          access_token: this.state.access_token,
          user: this.state.user,
          repositories: this.state.repositories,
          session: this.state.session,
          projects: this.state.projects,
          backlog: this.state.backlog,
          onOauthCodeLoaded: this.handleOauthCodeLoaded.bind(this),
          onAccessTokenLoaded: this.handleAccessTokenLoaded.bind(this),
          onUserLoaded: this.handleUserLoaded.bind(this),
          onRepositoriesLoaded: this.handleRepositoriesLoaded.bind(this),
          onSignOut: this.handleSignOut.bind(this),
          onProjectsLoaded: this.handleProjectsLoaded.bind(this),
          onBacklogLoaded: this.handleBacklogLoaded.bind(this)
        } );

        return (
          <div>
            <div id="topnav"><TopNav user={this.state.user} onSignOut={this.handleSignOut.bind(this)} /></div>
            <div id="app">
              {child}
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
      <Route path="selectProject" component={SelectProject} />
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
