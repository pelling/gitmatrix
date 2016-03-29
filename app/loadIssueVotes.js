import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadIssueVotes = React.createClass({

  componentDidMount: function() {
      this.props.onAddToGitHubConsole('requesting issue votes');
      fetch('getissuevotes?access_token=' + this.props.access_token + '&full_name=' + this.props.repository.full_name)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onIssueVotesLoaded(responseData);
        this.props.onAddToGitHubConsole('issue votes received');
        browserHistory.push('/backlog');
      })
      .catch((error) => {
        consoleLog('Error loading issue votes: ' + error);
      });

    },

    render : function() {
      return (
        <div>
        </div>
      );
    }

});


export default LoadIssueVotes;
