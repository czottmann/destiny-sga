var List = React.createClass({displayName: "List",
  getInitialState: function() {
    return {
      elements: this.prop.data.children
    };
  },

  render: function() {
    var listElementNodes = this.props.elements.map( function( listElement ) {
      return (
        React.createElement(ListElement, {data: listElement })
      );
    });

    return (
      React.createElement("ul", null, 
        listElementNodes 
      )
    )
  }
});


var ListElement = React.createClass({displayName: "ListElement",
  render: function() {
    return (
      React.createElement("p", null, "Hello, Universe")
    )
  }
});


function go( data ) {
  React.render(
    React.createElement(List, {obj: data }),
    document.getElementById( 'container' )
  );
}