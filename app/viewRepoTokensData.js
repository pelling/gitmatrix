import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewRepoTokensData = React.createClass({


    render : function() {
      return (
        <div className="container-fluid">
          <h3>Tokens</h3>
          {JSON.stringify(this.props.repo_tokens)}
        </div>
      );
    }

});


export default ViewRepoTokensData;
