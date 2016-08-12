const React = require('react')
const ReactDOM = require('react-dom')

const Container = React.createClass({
  render: function () {
    return React.createElement('div', {}, 'meow')
  }
})

ReactDOM.render(
  React.createElement(Container),
  document.getElementById('container')
)
