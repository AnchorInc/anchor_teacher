import { actionTypes, signinMethods } from '../config';

// starts the login process through google
export const googleLoginRequest = () => {
  return { type: actionTypes.AUTH.LOGIN.GOOGLE, method: signinMethods.GOOGLE };
};

// starts the login process through fb
export const fbLoginRequest = () => {
  return { type: actionTypes.AUTH.LOGIN.FB, method: signinMethods.FB };
};

// action dispatched if the login fails
export const loginFail = (message) => {
  return { type: actionTypes.AUTH.LOGIN.FAIL, message };
};

// action dispatched if the login succeeds
export const loginSuccess = () => {
  return { type: actionTypes.AUTH.LOGIN.SUCESS };
};

export const resetLogin = () => {
  return { type: actionTypes.AUTH.LOGIN.RESET };
};

// action dispatched when the user wants to logout
export const logoutUser = () => {
  return { type: actionTypes.AUTH.LOGOUT.REQUEST };
};

// displays the authenticating spinner while user is logging in
export const showSpinner = () => {
  return { type: actionTypes.AUTH.SHOW_SPINNER };
};
