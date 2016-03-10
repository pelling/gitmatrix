import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var ProjectLoader = React.createClass({

  componentDidMount: function() {
      fetch('getprojects')
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onProjectsLoaded(responseData);
        browserHistory.push('/selectProject');
      })
      .catch((error) => {
        consoleLog('Error loading project list: ' + error);
      });

    },

    render : function() {
      return (
        <div>Loading...</div>
      );
    }

});


export default ProjectLoader;
