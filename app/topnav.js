import React from 'react';
import Home from './home.js';

var TopNav = React.createClass({

    handleClickHome: function(event) {
      React.render(<Home session={this.props.session}  />, document.getElementById('app'));
    },


    handleClickSignOut: function(event) {
      React.render(<TopNav session={false} />, document.getElementById('topnav'));
      React.render(<Home session={false}  />, document.getElementById('app'));
    },


    render: function () {
        var wrapperClass = "gm-visible";
        if (!this.props.session) { wrapperClass = "gm-hidden"; }
        return (
             <div className={wrapperClass}>
                  <div className="row-fluid">
                      <div className="col-md-6">
                        <a href="#" className="gm-nav-bar-logo" onClick={this.handleClickHome}>[ GitMatrix ]</a>
                      </div>
                      <div className="col-md-6 gm-align-right">
                        <a href="#" onClick={this.handleClickSignOut}>{this.props.session.userName}</a>
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
