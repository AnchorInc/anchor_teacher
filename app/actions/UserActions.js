import { actionTypes } from '../config';

// starts the user event listener in UserSagas.js
export const startUserListener = () => {
  return { type: actionTypes.USER.LISTEN };
};

// syncs the local user data with the cloud user data
export const syncUser = (user) => {
  return { type: actionTypes.USER.SYNC, user };
};

// updates the user data in the cloud
export const updateUser = (user) => {
  return { type: actionTypes.USER.UPDATE, user };
};

// gets the local user data and stores in the user reducer
export const getUser = () => {
  return { type: actionTypes.USER.GET };
};
