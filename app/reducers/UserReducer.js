import { actionTypes } from '../config';

const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER.SYNC:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
