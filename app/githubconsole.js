import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';


var GitHubConsole = React.createClass({

  render: function () {
      var messages = this.props.github_console.map((message) => {
        return <Message text={message}/>
      });
      return (
            <div className="gm_gitHubConsole">
                {messages}
            </div>
      );
  }


});

export default GitHubConsole;

var Message = React.createClass({

    render: function () {
        return (
                <span>>_ {this.props.text}<br/></span>
        );
    }
});


/*
var userLink = "";
var gitHubOauthLink = "https://github.com/login/oauth/authorize?client_id=" + this.props.client_id;
var logInOrSignOut = <a href='#'  href={gitHubOauthLink}>Login with GitHub</a>;

if (!this.props.user === "not found") {
  userLink = <Link to="/selectProject"><i className="fa fa-github"></i>&nbsp; {this.props.user.name}</Link>;
  logInOrSignOut = <a href="#" onClick={this.handleSignOut.bind(this)}><i className="fa fa-power-off"></i>&nbsp; Sign Out</a>
}

*/
