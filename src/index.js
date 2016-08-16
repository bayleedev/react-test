import React from 'react'
import ReactDOM from 'react-dom'

import Container from './container'

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
