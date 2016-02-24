import React from 'react';
import SelectProjectComponent from './selectProject.js';

var LoginComponent = React.createClass({

    handleClickLogin: function(event) {
      React.render(<SelectProjectComponent />, document.getElementById('root'));
      // Ajax details ommitted since we never get here via onClick
    },


    render: function () {

        return (
          <div>
            <div className="page-header">
              <span className="gm-login-header">[ GitMatrix ]</span><br/>
              <h3>Project governance for open source projects.</h3>
              <h5>Prioritize you backlog by voting with tokens.</h5>
            </div>
            <a href="#" className="btn btn-lg btn-primary" role="button" onClick={this.handleClickLogin}>Login with GitHub</a>
          </div>
        );
    }
});

React.render(<LoginComponent />, document.getElementById('root'));



/*
import React from 'react';

class Hello extends React.Component {
  render() {
    return (
        <h1>Hello React World revised</h1>
    );
  }
}

React.render(<Hello />, document.getElementById('root'));
*/
