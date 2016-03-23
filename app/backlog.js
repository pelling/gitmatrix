import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var Backlog = React.createClass({


    render: function () {
        return (
          <div>
                <div className="row-fluid">
                      <div className="col-md-12">
                        <h3><Link to="/selectProduct">{this.props.user.name}</Link> / {this.props.repository.name}</h3>
                        <ContributorPills contributors={this.props.contributors} />
                      </div>
                      <div className="col-md-12">
                        <IssueTable issues={this.props.issues} />
                      </div>
                </div>

          </div>
        );
    }
});


export default Backlog;


var ContributorPills = React.createClass({
    render: function () {
      var contributorPills = this.props.contributors.map(function(contributor) {
          return <ContributorPill name={contributor.login}/>
      }.bind(this));
        return (
            <ul className="nav nav-pills" role="tablist">
                {contributorPills}
                <li role="presentation"><Link to="/calibrate">Calibrate</Link></li>
            </ul>
        );
    }
});




var ContributorPill = React.createClass({
    render: function () {
        return (
                <li role="presentation"><a href="#">{this.props.name}<span className="badge">100</span></a></li>
        );
    }
});


var IssueTable = React.createClass({
    render: function () {
      var issueRows = this.props.issues.map(function(issue) {
          return <IssueRow title={issue.title}/>
      }.bind(this));
        return (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>xxx</th>
                <th>yyy</th>
              </tr>
            </thead>
            <tbody>
              {issueRows}
            </tbody>
          </table>
        );
    }
});




var IssueRow = React.createClass({
    render: function () {
        return (
          <tr>
            <td>{this.props.title}</td>
            <td>Moe</td>
            <td>mary@example.com</td>
          </tr>
        );
    }
});
