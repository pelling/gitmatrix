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
        //browserHistory.push('/loadUser');
      })
      .catch((error) => {
        consoleLog('Error loading user: ' + error);
      });

    },

    render : function() {
      return (
        <div>Loading GitHub User using Access Token = {this.props.access_token}<br/>
        User = {this.props.user.name}
        </div>
      );
    }

});


export default LoadUser;
