import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  book: bookReducer,
  modal: modalReducer,
});
