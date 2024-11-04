import { combineReducers } from "redux";
import systemSlice from "./slices";
const rootReducer = combineReducers({
  systemState: systemSlice,
});

export default rootReducer;
