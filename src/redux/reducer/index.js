import { combineReducers } from "redux";

import counter from "./counter";
import auth from "./auth";
import user from "./user";

export default combineReducers({
  counter, auth, user
});
