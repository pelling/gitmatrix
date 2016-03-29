import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewIssueVotesData = React.createClass({


    render : function() {
      return (
        <div className="container-fluid">
          <h3>Issue Votes</h3>
          {JSON.stringify(this.props.issue_votes)}
        </div>
      );
    }

});


export default ViewIssueVotesData;
