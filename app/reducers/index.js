import { combineReducers } from 'redux';
import GlobalReducer from './GlobalReducer';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  global: GlobalReducer,
  auth: AuthReducer,
  user: UserReducer,
  chat: ChatReducer,
});
