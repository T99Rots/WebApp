import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import app from './reducers/app';

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

export const store = createStore(
	store => store,
	devCompose(
		lazyReducerEnhancer(combineReducers),
		applyMiddleware(thunk)
	)
)

store.addReducers({
	app
})