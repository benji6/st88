export default ((listeners = []) => state => ({
  dispatch(f) {
    state = f(state)
    for (let i = 0; i < listeners.length; i++) listeners[i]()
  },

  getState() {
    return state
  },

  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    listeners.push(listener)

    let isSubscribed = true
    return () => {
      if (!isSubscribed) return
      isSubscribed = false
      listeners.splice(listeners.indexOf(listener), 1)
    }
  }
}))()
