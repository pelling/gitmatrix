import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';


var SelectProduct = React.createClass({


  componentWillMount: function () {
    this.props.onClearGitHubConsole();
    if (this.props.repositories == 'not found') {
      //problem -- repositories were not loaded!
    }
  },

    render: function () {
        var products = this.props.repositories.map((repository) => {
          return <Product id={repository.id} name={repository.name}/>
        });
        return (
              <div className="row-fluid">
                    <div className="col-md-4">
                    <h4>Select GitHub Product:</h4>
                        <div className="list-group">
                            {products}
                        </div>
                    </div>
                    <div className="col-md-8">
                      <br/>
                    </div>
              </div>
        );
    }
});





var Product = React.createClass({

    render: function () {
        var backlogLink = "/loadIssues?id=" + this.props.id;
        return (
                <Link to={backlogLink} className="list-group-item" >{this.props.name}</Link>
        );
    }
});


export default SelectProduct;
