import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadRepositories = React.createClass({

  componentDidMount: function() {
      this.props.onAddToGitHubConsole('requesting repositories');
      fetch('getrepositories?access_token=' + this.props.access_token)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onRepositoriesLoaded(responseData);
        this.props.onAddToGitHubConsole('repositories received');
        browserHistory.push('/selectProduct');
      })
      .catch((error) => {
        consoleLog('Error loading repositories: ' + error);
      });

    },

    render : function() {
      return (
        <div>
        </div>
      );
    }

});


export default LoadRepositories;
