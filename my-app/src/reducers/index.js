import questionReducer from "./Question";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  question: questionReducer,
});

export default rootReducer;
