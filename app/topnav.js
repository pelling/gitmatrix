import React from 'react';
import Login from './login.js';

var TopNav = React.createClass({

    handleClickSignOut: function(event) {
      React.render(<TopNav authenticated={false} />, document.getElementById('topnav'));
      React.render(<Login />, document.getElementById('app'));
      // Ajax details ommitted since we never get here via onClick
    },


    render: function () {
        var wrapperClass = "gm-visible";
        if (!this.props.authenticated) { wrapperClass = "gm-hidden"; }
        return (
             <div className={wrapperClass}>
                  <div className="row-fluid">
                      <div className="col-md-6">
                        <span className="gm-nav-bar-logo">[ GitMatrix ]</span>
                      </div>
                      <div className="col-md-6 gm-align-right">
                        <a href="#" onClick={this.handleClickSignOut}>Chris Pelling</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="#" onClick={this.handleClickSignOut}>Sign Out</a>
                      </div>
                  </div>

                  <div className="row-fluid">
                      <div className="col-md-12 top-pink">
                      </div>
                  </div>
             </div>
        );
    }
});

export default TopNav;
