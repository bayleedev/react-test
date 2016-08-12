const React = require('react')
const ReactDOM = require('react-dom')

const Container = React.createClass({
  propTypes: {
    pages: React.PropTypes.array.isRequired,
  },
  render: function () {
    return React.createElement(
      'div',
      {},
      React.createElement(
        Toolbar,
        {
          links: this.props.pages.map((item) => {
            return item.title
          })
        }
      ),
      this.props.pages.map((item, index) => {
        return React.createElement(
          Page,
          {
            key: index,
            title: item.title,
            content: item.content,
          }
        )
      })
    )
  }
})

const Toolbar = React.createClass({
  propTypes: {
    links: React.PropTypes.array.isRequired
  },
  render: function() {
    return React.createElement(
      'header',
      {},
      React.createElement(
        'ul',
        {},
        this.props.links.map((item, index) => {
          return React.createElement(
            'li',
            { key: index },
            React.createElement(
              'a',
              {},
              item
            )
          )
        })
      )
    )
  }
})

const Page = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
  },
  render: function () {
    return React.createElement(
      'div',
      {},
      React.createElement(
        'h2',
        {},
        this.props.title
      ),
      React.createElement(
        'p',
        {},
        this.props.content
      )
    )
  }
})

ReactDOM.render(
  React.createElement(
    Container,
    {
      pages: [
        {
          title: "rawr",
          content: "helloo"
        },
        {
          title: "meow",
          content: "ohai"
        }
      ]
    }
  ),
  document.getElementById('container')
)
