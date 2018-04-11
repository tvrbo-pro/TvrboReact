import { makeStore } from "./index";

export function rehydrate(initialStateStr) {
	const store = makeStore();

	try {
		const initialState = JSON.parse(initialStateStr);

		// each store will receive its corresponding object
		store.dispatch({ type: "SET", ...initialState });
	} catch (err) {
		console.error("Unable to parse the initial state");
	}
	return store;
}
