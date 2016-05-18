import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import consoleLog from './consoleLog.js';
import 'whatwg-fetch';

var Calibrate = React.createClass({

    render: function () {

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


/*







*/
