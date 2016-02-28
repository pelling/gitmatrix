import React from 'react';

var TopNav = React.createClass({

    handleClickHome: function(event) {
      this.props.onPageChange("home");
    },

    handleClickUserName: function(event) {
      this.props.onPageChange("selectProject");
    },

    handleClickSignOut: function(event) {
      this.props.onSessionChange(false);
      this.props.onPageChange("home");
    },


    render: function () {
        var wrapperClass = "gm-visible";
        if (!this.props.session) { wrapperClass = "gm-hidden"; }
        return (
          <div className={wrapperClass}>
               <div className="row-fluid">
                   <div className="col-md-6">
                     <a href="#" className="gm-nav-bar-logo" onClick={this.handleClickHome.bind(this)}>[ GitMatrix ]</a>
                   </div>
                   <div className="col-md-6 gm-align-right">
                     <a href="#" onClick={this.handleClickUserName.bind(this)}>{this.props.session.userName}</a>
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
