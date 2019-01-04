import { actionTypes } from '../config';

export const getMessages = (studentUID) => {
  return { type: actionTypes.MESSAGE.GET, studentUID };
};

export const updateMessages = (chat, studentUID) => {
  return { type: actionTypes.MESSAGE.UPDATE, chat, studentUID };
};

export const syncMessages = (messages) => {
  return { type: actionTypes.MESSAGE.SYNC, messages };
};

export const getChats = (id) => {
  return { type: actionTypes.CHAT.GET, id };
};

export const syncChats = (chats) => {
  return { type: actionTypes.CHAT.SYNC, chats };
};

export const createChat = () => {
  return { type: actionTypes.CHAT.CREATE };
};

export const deleteChat = (studentUID) => {
  return { type: actionTypes.CHAT.DELETE, studentUID };
};
