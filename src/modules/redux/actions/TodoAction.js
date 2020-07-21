import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  SET_VISIBILITY_FILTER
} from "./ActionsTypes";

export function addTodo(text, id = Date.now().toString()) {
  return { type: ADD_TODO, id, text };
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

const boundAddTodo = text => dispatch(addTodo(text))
