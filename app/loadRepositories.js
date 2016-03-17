import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadRepositories = React.createClass({

  componentDidMount: function() {
      fetch('getrepositories?access_token=' + this.props.access_token)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onRepositoriesLoaded(responseData);
        //browserHistory.push('/selectProduct');
      })
      .catch((error) => {
        consoleLog('Error loading repositories: ' + error);
      });

    },

    render : function() {
      return (
        <div>
          Oauth Code = {this.props.oauth_code}<br/>
          Access Token = {this.props.access_token}<br/>
          User = {this.props.user.name}<br/>
          Loading Repositories...<br/>
          {JSON.stringify(this.props.repositories)}
        </div>
      );
    }

});


export default LoadRepositories;
