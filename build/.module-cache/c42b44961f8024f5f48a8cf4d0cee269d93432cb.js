// underscore.string
_( s.exports() ).mixin();


var List = React.createClass({displayName: "List",
  getInitialState: function() {
    return {
      elements: this.props.obj.data.children
    };
  },

  render: function() {

    var listElementNodes = this.state.elements.map( function( obj ) {
      return (
        React.createElement(ListElement, {data:  obj.data})
      );
    });

    return (
      React.createElement("div", null, listElementNodes )
    )
  }
});


var ListElement = React.createClass({displayName: "ListElement",
  render: function() {
    return (
      React.createElement("section", null, 
        React.createElement("h3", null,  this.props.data.title), 
        React.createElement("p", null,  this.props.data.selftext), 
        React.createElement("p", {dangerouslySetInnerHTML: {
          __html: _( this.props.data.selftext_html ).unescapeHTML()
        }})
      )
    )
  }
});


function go( data ) {
  React.render(
    React.createElement(List, {obj: data }),
    document.getElementById( 'container' )
  );
}