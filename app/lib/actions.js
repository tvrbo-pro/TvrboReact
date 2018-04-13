import { getEntries } from "./api.js";

// Multiple fetching

export function fetchAll() {
	return dispatch => {
		dispatch(fetchEntries());
		// more go here
	};
}

// Logout

export function fetchEntries() {
	return (dispatch, getState) => {
		getEntries()
			.then(entries => dispatch({ type: "SET", entries }))
			.catch(err => console.log(err));
	};
}
