import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';

var Backlog = React.createClass({

  componentWillMount: function () {
    this.props.onClearGitHubConsole();
    if (this.props.issues == 'not found') {
      //problem -- repositories were not loaded!
    }
  },

  componentDidMount: function() {
      // update the token count every 10 seconds
      this.timer = setInterval(this.updateTokens, 10000);
  },


  updateTokens: function() {
    fetch('getrepotokens?access_token=' + this.props.access_token + '&repo_id=' + this.props.repository.id)
    .then((response) => response.json())
    .then((responseData) => {
      this.props.onRepoTokensLoaded(responseData);
    })
    .catch((error) => {
      consoleLog('Error updating tokens: ' + error);
    });
  },


    render: function () {
        var login = this.props.user.login;
        var my_tokens = this.props.repo_tokens.user_tokens.filter(function(item) {return item.login == login});
        my_tokens = my_tokens[0];
        return (
          <div>
                <div className="row-fluid">
                      <div className="col-md-12">
                        <h3>
                            <i className="fa fa-file-code-o"></i>&nbsp;
                            <Link to="/selectProduct">{login}</Link> / {this.props.repository.name}
                        </h3>
                        my available tokens:&nbsp; <i className="fa fa-plus-circle gm-logo-color"></i> {my_tokens.new_total}
                      </div>
                      <div className="col-md-12">
                        <IssueTable repo_votes={this.props.repo_votes.repo_votes} issues={this.props.issues} contributors={this.props.contributors} onAddTokens={this.props.onAddTokens}/>
                      </div>
                </div>

          </div>
        );
    }
});


export default Backlog;



var IssueTable = React.createClass({
    render: function () {
      var repo_votes = this.props.repo_votes;
      var issueRows = this.props.issues.map(function(issue) {
          var issue_votes = [];
          if (repo_votes.length > 0) {
              var results = repo_votes.filter(function(item) {return item.issue_id == issue.id});
              if (results.length > 0) { issue_votes = results[0].issue_votes; }
          }

          return <IssueRow id={issue.id} title={issue.title} contributors={this.props.contributors} issue_votes={issue_votes} onAddTokens={this.props.onAddTokens}/>
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
                <th className="col-md-2">
                  add tokens
                </th>
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


  handleAddTokensClick: function(issue_id, tokens) {
    this.props.onAddTokens(issue_id, tokens);
  },

    render: function () {
      var issue_votes = this.props.issue_votes;
      var contributorCols = this.props.contributors.map(function(contributor) {
          var results = issue_votes.filter(function(item) {return item.login == contributor.login});
          var tokens=0;
          results.map(function(item){ tokens = tokens + Number(item.tokens); });
          return <ContributorCol tokens={tokens}/>
      }.bind(this));

        return (
          <tr>
            <td className="vert-align">{this.props.title}</td>
            {contributorCols}
            <td className="vert-align">
                <a href="#" className="btn btn-success btn-sm" role="button" onClick={this.handleAddTokensClick.bind(this, this.props.id, 10)}><i className="fa fa-plus"></i> <b>10</b></a>
                &nbsp;&nbsp;
                <a href="#" className="btn btn-primary btn-sm" role="button" onClick={this.handleAddTokensClick.bind(this, this.props.id, 100)}><i className="fa fa-plus"></i> <b>100</b></a>
            </td>
          </tr>
        );
    }
});


var ContributorCol = React.createClass({
    render: function () {
        return (
                <td className="vert-align">
                  <i className="fa fa-plus-circle gm-logo-color"></i> {this.props.tokens}
                </td>
        );
    }
});
