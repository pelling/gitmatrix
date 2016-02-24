import React from 'react';
import TopNavComponent from './topnav.js';

var CalibrateComponent = React.createClass({

    handleClickSelect: function(event) {
      React.render(<SelectProjectComponent />, document.getElementById('app'));
    },


    handleClickBacklog: function(event) {
      React.render(<BacklogComponent />, document.getElementById('app'));
    },


    render: function () {

        return (
          <div>

                <TopNavComponent />


                <div className="row-fluid">
                  <div className="col-md-12 top-pink">
                    <h3><a href="#" onClick={this.handleClickSelect}>pelling</a> / <a href="#" onClick={this.handleClickBacklog}>gitmatrix</a></h3>
                  </div>
                </div>


                <div className="row-fluid">
                      <div className="col-md-12 top-pink">
                          <button type="button" className="btn btn-default" onClick={this.handleClickBacklog}>Return to Backlog</button>
                      </div>
                </div>

          </div>
        );
    }
});
