import React from 'react';
import TopNavComponent from './topnav.js';
import BacklogComponent from './backlog.js';

var SelectProjectComponent = React.createClass({


    getInitialState : function() {
      return {
        /*projects : []*/

        "projects": [ {"name":"Bitshares2","id":"000"},
                      {"name":"BlockchainJS","id":"001"}]
      };
    },


    componentDidMount: function () {

      $.ajax({url: "getprojects", success: function(result){
          this.setState( { projects: result });
        }.bind(this)
      });

    },



    handleClickProject: function(id) {

      React.render(<BacklogComponent id={id} />, document.getElementById('root'));
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

export default SelectProjectComponent;
