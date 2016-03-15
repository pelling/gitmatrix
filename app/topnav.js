import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var TopNav = React.createClass({

    handleSignOut: function(event) {
      this.props.onSignOut();
      browserHistory.push('/home');
    },


    render: function () {
        var wrapperClass = "gm-visible";
        if (this.props.user === "not found") { wrapperClass = "gm-hidden"; }
        return (
          <div className={wrapperClass}>
               <div className="row-fluid">
                   <div className="col-md-6 gm-topnav">
                     <Link to="/home" className="gm-nav-bar-logo">[ GitMatrix ]</Link>
                   </div>
                   <div className="col-md-6 gm-align-right gm-topnav">
                     <Link to="/selectProject"><i className="fa fa-github"></i>&nbsp; {this.props.user.name}</Link>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <a href="#" onClick={this.handleSignOut.bind(this)}><i className="fa fa-power-off"></i>&nbsp; Sign Out</a>
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
