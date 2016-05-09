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

module.exports.connect = function (store) {
  return function (Child) {
    return React.createElement(React.createClass({
      componentDidMount: function () {
        var self = this
        this.unsubscribe = store.subscribe(function (state) {
          return self.setState(state)
        })
      },
      componentWillMount: function () {
        this.setState(store.getState())
      },
      componentWillUnmount: function () {
        this.unsubscribe()
        this.unsubscribe = null
      },
      render: function () {
        return React.createElement(Child, this.state)
      }
    }))
  }
}
