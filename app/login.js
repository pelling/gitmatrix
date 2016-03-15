import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var Login = React.createClass({


    render: function () {
        var gitHubOauthLink = "https://github.com/login/oauth/authorize?client_id=" + this.props.client_id;
        return (
              <a href="#" className="btn btn-lg btn-primary" role="button" href={gitHubOauthLink}>Login with GitHub</a>
        );
    }
});

export default Login;
