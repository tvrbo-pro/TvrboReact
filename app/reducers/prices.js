const initialState = [];

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case "SET":
			if (action.prices) return action.prices;
			else return state;

		default:
			return state;
	}
}
