import React from 'react';
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



      var access_token = this.props.location.query.access_token;
      if (access_token === undefined) {
        // home page accessed without access_token

      } else {
        consoleLog('GitHub has passed access_token: ' + access_token);
        consoleLog('Saving access_token to state and redirecting to LoadUser');
        this.props.onAccessTokenLoaded(access_token);
        browserHistory.push('/loadUser');
      }




    },

    render: function () {

        return (
          <div className="row-fluid">
            <div className="col-md-12">
                <h3>Backlog prioritization via the consensus of the team.</h3>

              </div>
          </div>
        );
    }
});


export default Home;
