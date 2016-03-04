import React from 'react';
import CalibrateComponent from './backlog.js';
import { Router, Route, Link, browserHistory } from 'react-router';

var Backlog = React.createClass({


    render: function () {
      var contributorComponents = this.props.backlog.contributors.map(function(contributor) {
          return <li role="presentation"><a href="#">{contributor.name}<span className="badge">{contributor.tokens}</span></a></li>;
      }.bind(this));
        return (
          <div>
                <div className="row-fluid">
                      <div className="col-md-12">
                        <h3><Link to="/selectProject">{this.props.session.userName}</Link> / {this.props.backlog.name}</h3>

                        <ul className="nav nav-pills" role="tablist">
                            {contributorComponents}
                            <li role="presentation"><Link to="/calibrate">Calibrate</Link></li>
                        </ul>

                      </div>
                </div>

          </div>
        );
    }
});


export default Backlog;
