import React from 'react';
import 'whatwg-fetch';


var ProjectLoader = React.createClass({

  componentDidMount: function() {
      fetch('getprojects')
      .then((response) => response.json())
      .then((responseData) => {
        this.props.onProjectsLoaded(responseData);
        this.props.onPageChange("selectProject");
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
