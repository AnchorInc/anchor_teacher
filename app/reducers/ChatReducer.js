import { actionTypes } from '../config';

const INITIAL_STATE = {
  messages: null,
  chats: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case (actionTypes.CHAT.SYNC):
      return { ...state, chats: action.chats };
    case (actionTypes.MESSAGE.SYNC):
      return { ...state, messages: action.messages };
    default:
      return { ...state };
  }
};
