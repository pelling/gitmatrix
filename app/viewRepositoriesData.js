import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewRepositoriesData = React.createClass({


    render : function() {
      return (
        <div className="container-fluid">
          <h3>Repostiories</h3>
          {JSON.stringify(this.props.repositories)}
        </div>
      );
    }

});


export default ViewRepositoriesData;
