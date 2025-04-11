import {applyMiddleware, compose, createStore} from 'redux' 
import {rootReducer} from './services/Reducer'
import { thunk } from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store =createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);