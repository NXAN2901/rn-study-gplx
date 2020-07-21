import { combineReducers } from "redux";
import { LoadingAction } from "../actions/ActionsTypes";

const initialization = {
  visible: false
};

export function loading(state = initialization, action) {
  switch (action.type) {
    case LoadingAction.SHOW:
      return Object.assign({}, state, { visible: true });
    case LoadingAction.DISMISS:
      return Object.assign({}, state, { visible: false });
    default:
      return state;
  }
}

const loadingIndi = combineReducers({ loading });
export default loadingIndi;
