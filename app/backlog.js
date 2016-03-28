import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var Backlog = React.createClass({

  componentWillMount: function () {
    this.props.onClearGitHubConsole();
    if (this.props.issues == 'not found') {
      //problem -- repositories were not loaded!
    }
  },

    render: function () {
        return (
          <div>
                <div className="row-fluid">
                      <div className="col-md-12">
                        <h3><Link to="/selectProduct">{this.props.user.login}</Link> / {this.props.repository.name}</h3>
                         my upvote tokens:&nbsp; <i className="fa fa-arrow-up"></i> 1355
                      </div>
                      <div className="col-md-12">
                        <IssueTable issue_votes={this.props.issue_votes} issues={this.props.issues} contributors={this.props.contributors}/>
                      </div>
                </div>

          </div>
        );
    }
});


export default Backlog;



var IssueTable = React.createClass({
    render: function () {
      var issue_votes = this.props.issue_votes;
      var issueRows = this.props.issues.map(function(issue) {
          var results = issue_votes.filter(function(item) {return item.issue == issue.id});
          var votes = [];
          if (results.length > 0) { votes = results[0].votes; }
          return <IssueRow id={issue.id} title={issue.title} contributors={this.props.contributors} votes={votes}/>
      }.bind(this));

      var contributorHeaders = this.props.contributors.map(function(contributor) {
          return <ContributorHeader name={contributor.login}/>
      }.bind(this));


        return (
          <table className="table table-hover table-striped table-condensed">
            <thead>
              <tr>
                <th>title</th>
                {contributorHeaders}
                <th>upvote</th>
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


  handleUpvote: function(id) {
    alert("Upvote for issue: " + id);
  },

    render: function () {
      var votes = this.props.votes;
      var contributorCols = this.props.contributors.map(function(contributor) {
          var results = votes.filter(function(item) {return item.login == contributor.login});
          var tokens=0;
          results.map(function(item){ tokens = tokens + Number(item.tokens); });
          return <ContributorCol tokens={tokens}/>
      }.bind(this));

        return (
          <tr>
            <td className="vert-align">{this.props.title}</td>
            {contributorCols}
            <td className="vert-align"><a href="#" className="btn btn-success btn-sm" role="button" onClick={this.handleUpvote.bind(this, this.props.id)}><i className="fa fa-plus-circle"></i> <b>add tokens</b></a></td>
          </tr>
        );
    }
});


var ContributorCol = React.createClass({
    render: function () {
        return (
                <td className="vert-align"><i className="fa fa-arrow-up"></i> {this.props.tokens}</td>
        );
    }
});
