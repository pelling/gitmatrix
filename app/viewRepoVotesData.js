import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewRepoVotesData = React.createClass({


    render : function() {
      return (
        <div className="container-fluid">
          <h3>Repo Votes</h3>
          {JSON.stringify(this.props.repo_votes)}
        </div>
      );
    }

});


export default ViewRepoVotesData;
