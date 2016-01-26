var SelectProjectComponent = React.createClass({


    getInitialState : function() {
      return {
        projects : []
      };
    },


    componentDidMount: function () {

      $.ajax({url: "getprojects", success: function(result){
          this.setState( { projects: result });
        }.bind(this)
      });

    },



    handleClickProject: function(id) {

      React.render(<BacklogComponent id={id} />, document.getElementById('app'));
      // Ajax details ommitted since we never get here via onClick
    },


    render: function () {
        var projectComponents = this.state.projects.map(function(project) {
            return <a href="#" className="list-group-item" onClick={this.handleClickProject.bind(this, project.id)}>{project.name}</a>;
        }.bind(this));
        return (
          <div>

              <TopNavComponent />

                <div className="row-fluid">
                    <div className="col-md-12 top-pink" >
                      <h3>pelling</h3>
                    </div>
                </div>

                <div className="row-fluid">
                      <div className="col-md-2">
                        <i className="fa fa-user fa-5x"></i>
                      </div>
                      <div className="col-md-10">
                        <h4>Select Project:</h4>
                            <div className="list-group">{projectComponents}</div>
                      </div>
                </div>

          </div>
        );
    }
});


var TopNavComponent = React.createClass({

    handleClickProject: function(event) {
      React.render(<BacklogComponent />, document.getElementById('app'));
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
                         <li><a href="./index.html">Sign Out</a></li>
                       </ul>
                     </div>
                  </div>
                </div>

          </div>
        );
    }
});
