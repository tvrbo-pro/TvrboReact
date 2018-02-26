const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET':
      if(action.user) return action.user;
      else return state;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
