var BacklogComponent = React.createClass({


  getInitialState : function() {
    return {
      contributors : []
    };
  },


  componentDidMount: function () {

    $.ajax({url: "getcontributors", success: function(result){
        this.setState( { contributors: result });
      }.bind(this)
    });

  },



    handleClickSelect: function(event) {
      React.render(<SelectProjectComponent />, document.getElementById('app'));
    },


    handleClickCalibrate: function(event) {
      React.render(<CalibrateComponent />, document.getElementById('app'));
    },


    render: function () {
      var contributorComponents = this.state.contributors.map(function(contributor) {
          return <li role="presentation"><a href="#">{contributor.name}<span className="badge">{contributor.tokens}</span></a></li>;
      }.bind(this));
        return (
          <div>

                <TopNavComponent />


                <div className="row-fluid">
                      <div className="col-md-12 top-pink">
                        <h3><a href="#" onClick={this.handleClickSelect}>pelling</a> / gitmatrix</h3>

                        <ul className="nav nav-pills" role="tablist">
                            {contributorComponents}
                            <li role="presentation"><a href="#" onClick={this.handleClickCalibrate}>Calibrate</a></li>
                        </ul>

                      </div>
                </div>

          </div>
        );
    }
});
