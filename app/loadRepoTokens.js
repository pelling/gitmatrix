import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadRepoTokens = React.createClass({

  componentDidMount: function() {
      this.props.onAddToGitHubConsole('requesting tokens');
      fetch('getrepotokens?access_token=' + this.props.access_token + '&repo_id=' + this.props.repository.id)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onRepoTokensLoaded(responseData);
        this.props.onAddToGitHubConsole('tokens received');

        var repo_tokens = JSON.parse(responseData);
        var login = this.props.user.login;
        var results = repo_tokens.user_tokens.filter(function(item) {return item.login == login});
        if (results.length === 0) {
            browserHistory.push('/initialize');
        } else {
            browserHistory.push('/backlog');
        }


      })
      .catch((error) => {
        consoleLog('Error loading tokens: ' + error);
      });

    },

    render : function() {
      return (
        <div>
        </div>
      );
    }

});


export default LoadRepoTokens;
