import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadAccessToken = React.createClass({

  componentDidMount: function() {
      this.props.onAddToGitHubConsole('requesting access token');
      fetch('getaccesstoken?code=' + this.props.oauth_code)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onAccessTokenLoaded(responseData);
        this.props.onAddToGitHubConsole('access token received: ' + responseData);
        browserHistory.push('/loadUser');
      })
      .catch((error) => {
        consoleLog('Error loading access token: ' + error);
      });

    },

    render : function() {
      return (
        <div>
        </div>
      );
    }

});


export default LoadAccessToken;
