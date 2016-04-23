# st88

###### Simple state management for React.

## Differences from Redux
This is heavily influenced by Redux but differs in the following ways:

- Transformation functions are dispatched to the store instead of actions. These transformation functions take the current state object and return a new one.
- Listeners passed to subscribe are unary functions which take application state as their argument.
