import { combineReducers } from "redux";
import { AppAction } from "../actions/ActionsTypes";

const initialization = {
  loading: {
    visible: false
  },
  inputDialog: {
    visible: false,
    inputs: [],
    buttons: []
  }
};

export function dialog(state = initialization, action) {
  switch (action.type) {
    case AppAction.INPUT_DIALOG.SHOW: {
      const inputs = action.inputs || [];
      const buttons = action.buttons || []
      return Object.assign({}, state, {
        inputDialog: { visible: true, inputs, buttons }
      });
    }
    case AppAction.INPUT_DIALOG.DISMISS: {
      return Object.assign({}, state, { inputDialog: { visible: false } });
    }
    case AppAction.LOADING.SHOW: {
      return Object.assign({}, state, { loading: { visible: true } });
    }
    case AppAction.LOADING.DISMISS: {
      return Object.assign({}, state, { loading: { visible: false } });
    }
    default:
      return state;
  }
}

const appReducer = combineReducers({ dialog });

export default appReducer;
