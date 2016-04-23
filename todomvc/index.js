import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import 'todomvc-app-css/index.css'
import createStore from '../'

const store = createStore({
  todos: [
    {
      text: 'Use Redux',
      completed: false,
      id: 0
    }
  ]
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
