import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewIssuesData = React.createClass({


    render : function() {
      return (
        <div className="container-fluid">
          <h3>Issues</h3>
          {JSON.stringify(this.props.issues)}
        </div>
      );
    }

});


export default ViewIssuesData;
