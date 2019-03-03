import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import logger from './reduxLogger.js';
import notesReducer from './notes.js';

const appReducer = combineReducers({notesState: notesReducer});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(appReducer, composeEnhancers(applyMiddleware(logger, thunk)));