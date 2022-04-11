import { createStore } from 'redux';

const ActionTypes = {
  isLogged: 'isLogged'
}

const initialState = {
  isLogged: false,
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case ActionTypes.isLogged:
      return { ...state, isLogged: true };
    default:
      return state;
  }
}

export const store = createStore(reducer);

store.dispatch({ type: ActionTypes.isLogged });