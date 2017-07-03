import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import reducers from './reducers'
import Form from './Form'

const logger = createLogger({ collapsed: true })
const store = createStore(reducers, applyMiddleware(logger))

const Root = () => (
  <Provider store={ store }>
    <Form />
  </Provider>
)

export default Root
