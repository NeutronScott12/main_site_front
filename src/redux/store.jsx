import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'

import { reducers, rootEpics } from './combineReducer'

const logger = createLogger()

const middleware = [thunk, routerMiddleware(history), createEpicMiddleware(rootEpics)]

if (process.env.NODE_ENV != 'production') {
	middleware.push(logger)
}

export default createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)))
