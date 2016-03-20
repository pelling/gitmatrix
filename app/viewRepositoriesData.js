import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewRepositoriesData = React.createClass({


    render : function() {
      return (
        <div>
          <h1>Repostiories</h1>
          {JSON.stringify(this.props.repositories)}
        </div>
      );
    }

});


export default ViewRepositoriesData;
