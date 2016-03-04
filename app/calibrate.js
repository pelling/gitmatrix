import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

var Calibrate = React.createClass({

    render: function () {

        return (
          <div>


                <div className="row-fluid">
                  <div className="col-md-12">
                    <h3><Link to="/selectProject">{this.props.session.userName}</Link> / <Link to="/backlog">{this.props.backlog.name}</Link></h3>
                  </div>
                </div>


                <div className="row-fluid">
                      <div className="col-md-12 top-pink">
                          <Link to="/backlog">Return to {this.props.backlog.name} backlog</Link>
                      </div>
                </div>

          </div>
        );
    }
});

export default Calibrate;
