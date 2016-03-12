import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var Login = React.createClass({

    handleClickLogin: function(event) {

      fetch('authenticate')
      .then((response) => response.json())
      .then((responseData) => {
        var session = responseData;
        this.props.onSessionChange(session);
        browserHistory.push('/selectProject');
      })
      .catch((error) => {
        consoleLog('Error authenticating: ' + error);
      });


      // React.render(<SelectProjectContainer session={session} />, document.getElementById('app'));
      // Ajax details ommitted since we never get here via onClick
    },


    render: function () {
        var gitHubOauthLink = "https://github.com/login/oauth/authorize?client_id=" + this.props.client_id;
        return (
              <a href="#" className="btn btn-lg btn-primary" role="button" href={gitHubOauthLink}>Login with GitHub</a>
        );
    }
});

export default Login;
