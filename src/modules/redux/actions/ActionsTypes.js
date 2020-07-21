/*
 * action types
 */

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const REMOVE_TODO = "REMOVE_TODO";

/**
 * Action Type for Counter
 */
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export const QuestionProvider = {
  ALL_QUESTION: "ALL_QUESTION",
  RANDOM_QUESTION: "RANDOM_QUESTION",
  SET_CURRENT_THREAD: "SET_CURRENT_THREAD",
  CURRENT_RANDOM_QUESTION: "CURRENT_RANDOM_QUESTION",
  THREAD_QUESTION: "THREAD_QUESTION",
  ERRORS: "ERRORS"
};

export const QuestionModification = {
  ADD_ANSWER: "ADD_ANSWER",
  REMOVE_ANSWER: "REMOVE_ANSWER",
  SHOW_ANSWER: "SHOW_ANSWER",
  THREAD_SELECTED: "THREAD_SELECTED",
  THREAD_REFRESH: "THREAD_REFRESH"
};

export const QuestionRequestMark = {
  SHOW_MARK_DLG: "SHOW_MARK_DLG",
  DISMISS_MARK_DLG: "DISMISS_MARK_DLG"
};

export const QuestionResult = {
  RESULT: "RESULT"
};

export const LoadingAction = {
  SHOW: "SHOW",
  DISMISS: "DISMISS"
};

export const AppAction = {
  INPUT_DIALOG: {
    SHOW: "SHOW_INPUT_DIALOG",
    DISMISS: "DISMISS_INPUT_DIALOG"
  },
  LOADING: {
    SHOW: "SHOW_LOADING",
    DISMISS: "DISMISS_LOADING"
  }
};

export const RTCAction = {
  ROOM_LIST: "ROOM_LIST",
  ADD_ROOM: "ADD_ROOM"
}
