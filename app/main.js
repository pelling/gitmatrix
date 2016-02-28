import React from 'react';
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


  handlePageChange : function(newPage){
    this.setState({page:newPage});
  },

  handleProjectsLoaded: function(newProjects){
    this.setState({projects : newProjects});
    this.setState({projectsLoaded : true});
    consoleLog('projects loaded');
  },



    render: function () {
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
        return (
          <div>
            <div id="topnav"><TopNav session={this.state.session} onSessionChange={this.handleSessionChange.bind(this)} onPageChange={this.handlePageChange.bind(this)} /></div>
            <div id="app">
              {page}
            </div>
          </div>
        );
    }
});


React.render(<Main />, document.getElementById('root'));


function consoleLog(message) {
  var d = new Date();
  var n = d.getTime();
  fetch('consoleLog?message=' + n + ' ' + message);
}
