var ExampleComponent = React.createClass({


    getInitialState : function() {
      return {
        name : "chris"
      };
    },


    componentDidMount: function () {

      $.ajax({url: "ajaxtest", success: function(result){
          this.setState( { name: result });
        }.bind(this)
      });

    },



    render: function () {
        // this gets called many times in a components life
        return (
            <div>
                hello {this.state.name}
            </div>
            );
    }
});

React.render(<ExampleComponent />, document.getElementById('app'));
