import {
  QuestionProvider,
  QuestionModification,
  QuestionRequestMark,
  QuestionResult
} from "./ActionsTypes";

export function getAllQuestions(questions) {
  return { type: QuestionProvider.ALL_QUESTION, questions };
}

export function getRandomQuestion(numQuestion) {
  return { type: QuestionProvider.RANDOM_QUESTION, numQuestion };
}

export function setCurrentThread(thread) {
  return { type: QuestionProvider.SET_CURRENT_THREAD, thread };
}

export function setCurrentRandomQuestion(index) {
  return { type: QuestionProvider.CURRENT_RANDOM_QUESTION, index };
}

export function addSelectedAnswered(question, option) {
  return { type: QuestionModification.ADD_ANSWER, option };
}

export function removeSelectedAnswered(question, option) {
  return { type: QuestionModification.REMOVE_ANSWER, option };
}

export function showRequestMarkDlg() {
  return { type: QuestionRequestMark.SHOW_MARK_DLG };
}

export function dismissMarkDlg() {
  return { type: QuestionRequestMark.DISMISS_MARK_DLG };
}

export function result(time) {
  return { type: QuestionResult.RESULT, time };
}

export function showCurrentQuestionAnswer() {
  return { type: QuestionModification.SHOW_ANSWER };
}

export function getThreadsQuestion(numQuestion, dbThreads) {
  return { type: QuestionProvider.THREAD_QUESTION, numQuestion, dbThreads };
}

export function setThreadSelected(thread) {
  return { type: QuestionModification.THREAD_SELECTED, thread };
}

export function refreshThread() {
  return { type: QuestionModification.THREAD_REFRESH };
}

export function getErrorsThread() {
  return { type: QuestionProvider.ERRORS };
}
