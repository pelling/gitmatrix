import React from 'react';
import Login from './login.js';
import { Router, Route, Link, browserHistory } from 'react-router';


var Home = React.createClass({



    render: function () {
      var loginControl = <Login session={this.props.session} onSessionChange={this.props.onSessionChange} />;
      if (this.props.session) {
        loginControl = <div>You are currently signed in as <Link to='/selectProject'>{this.props.session.userName}</Link>.</div>;
      }

        return (
          <div className="row-fluid">
            <div className="col-md-12">
                <span className="gm-login-header">[ GitMatrix ]</span><br/>
                <h3>Backlog prioritization via the consensus of the team.</h3>
                {loginControl}
              </div>
          </div>
        );
    }
});


export default Home;
