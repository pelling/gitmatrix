import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';


var Initialize = React.createClass({

  componentWillMount: function () {
    this.props.onClearGitHubConsole();
  },


  render : function() {
    return (
      <div className="container-fluid">
        <h3>Initialize</h3>
      </div>
    );
  }
  

});


export default Initialize;
