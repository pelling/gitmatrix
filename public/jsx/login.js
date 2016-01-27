var LoginComponent = React.createClass({

    handleClickLogin: function(event) {

      React.render(<SelectProjectComponent />, document.getElementById('app'));
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

React.render(<LoginComponent />, document.getElementById('app'));



/*
<div className="page-header">
  <span style="font-family: 'Kreon', serif; color:#F20C4D; font-size:6em;">[ GitMatrix ]</span><br/>
  <h3>Prioritize your backlog using the collective intelligence of your team.</h3>
</div>
<a href="./select.html" className="btn btn-lg btn-primary" role="button">Login with GitHub</a>



*/
