import { makeStore } from "./index";
import { getState } from "../lib/intervals";
// import Promise from 'bluebird';

const Entries = require("../models/entry");

export async function makeInitialStore(params) {
	const store = makeStore();

	try {
		// DB operations
		var state = {};

		state.entries = await Entries.find()
			.select("name repo lastChange description")
			.lean();

		const intervalState = getState();
		state.coins = intervalState.coins;
		state.prices = intervalState.prices;

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
