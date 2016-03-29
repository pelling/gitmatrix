import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadIssues = React.createClass({

  componentDidMount: function() {
      this.props.onAddToGitHubConsole('requesting issues');
      fetch('getissues?access_token=' + this.props.access_token + '&full_name=' + this.props.repository.full_name)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onIssuesLoaded(responseData);
        this.props.onAddToGitHubConsole('issues received');
        browserHistory.push('/loadIssueVotes');
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


export default LoadIssues;
