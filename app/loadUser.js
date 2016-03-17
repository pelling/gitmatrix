import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadUser = React.createClass({

  componentDidMount: function() {
      fetch('getuser?access_token=' + this.props.access_token)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onUserLoaded(responseData);
        browserHistory.push('/loadRepositories');
      })
      .catch((error) => {
        consoleLog('Error loading user: ' + error);
      });

    },

    render : function() {
      return (
        <div>
          Oauth Code = {this.props.oauth_code}<br/>
          Access Token = {this.props.access_token}<br/>
          Loading User...
        </div>
      );
    }

});


export default LoadUser;