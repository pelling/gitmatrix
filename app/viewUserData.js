import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewUserData = React.createClass({


    render : function() {
      return (
        <div className="container-fluid">
          <h3>User</h3>
          {JSON.stringify(this.props.user)}
        </div>
      );
    }

});


export default ViewUserData;
