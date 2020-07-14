import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import NotificationReducer from "./NotificationReducer";
import NavigationReducer from "./NavigationReducer";
import QrcodeReducer from './QrcodeReducer';
import ChatReducer from './ChatReducer';
import ContactReducer from "./ContactReducer";
import MessageReducer from './MessageReducer';

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  notifications: NotificationReducer,
  navigations: NavigationReducer,
  qrcode: QrcodeReducer,
  chat: ChatReducer,
  message: MessageReducer,
  contact: ContactReducer,
});

export default RootReducer;
