import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var Backlog = React.createClass({


    render: function () {
        return (
          <div>
                <div className="row-fluid">
                      <div className="col-md-12">
                        <h3><Link to="/selectProduct">{this.props.user.login}</Link> / {this.props.repository.name}</h3>
                        <ContributorPills contributors={this.props.contributors} />
                      </div>
                      <div className="col-md-12">
                        <IssueTable issues={this.props.issues} contributors={this.props.contributors}/>
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
          return <IssueRow title={issue.title} contributors={this.props.contributors}/>
      }.bind(this));

      var contributorHeaders = this.props.contributors.map(function(contributor) {
          return <ContributorHeader name={contributor.login}/>
      }.bind(this));


        return (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                {contributorHeaders}
              </tr>
            </thead>
            <tbody>
              {issueRows}
            </tbody>
          </table>
        );
    }
});

var ContributorHeader = React.createClass({
    render: function () {
        return (
                <th>{this.props.name}</th>
        );
    }
});


var IssueRow = React.createClass({


    render: function () {

      var contributorCols = this.props.contributors.map(function(contributor) {
          return <ContributorCol count={200}/>
      }.bind(this));

        return (
          <tr>
            <td>{this.props.title}</td>
            {contributorCols}
          </tr>
        );
    }
});


var ContributorCol = React.createClass({
    render: function () {
        return (
                <td>{this.props.count}</td>
        );
    }
});
