import { combineReducers } from "redux";
import { INCREMENT, DECREMENT } from "../actions/ActionsTypes";

const initState = 0

export function counter(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

const counterApp = combineReducers({ counter });

export default counterApp;
