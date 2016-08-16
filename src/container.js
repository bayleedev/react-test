import React, { Component } from 'react'

import Page from './page'
import Toolbar from './toolbar'

class Container extends Component {

  constructor(props) {

    super(props)

    this.state = {
      activePageName: this.getCurrentPageFromUrl,
      pages: props.pages
    }

  }

  static propTypes() {
    pages: React.PropTypes.array.isRequired
  }

  getCurrentPageFromUrl() {
    const data = window.location.hash.slice(1).match(/\/page\/(.*)\//)
    const pageTitle = data ? data[1] : this.pages[0].title
    return pageTitle
  }

  componentWillMount() {
    window.addEventListener('hashchange', this.onHashChange, true)
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange)
  }

  onHashChange = () => {
    this.setState({
      activePageName: this.getCurrentPageFromUrl,
    })
  }

  applyHashChange(title) {
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
          onLinkClick: this.applyHashChange
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

export default Container
