import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var BacklogLoader = React.createClass({

  componentDidMount: function() {
      fetch('getbacklog')
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onBacklogLoaded(responseData);
        browserHistory.push('/backlog');
      })
      .catch((error) => {
        consoleLog('Error loading backlog: ' + error);
      });
    },

    render : function() {
      return (
        <div>Loading...</div>
      );
    }

});


export default BacklogLoader;
