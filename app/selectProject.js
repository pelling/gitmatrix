import React from 'react';
import TopNav from './topnav.js';
import BacklogComponent from './backlog.js';
import 'whatwg-fetch';


var SelectProjectContainer = React.createClass({


  getInitialState : function() {
    return {
      "projects": []
    };
  },


  componentDidMount: function() {
      fetch('getprojects')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({projects: responseData});
      })
      .catch((error) => {
        console.log('Error fetching and parsing data from getprojects', error);
      });
    },

    render : function() {
      return (
        <SelectProjectComponent projects={this.state.projects} />
      );
    }

});

var SelectProjectComponent = React.createClass({


    render: function () {
        var projects = this.props.projects.map((project) => {
          return <Project id={project.id} name={project.name} />
        });

        return (
          <div>

                <div className="row-fluid">
                    <div className="col-md-12" >
                      <h3>pelling</h3>
                    </div>
                </div>

                <div className="row-fluid">
                      <div className="col-md-2">
                        <i className="fa fa-user fa-5x"></i>
                      </div>
                      <div className="col-md-10">
                        <h4>Select Project:</h4>
                            <div className="list-group">
                                {projects}
                            </div>
                      </div>
                </div>

          </div>
        );
    }
});





var Project = React.createClass({

    handleClickProject: function(id) {
      React.render(<BacklogComponent id={id} />, document.getElementById('app'));
      // Ajax details ommitted since we never get here via onClick
    },

    render: function () {
        return (
                <a href="#" className="list-group-item" onClick={this.handleClickProject.bind(this, this.props.id)}>{this.props.name}</a>
        );
    }
});




export default SelectProjectContainer;
