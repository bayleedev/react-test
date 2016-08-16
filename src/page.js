import React, { Component } from 'react'

class Page extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
    }
  }

  render() {
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

}

export default Page
