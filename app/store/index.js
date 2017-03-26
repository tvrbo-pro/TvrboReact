import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

// Create store

const middleware = [ thunk ];

export function makeStore(){
	const store = compose(
		applyMiddleware(...middleware)
	)(createStore)(reducers);

	return store;
}
