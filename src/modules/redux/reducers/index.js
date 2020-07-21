import { combineReducers } from "redux";
import todoApp from "./TodoReducer";
import counterApp from "./CountReducer";
import questionApp from "./QuestionReducer";
// import loadingInd from "./LoadingReducer";
import appReducer from "./AppReducer";
import rtcReducer from "./RTCReducer";

const reducers = combineReducers({
  todo: todoApp,
  counter: counterApp,
  question: questionApp,
  ui: appReducer,
  rtc: rtcReducer
});

export default reducers;
