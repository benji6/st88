const listeners = []

module.exports = state => ({
  dispatch: function (f) {
    state = f(state)
    for (var i = 0; i < listeners.length; i++) listeners[i]()
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
})
