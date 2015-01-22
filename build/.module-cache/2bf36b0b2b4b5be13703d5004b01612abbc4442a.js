// underscore.string
_( s.exports() ).mixin();


var List = React.createClass({displayName: "List",
  componentDidMount: function() {
    var _this = this;
    var cbname = 'cb' + Date.now();
    var script = document.createElement( 'script' );
    script.src = 'http://www.reddit.com/reddits.json?jsonp=' + cbname;

    window[ cbname ] = function( jsonData ) {
      _this.setState({
        navigationItems: jsonData.data.children
      });
      
      delete window[ cbname ];
    };

    document.head.appendChild( script );
  },

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
  getInitialState: function() {
    return {
      authorName: '/u/' + this.props.data.author,
      authorUrl: 'https://reddit.com/u/' + this.props.data.author,
      title: this.props.data.title,
      url: this.props.data.url.replace( /^http:/, 'https:' ),
      body: _( this.props.data.selftext_html ).unescapeHTML(),
      createdAt: new Date( this.props.data.created_utc * 1000 ).toGMTString(),
      score: this.props.data.score
    };
  },

  render: function() {
    return (
      React.createElement("section", null, 
        React.createElement("h4", null, 
          React.createElement("code", null,  this.state.score), " ", 
          React.createElement("a", {href:  this.state.url},  this.state.title)
        ), 
        React.createElement("span", null, 
          React.createElement("a", {href:  this.state.authorUrl},  this.state.authorName), 
          "· ",  this.state.createdAt
        ), 
        React.createElement("div", {dangerouslySetInnerHTML: { __html: this.state.body}})
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