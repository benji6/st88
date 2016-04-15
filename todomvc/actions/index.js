import { over, lensProp } from 'ramda'

const overTodos = over(lensProp('todos'))

export const addTodo = text => overTodos(state => {
  return [
    {
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text
    },
    ...state
  ]
})

export const deleteTodo = id => overTodos(state => {
  return state.filter(todo =>
    todo.id !== id
  )
})

export const editTodo = (id, text) => overTodos(state => {
  return state.map(todo =>
    todo.id === id ?
      Object.assign({}, todo, { text }) :
      todo
  )
})

export const completeTodo = id => overTodos(state => {
  return state.map(todo =>
    todo.id === id ?
      Object.assign({}, todo, { completed: !todo.completed }) :
      todo
  )
})

export const completeAll = () => overTodos(state => {
  const areAllMarked = state.every(todo => todo.completed)
  return state.map(todo => Object.assign({}, todo, {
    completed: !areAllMarked
  }))
})

export const clearCompleted = () => overTodos(state => {
  return state.filter(todo => todo.completed === false)
})
