import { on, fromParams, isProduction } from './caspar'
import ReactDOM from 'react-dom'
import React from 'react'

function register (obj) {
  class Template extends React.Component {
    constructor () {
      super()
      this.state = {}
      this.render = obj.render.bind(this)

      for (const name of ['play', 'update', 'stop', 'remove']) {
        if (obj[name]) {
          on(name, obj[name].bind(this))
        }
      }

      if (!isProduction && obj.preview) {
        setTimeout(() => obj.preview.call(this), 1)
      }

      if (obj.load) {
        obj.load.call(this)
      }
    }
  }
  ReactDOM.render(<Template />, document.getElementById('app'))
}

module.exports = {
  parse: fromParams,
  register
}
