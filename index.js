var React = require('react')

module.exports.createStore = function (state) {
  var listeners = []

  return {
    dispatch: function (f) {
      state = f(state)
      for (var i = 0; i < listeners.length; i++) listeners[i](state)
    },
    getState: function () {
      return state
    },
    subscribe: function (listener) {
      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.')
      }

      var isSubscribed = true

      listeners.push(listener)

      return function () {
        if (!isSubscribed) return
        isSubscribed = false
        listeners.splice(listeners.indexOf(listener), 1)
      }
    }
  }
}

function Container (props) {
  React.Component.call(this, props);
}

Container.prototype = Object.create(React.Component.prototype, {
  componentDidMount: {
    value: function () {
      var self = this
      this.unsubscribe = this.props.store.subscribe(function (state) {
        return self.setState(state)
      })
    }
  },
  componentWillMount: {
    value: function () {
      this.setState(this.props.store.getState())
    }
  },
  componentWillUnmount: {
    value: function () {
      this.unsubscribe()
      this.unsubscribe = null
    }
  },
  render: {
    value: function () {
      return React.createElement(this.props.Child, this.state)
    }
  }
})

Container.constructor = Container

module.exports.connect = function (store) {
  return function (Child) {
    return React.createElement(Container, {
      Child: Child,
      store: store
    })
  }
}
