import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import modalReducer from "./modalReducer";
import orderReducer from "./orderReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  book: bookReducer,
  modal: modalReducer,
  security: securityReducer,
  order: orderReducer,
});
