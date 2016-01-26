var BacklogComponent = React.createClass({

    handleClickSelect: function(event) {
      React.render(<SelectProjectComponent />, document.getElementById('app'));
    },


    handleClickCalibrate: function(event) {
      React.render(<CalibrateComponent />, document.getElementById('app'));
    },


    render: function () {

        return (
          <div>

                <TopNavComponent />


                <div className="row-fluid">
                      <div className="col-md-12 top-pink">
                        <h3><a href="#" onClick={this.handleClickSelect}>pelling</a> / gitmatrix</h3>

                        <ul className="nav nav-pills" role="tablist">
                            <li role="presentation"><a href="#">pelling <span className="badge">128</span></a></li>
                            <li role="presentation"><a href="#">sconz <span className="badge">3006</span></a></li>
                            <li role="presentation"><a href="#">doetsch <span className="badge">2050</span></a></li>
                            <li role="presentation"><a href="#">vern <span className="badge">400</span></a></li>
                            <li role="presentation"><a href="#">cuda <span className="badge">390</span></a></li>
                            <li role="presentation"><a href="#" onClick={this.handleClickCalibrate}>Calibrate</a></li>
                        </ul>

                      </div>
                </div>

          </div>
        );
    }
});
