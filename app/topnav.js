import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var TopNav = React.createClass({

    handleClickSignOut: function(event) {
      this.props.onSessionChange(false);
      browserHistory.push('/home');
    },


    render: function () {
        var wrapperClass = "gm-visible";
        if (!this.props.session) { wrapperClass = "gm-hidden"; }
        return (
          <div className={wrapperClass}>
               <div className="row-fluid">
                   <div className="col-md-6">
                     <Link to="/home" className="gm-nav-bar-logo">[ GitMatrix ]</Link>
                   </div>
                   <div className="col-md-6 gm-align-right">
                     <Link to="/selectProject">{this.props.session.userName}</Link>
                     &nbsp;&nbsp;|&nbsp;&nbsp;
                     <a href="#" onClick={this.handleClickSignOut.bind(this)}>Sign Out</a>
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



/*


*/
