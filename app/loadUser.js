import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadUser = React.createClass({

  componentDidMount: function() {

      this.props.onAddToGitHubConsole('requesting user');
      fetch('getuser?access_token=' + this.props.access_token)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onUserLoaded(responseData);
        this.props.onAddToGitHubConsole('user received');
        browserHistory.push('/loadRepositories');
      })
      .catch((error) => {
        consoleLog('Error loading user: ' + error);
      });

    },

    render : function() {
      return (
        <div>
        </div>
      );
    }

});


export default LoadUser;
