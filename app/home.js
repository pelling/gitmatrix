import React from 'react';
import Login from './login.js';


var Home = React.createClass({

    render: function () {
      var loginControl = <Login />
      if (this.props.session) { loginControl = "You are currently signed in as " + this.props.session.userName; }

        return (
          <div className="row-fluid">
            <div className="col-md-12">
                <span className="gm-login-header">[ GitMatrix ]</span><br/>
                <h3>Backlog prioritization via the consensus of the team.</h3>
                {loginControl}
              </div>
          </div>
        );
    }
});


export default Home;
