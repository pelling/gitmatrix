import React from 'react';


var SelectProject = React.createClass({


    render: function () {
        var projects = this.props.projects.map((project) => {
          return <Project id={project.id} name={project.name} onPageChange={this.props.onPageChange} />
        });

        return (
              <div className="row-fluid">
                    <div className="col-md-2">
                    <h4>Select Project:</h4>
                        <div className="list-group">
                            {projects}
                        </div>
                    </div>
                    <div className="col-md-10">

                    </div>
              </div>
        );
    }
});





var Project = React.createClass({

    handleClickProject: function(id) {
      this.props.onPageChange("backlog");
    },

    render: function () {
        return (
                <a href="#" className="list-group-item" onClick={this.handleClickProject.bind(this, this.props.id)}>{this.props.name}</a>
        );
    }
});




export default SelectProject;
