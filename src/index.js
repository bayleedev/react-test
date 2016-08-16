const React = require('react')
const ReactDOM = require('react-dom')

class Container extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      activePageName: this.getCurrentPageFromUrl,
      pages: props.pages
    }

    this.handleHashChange = this.handleHashChange.bind(this)

  }

  static propTypes() {
    pages: React.PropTypes.array.isRequired
  }

  getCurrentPageFromUrl() {
    const data = window.location.hash.slice(1).match(/\/page\/(.*)\//)
    const pageTitle = data ? data[1] : 'rawr'
    return pageTitle
  }

  componentWillMount() {
    window.addEventListener('hashchange', this.handleHashChange, true)
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange)
  }

  handleHashChange() {
    this.setState({
      activePageName: this.getCurrentPageFromUrl,
    })
  }

  handleChangePage(title) {
    window.location.hash = '/page/' + title + '/'
  }

  render() {
    const activePage = this.state.pages.find((item) => {
      return item.title == this.state.activePageName()
    })
    return React.createElement(
      'div',
      {},
      React.createElement(
        Toolbar,
        {
          links: this.state.pages.map((item) => {
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
}

class Toolbar extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      links: props.links,
      handleClick: props.handleClick
    }

    this.handleClick = this.handleClick.bind(this)

  }

  static propTypes() {
    return {
      handleClick: React.PropTypes.func.isRequired,
      links: React.PropTypes.array.isRequired,
    }
  }

  handleClick(evt) {
    this.state.handleClick(evt.target.innerText)
  }

  render() {
    return React.createElement(
      'header',
      {},
      React.createElement(
        'ul',
        {},
        this.state.links.map((item, index) => {
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

}

class Page extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      title: props.title,
      content: props.content
    }

  }

  static propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
    }
  }

  render: function () {
    return React.createElement(
      'div',
      {},
      React.createElement(
        'h2',
        {},
        this.state.title
      ),
      React.createElement(
        'p',
        {},
        this.state.content
      )
    )
  }

}

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
