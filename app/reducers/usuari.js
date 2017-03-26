const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET':
      if(action.usuari) return action.usuari;
      else return state;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
