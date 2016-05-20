import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';

var Calibrate = React.createClass({

    render: function () {
      var contributorRows = this.props.repo_tokens.user_tokens.map(function(user_tokens) {
          return <ContributorRow login={user_tokens.login} tokens_per_second={user_tokens.tokens_per_second} onChangeTokensPerSecond={this.props.onChangeTokensPerSecond}/>
      }.bind(this));



        return (
          <div>

              <div className="row-fluid">
                <div className="col-md-12">
                    <h3>
                        <i className="fa fa-file-code-o"></i>&nbsp;
                        <Link to="/selectProduct">{this.props.user.login}</Link> / <Link to="/backlog">{this.props.repository.name}</Link> / calibrate
                    </h3>
                </div>
              </div>

              {contributorRows}

              <div className="row-fluid">
                    <div className="col-md-12">
                        <Link to="/backlog">return to {this.props.repository.name} backlog</Link>
                    </div>
              </div>

          </div>
        );
    }
});

export default Calibrate;

var ContributorRow = React.createClass({


    render: function () {

      var rates = [1,2,3,4,5,6,7,8,9,10];
      var radioButtons = rates.map(function(rate) {
          return <RadioButton tokens_per_hour={rate} onChangeTokensPerSecond={this.props.onChangeTokensPerSecond}/>
      }.bind(this));

        return (
          <div className="row-fluid">
                <div className="col-md-1">
                        {this.props.login}
                </div>
                <div className="col-md-1">
                        {this.props.tokens_per_second} tps
                </div>
                <div className="col-md-1">
                        {this.props.tokens_per_second * 3600} tph
                </div>
                <div className="col-md-9">
                        {radioButtons}
                </div>
          </div>
        );
    }
});


var RadioButton = React.createClass({

  handleChangeTokensPerSecond: function(tokens_per_hour) {
    var tokens_per_second = tokens_per_hour / 3600;
    this.props.onChangeTokensPerSecond(tokens_per_second);
  },

    render: function () {
        var checked = "";
        if (this.props.tokens_per_hour === 5) {checked = "checked"; }
        return (
            <label className="radio-inline">
              <input type="radio" name="optradio" checked={checked} onClick={this.handleChangeTokensPerSecond.bind(this, this.props.tokens_per_hour)}/>
              {this.props.tokens_per_hour}
            </label>
        );
    }
});
