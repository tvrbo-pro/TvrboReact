const initialState = { // global properties here
	cookiesAccepted: false
};

export default function reducer(state = initialState, action = {}) {
	var newState;

  switch (action.type) {
		case 'SET':
			if(!action.app) return state;

			newState = Object.assign({}, state, action.app);
			return newState;

		case 'ACCEPT_COOKIES':
			newState = Object.assign({}, state, {cookiesAccepted: true});
			localStorage.app = JSON.stringify(newState);
			return newState;

		case 'RESTORE':
			try {
				if(localStorage.app) {
					newState = JSON.parse(localStorage.app);
				}
				else {
					newState = Object.assign({}, initialState, {watchedIntro: false});
				}
			}
			catch(err){
				return state;
			}
			return newState;

    default:
      return state;
  }
}
