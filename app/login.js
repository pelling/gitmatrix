import React from 'react';
import TopNav from './topnav.js';
import SelectProjectContainer from './selectProject.js';


var Login = React.createClass({

    handleClickLogin: function(event) {
      var session = {
        userName: "Chris Pelling",
        userId:"444555"
      };

      React.render(<TopNav session={session} />, document.getElementById('topnav'));
      React.render(<SelectProjectContainer session={session} />, document.getElementById('app'));
      // Ajax details ommitted since we never get here via onClick
    },


    render: function () {

        return (
              <a href="#" className="btn btn-lg btn-primary" role="button" onClick={this.handleClickLogin}>Login with GitHub</a>
        );
    }
});

export default Login;
