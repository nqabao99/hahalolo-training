import { combineReducers } from "redux";
import accountReducer from "./account";
import resultReducer from "./result";
import questionReducer from "./question";

const rootReducer = combineReducers({
  account: accountReducer,
  result: resultReducer,
  question: questionReducer,
});

export default rootReducer;
