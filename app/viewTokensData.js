import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';



var ViewTokensData = React.createClass({


    render : function() {
      return (
        <div className="container-fluid">
          <h3>Tokens</h3>
          {JSON.stringify(this.props.tokens)}
        </div>
      );
    }

});


export default ViewTokensData;
