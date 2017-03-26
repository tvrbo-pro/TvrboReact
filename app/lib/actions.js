import { getSession, logout as apiLogout } from './api.js';

// Fetching

export function fetchAll() {
	return dispatch => {
		getSession()
			.then(state => {
				if (!state) return;
				dispatch({ type: 'SET', ...state });
			})
			.catch(err => {
				console.error(err);
			});
	}
}

// Logout

export function logout() {
	return (dispatch, getState) => {
		apiLogout()
			.then(() => dispatch({ type: 'RESET' }))
			.catch(err => console.log(err));
	}
}
