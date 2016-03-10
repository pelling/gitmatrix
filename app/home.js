import React from 'react';
import Login from './login.js';
import { Router, Route, Link, browserHistory } from 'react-router';


var Home = React.createClass({

  getInitialState : function() {
    return {
      dbtest: "test not yet initialized"
    };
  },


  componentDidMount: function() {
      this.setState({dbtest: "db connection did not work"});
      fetch('dbtest')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({dbtest: responseData.name});
      })
      .catch((error) => {
        consoleLog('Error loading db test');
      });

    },


    render: function () {
      var loginControl = <Login session={this.props.session} onSessionChange={this.props.onSessionChange} />;
      if (this.props.session) {
        loginControl = <div>You are currently signed in as <Link to='/selectProject'>{this.props.session.userName}</Link>.</div>;
      }

        return (
          <div className="row-fluid">
            <div className="col-md-12">
                <span className="gm-login-header">[ GitMatrix ]</span><br/>
                <h3>Backlog prioritization via the consensus of the team.</h3>
                {loginControl}
                <br/><br/>
                {this.state.dbtest}
              </div>
          </div>
        );
    }
});


export default Home;
