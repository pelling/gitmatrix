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
        var products = this.props.repositories.map((repository, i) => {
          return <Product id={repository.id} name={repository.name} index={i} onSelectRepository={this.props.onSelectRepository}/>
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

  handleSelectProduct: function(index) {
    this.props.onSelectRepository(index);
    browserHistory.push('/loadIssues');
  },


    render: function () {
        return (
                <a href="#" className="list-group-item" onClick={this.handleSelectProduct.bind(this, this.props.index)}>{this.props.name}</a>
        );
    }
});


export default SelectProduct;
