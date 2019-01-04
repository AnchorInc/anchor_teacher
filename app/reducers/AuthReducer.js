import { actionTypes } from '../config';

const INITIAL_STATE = {
  loading: false,
  loginFail: null,
  action: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.AUTH.LOGIN.SUCESS:
      return { ...state, loading: false, loginFail: false, action: null };
    case actionTypes.AUTH.LOGIN.FAIL:
      return { ...state, loading: false, loginFail: true, message: action.message };
    case actionTypes.AUTH.SHOW_SPINNER:
      return { ...state, loading: true };
    case actionTypes.AUTH.LOGIN.RESET:
      return { ...state, loading: false, loginFail: null, action: null };
    default:
      return state;
  }
};
