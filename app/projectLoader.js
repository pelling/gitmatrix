import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import 'whatwg-fetch';


var ProjectLoader = React.createClass({

  componentDidMount: function() {
      fetch('getprojects')
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onProjectsLoaded(responseData);
        browserHistory.push('/selectProject');
      })
      .catch((error) => {
        console.log('Error fetching and parsing data from getprojects', error);
      });
    },

    render : function() {
      return (
        <div>Loading...</div>
      );
    }

});


export default ProjectLoader;
