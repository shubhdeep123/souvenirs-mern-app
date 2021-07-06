import { combineReducers } from "redux";
import { postsReducer } from "./postReducer";
import { authReducer } from "./authReducer";

export default combineReducers({
  posts: postsReducer,
  auth: authReducer,
});
