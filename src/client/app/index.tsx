import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Root from './root'

ReactDOM.render(<Root/>, document.getElementById('react-root'))

if (module.hot) {
  module.hot.accept(['./root'], (...args) => {
    const NextRoot = require('./root').default
    ReactDOM.render(<NextRoot/>, document.getElementById('react-root'))
  })
}
