import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadContributors = React.createClass({

  componentDidMount: function() {
    this.props.onAddToGitHubConsole('requesting contributors');
    fetch('getcontributors?access_token=' + this.props.access_token + '&full_name=' + this.props.repository.full_name)
    .then((response) => response.json())
    .then((responseData) => {
      this.props.onContributorsLoaded(responseData);
      this.props.onAddToGitHubConsole('contributors received');
      browserHistory.push('/loadIssues');
    })
    .catch((error) => {
      consoleLog('Error loading issues: ' + error);
    });

  },

    render : function() {
      return (
        <div>
        </div>
      );
    }

});


export default LoadContributors;
