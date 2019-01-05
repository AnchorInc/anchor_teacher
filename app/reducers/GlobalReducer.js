import { actionTypes } from '../config';

const INITIAL_STATE = {
  error: false,
  errorMessage: null,
  showChatBadge: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ERROR.SHOW:
      return { ...state, error: true, errorMessage: action.payload };
    case actionTypes.ERROR.CLOSE:
      return { ...state, error: false, errorMessage: null };
    case actionTypes.BADGE.SHOW:
      return { ...state, showChatBadge: true };
    case actionTypes.BADGE.HIDE:
      return { ...state, showChatBadge: false };
    default:
      return state;
  }
};
