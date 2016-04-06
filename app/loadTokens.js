import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadTokens = React.createClass({

  componentDidMount: function() {
      this.props.onAddToGitHubConsole('requesting tokens');
      fetch('gettokens?access_token=' + this.props.access_token + '&repo_id=' + this.props.repository.id)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onTokensLoaded(responseData);
        this.props.onAddToGitHubConsole('tokens received');
        browserHistory.push('/backlog');
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


export default LoadTokens;
