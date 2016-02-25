import React from 'react';
import TopNav from './topnav.js';
import SelectProjectContainer from './selectProject.js';


var Login = React.createClass({

    handleClickLogin: function(event) {
      React.render(<TopNav authenticated={true} />, document.getElementById('topnav'));
      React.render(<SelectProjectContainer />, document.getElementById('app'));
      // Ajax details ommitted since we never get here via onClick
    },


    render: function () {

        return (
          <div className="row-fluid">
            <div className="col-md-12">
                <span className="gm-login-header">[ GitMatrix ]</span><br/>
                <h3>Backlog prioritization via the consensus of the team.</h3>
              <a href="#" className="btn btn-lg btn-primary" role="button" onClick={this.handleClickLogin}>Login with GitHub</a>
              </div>
          </div>
        );
    }
});

export default Login;
