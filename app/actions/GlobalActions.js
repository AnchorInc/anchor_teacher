import { actionTypes } from '../config';

export const showErrorMessage = (payload) => {
    return { type: actionTypes.ERROR.SHOW, payload };
  };

  export const closeErrorMessage = () => {
    return { type: actionTypes.ERROR.CLOSE };
  };

  export const showChatBadge = () => {
    return { type: actionTypes.BADGE.SHOW };
  };

  export const hideChatBadge = () => {
    return { type: actionTypes.BADGE.HIDE };
  };
