import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var LoadIssues = React.createClass({

  componentDidMount: function() {
      fetch('getissues?access_token=' + this.props.access_token)
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onIssuesLoaded(responseData);
        //browserHistory.push('/backlog');
      })
      .catch((error) => {
        consoleLog('Error loading issues: ' + error);
      });

    },

    render : function() {
      return (
        <div>
          Issues = {JSON.stringify(this.props.issues)}
        </div>
      );
    }

});


export default LoadIssues;
