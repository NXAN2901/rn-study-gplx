import { createStore, combineReducers } from "redux";
import appReducer from "./reducers/index";

let _store;

export function initStore() {
  // const logger = createLogger({});
  _store = createStore(appReducer);
}

export const getStore = () => _store;

// export const initStore = todoApp => createStore(todoApp)

// export default {
//   initStore
// }
