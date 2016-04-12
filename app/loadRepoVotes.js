import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadRepoVotes = React.createClass({

  componentDidMount: function() {
      this.props.onAddToGitHubConsole('requesting repo votes');
      fetch('getrepovotes?access_token=' + this.props.access_token + '&repo_id=' + this.props.repository.id)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onRepoVotesLoaded(responseData);
        this.props.onAddToGitHubConsole('repo votes received');
        browserHistory.push('/loadRepoTokens');
      })
      .catch((error) => {
        consoleLog('Error loading repo votes: ' + error);
      });

    },

    render : function() {
      return (
        <div>
        </div>
      );
    }

});


export default LoadRepoVotes;
