import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';


var SelectProject = React.createClass({


  componentWillMount: function () {
    if (this.props.projects.length == 0) {
      browserHistory.push('/projectLoader');
    }
  },

    render: function () {
        var projects = this.props.projects.map((project) => {
          return <Project id={project.id} name={project.name}/>
        });
        return (
              <div className="row-fluid">
                    <div className="col-md-4">
                    <h3>{this.props.session.userName}</h3>
                    <h4>Select GitHub Project:</h4>
                        <div className="list-group">
                            {projects}
                        </div>
                    </div>
                    <div className="col-md-8">

                    </div>
              </div>
        );
    }
});





var Project = React.createClass({

    render: function () {
        var backlogLink = "/backlogLoader?id=" + this.props.id;
        return (
                <Link to={backlogLink} className="list-group-item" >{this.props.name}</Link>
        );
    }
});




export default SelectProject;
