import React, { Component } from 'react'

class Toolbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      links: props.links,
      onLinkClick: props.onLinkClick
    }
  }

  static propTypes() {
    return {
      onLinkClick: React.PropTypes.func.isRequired,
      links: React.PropTypes.array.isRequired,
    }
  }

  onLinkClick = (evt) => {
    this.state.onLinkClick(evt.target.innerText)
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
              { onClick: this.onLinkClick },
              item
            )
          )
        })
      )
    )
  }

}

export default Toolbar
