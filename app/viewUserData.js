import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewUserData = React.createClass({


    render : function() {
      return (
        <div>
          <h1>User</h1>
          {JSON.stringify(this.props.user)}
        </div>
      );
    }

});


export default ViewUserData;
