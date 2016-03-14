import React from 'react';
import Login from './login.js';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';

var Home = React.createClass({

  componentDidMount: function() {
      var oauth_code = this.props.location.query.code;
      if (oauth_code === undefined) {
        // home page accessed without GitHub oauth code

      } else {
        consoleLog('GitHub has passed oauth code: ' + oauth_code);
        consoleLog('Saving code to state and redirecting to LoadAccessToken');
        this.props.onOauthCodeLoaded(oauth_code);
        browserHistory.push('/loadAccessToken');
      }

    },

    render: function () {
      var loginControl = <Login session={this.props.session} onSessionChange={this.props.onSessionChange} client_id={this.props.client_id} />;
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
