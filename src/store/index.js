import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { initialState } from '../config';
import reducers from '../reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const {logger} = require('redux-logger');
  middlewares.push(logger);
}

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middlewares)
);
