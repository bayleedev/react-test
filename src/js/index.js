const React = require('react')
const ReactDOM = require('react-dom')

const Container = React.createClass({
  propTypes: {
    pages: React.PropTypes.array.isRequired,
  },
  getInitialState: function () {
    return {
      activePageName: this.getCurrentPageFromUrl(),
    }
  },
  getCurrentPageFromUrl () {
    const data = window.location.hash.slice(1).match(/\/page\/(.*)\//)
    const pageTitle = data[1]
    return pageTitle
  },
  componentWillMount: function () {
    window.addEventListener('hashchange', this.handleHashChange, true)
  },
  componentWillUnmount: function () {
    window.removeEventListener('hashchange', this.handleHashChange)
  },
  handleHashChange: function () {
    this.setState({
      activePageName: this.getCurrentPageFromUrl(),
    })
  },
  handleChangePage: function (title) {
    window.location.hash = '/page/' + title + '/'
  },
  render: function () {
    const activePage = this.props.pages.find((item) => {
      return item.title == this.state.activePageName
    })
    return React.createElement(
      'div',
      {},
      React.createElement(
        Toolbar,
        {
          links: this.props.pages.map((item) => {
            return item.title
          }),
          handleClick: this.handleChangePage
        }
      ),
      React.createElement(
        Page,
        {
          title: activePage.title,
          content: activePage.content,
        }
      )
    )
  }
})

const Toolbar = React.createClass({
  propTypes: {
    handleClick: React.PropTypes.func.isRequired,
    links: React.PropTypes.array.isRequired,
  },
  handleClick: function(evt) {
    this.props.handleClick(evt.target.innerText)
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
              { onClick: this.handleClick },
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
