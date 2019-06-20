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

export const getChats = () => {
  return { type: actionTypes.CHAT.GET };
};

export const syncChats = (chats) => {
  return { type: actionTypes.CHAT.SYNC, chats };
};

export const createChat = (studentUID) => {
  return { type: actionTypes.CHAT.CREATE, studentUID };
};

export const deleteChat = (studentUID) => {
  return { type: actionTypes.CHAT.DELETE, studentUID };
};
