import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import modalReducer from "./modalReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  book: bookReducer,
  modal: modalReducer,
  orderCount: orderReducer,
});
