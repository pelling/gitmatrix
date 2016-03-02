import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import TopNav from './topnav.js';
import Home from './home.js';
import ProjectLoader from './projectLoader.js';
import SelectProject from './selectProject.js';
import Backlog from './backlog.js';
import 'whatwg-fetch';

var Main = React.createClass({

  getInitialState : function() {
    return {
      session: false,
      page: "home",
      projects: [],
      projectsLoaded: false
    };
  },

  handleSessionChange : function(newSession){
    this.setState({session:newSession});
    if (newSession) {
      consoleLog('session started');
    }
    if (!newSession) {
      this.setState({projectsLoaded : false});
      consoleLog('session killed');
    }
  },


  handleProjectsLoaded: function(newProjects){
    this.setState({projects : newProjects});
    this.setState({projectsLoaded : true});
    consoleLog('projects loaded');
  },



    render: function () {
        let child = this.props.children && React.cloneElement(this.props.children, {
          session: this.state.session,
          projects: this.state.projects,
          projectsLoaded: this.state.projectsLoaded,
          onSessionChange: this.handleSessionChange.bind(this),
          onProjectsLoaded: this.handleProjectsLoaded.bind(this)
        } );

        return (
          <div>
            <div id="topnav"><TopNav session={this.state.session} onSessionChange={this.handleSessionChange.bind(this)} /></div>
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
      <Route path="projectLoader" component={ProjectLoader} />
      <Route path="selectProject" component={SelectProject} />
      <Route path="backlog" component={Backlog} />
    </Route>
  </Router>
), document.getElementById('root'));


function consoleLog(message) {
  var d = new Date();
  var n = d.getTime();
  fetch('consoleLog?message=' + n + ' ' + message);
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
