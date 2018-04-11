import { makeStore } from "./index";
// import Promise from 'bluebird';

export async function makeInitialStore(params) {
	const store = makeStore();

	try {
		// DB operations
		var state = {};

		if (params.userId) {
			// state = await getUserState({id: params.userId});
			state.app = { cookiesAccepted: true, watchedIntro: true };
		}
		// else {
		// 	state = Object.assign({}, initialState);
		// }

		// Set the initial state
		store.dispatch({ type: "SET", ...state });
		return store;
	} catch (err) {
		return store;
	}
}

export function dehydrate(store) {
	if (!store || !store.getState) return {};
	return JSON.stringify(store.getState());
}
