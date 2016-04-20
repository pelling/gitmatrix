import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var Initialize = React.createClass({

  componentWillMount: function () {
    this.props.onClearGitHubConsole();
  },

  handleInitializeTokens: function() {
    this.props.onAddToGitHubConsole('initializing first 200 tokens');
    fetch('initializeusertokens?access_token=' + this.props.access_token + '&repo_id=' + this.props.repository.id)
    .then((response) => response.json())
    .then((responseData) => {
      this.props.onRepoTokensLoaded(responseData);
      this.props.onAddToGitHubConsole('token initialization complete');
      browserHistory.push('/backlog');
    })
    .catch((error) => {
      consoleLog('Error initializing user tokens: ' + error);
    });
  },


  render : function() {
    return (
      <div className="container-fluid">
        <h3>Initialize</h3>
        <a href="#" className="btn btn-primary" role="button" onClick={this.handleInitializeTokens.bind(this)}><i className="fa fa-plus"></i> Get Started with First 200 Tokens</a>
      </div>
    );
  }


});


export default Initialize;
