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

        return (
              <a href="#" className="btn btn-lg btn-primary" role="button" onClick={this.handleClickLogin}>Login with GitHub</a>
        );
    }
});

export default Login;
