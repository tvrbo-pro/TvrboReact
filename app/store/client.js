import { makeStore } from './index';

export function rehydrate(initialState){
	const store = makeStore();
	
	try {
		initialState = JSON.parse(initialState);

		// each store will receive its corresponding object
		store.dispatch({type: 'SET', ...initialState});
	}
	catch(err) {
		console.error("Unable to parse the initial state");
	}
	return store;
}
