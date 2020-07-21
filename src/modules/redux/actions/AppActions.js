import { AppAction } from "./ActionsTypes";

export function showLoading() {
  return { type: AppAction.LOADING.SHOW };
}

export function dismissLoading() {
  return { type: AppAction.LOADING.DISMISS };
}

export function showInputDialog(inputs, buttons) {
  return { type: AppAction.INPUT_DIALOG.SHOW, inputs, buttons };
}

export function dismissInputDialog() {
  return { type: AppAction.INPUT_DIALOG.DISMISS };
}
