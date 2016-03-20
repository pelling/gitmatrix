import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var TopNav = React.createClass({

    render: function () {

        var client_id = this.props.client_id;
        var onSignOut = this.props.onSignOut;
        var userName = this.props.user.name;
        var rightSide = 'connecting to GitHub...';
        if (this.props.oauth_code === "not found") { rightSide = function() {return <LogInControl client_id={client_id} /> }(); }
        if (this.props.user !== "not found") { rightSide = function() {return <SignOutControl onSignOut={onSignOut} userName={userName}/> }(); }
        return (
          <div>
               <div className="row-fluid">
                   <div className="col-md-6 gm-topnav">
                     <Link to="/home" className="gm-nav-bar-logo">[ GitMatrix ]</Link>
                   </div>
                   <div className="col-md-6 gm-align-right gm-topnav">
                     {rightSide}
                   </div>
               </div>

          </div>
        );
    }
});

export default TopNav;



var LogInControl = React.createClass({
    render: function () {
        var gitHubOauthLink = "https://github.com/login/oauth/authorize?client_id=" + this.props.client_id;
        return (
                <a href='#'  href={gitHubOauthLink}><i className="fa fa-github"></i>&nbsp; Login with GitHub</a>
        );
    }
});



var SignOutControl = React.createClass({

  handleSignOut: function(event) {
    this.props.onSignOut();
    browserHistory.push('/home');
  },

    render: function () {
        return (
                <div>
                  <Link to="/selectProduct">{this.props.userName}</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="#" onClick={this.handleSignOut.bind(this)}><i className="fa fa-power-off"></i>&nbsp; Sign Out</a>
                </div>
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
