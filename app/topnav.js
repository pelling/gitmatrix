import React from 'react';


var TopNavComponent = React.createClass({

    handleClickSignOut: function(event) {
      React.render(<LoginComponent />, document.getElementById('root'));
      // Ajax details ommitted since we never get here via onClick
    },


    render: function () {

        return (
          <div>

                <div className="row-fluid ">
                  <div className="col-md-11">
                    <span className="gm-nav-bar-logo">[ GitMatrix ]</span>
                  </div>
                  <div className="col-md-1 gm-user-dropdown">
                      <div className="dropdown">
                       <a className="dropdown-toggle gm-user-dropdown-icons" type="button" data-toggle="dropdown"><i className="fa fa-user"></i>
                       <span className="caret"></span></a>
                       <ul className="dropdown-menu">
                         <li><a href="./documentation.html">GitMatrix Documentation</a></li>
                         <li><a href="#" onClick={this.handleClickSignOut}>Sign Out</a></li>
                       </ul>
                     </div>
                  </div>
                </div>

          </div>
        );
    }
});

export default TopNavComponent;
