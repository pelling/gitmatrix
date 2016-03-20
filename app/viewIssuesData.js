import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewIssuesData = React.createClass({


    render : function() {
      return (
        <div>
          <h1>Issues</h1>
          {JSON.stringify(this.props.issues)}
        </div>
      );
    }

});


export default ViewIssuesData;
