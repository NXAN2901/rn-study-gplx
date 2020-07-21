import { combineReducers } from "redux";
import {
  QuestionProvider,
  QuestionModification,
  QuestionRequestMark,
  QuestionResult
} from "../actions/ActionsTypes";
import {
  getAllQuestion,
  getRandomQuestion,
  getThreadQuestions,
  generateThreads,
  generateReviewThreads,
  setAllQuestion
} from "../../../services/QuestionProvider";
import { arrayRemove } from "../../../utils/CommonUtils";
import { QuestionParam, ThreadType } from "../../../utils/Constants";

import { threadDAO, questionDAO } from "../../realm";
import { Logger } from "../../logger";

function getThreadsState(state, action) {
  const dbThreads = action.dbThreads;
  if (dbThreads.length > 0) {
    const newThreads = dbThreads.map(item => {
      return { ...item };
    });
    return Object.assign({}, state, {
      threads: newThreads
    });
  }

  const questions = state.questions;
  const newQuestionsList = Object.assign([], questions);
  const threads = state.threads;
  let threadList = generateThreads(action.numQuestion, newQuestionsList);
  let reviewList = generateReviewThreads(newQuestionsList);
  let newThreads = [];
  if (threads.length > 0) {
    newThreads.push(threads[0]);
  } else {
    const questions = state.questions;
    const newQuestionsList = Object.assign(
      [],
      getRandomQuestion(QuestionParam.RANDOM_COUNT, questions)
    );
    const newRandomThread = {
      name: "Random Question",
      type: ThreadType.RANDOM,
      passed: 0,
      wrong: 0,
      result: undefined,
      selected: false,
      questionList: newQuestionsList
    };
    newThreads.push(newRandomThread);
  }

  newThreads = newThreads.concat(threadList).concat(reviewList);
  threadDAO.saveThreads(newThreads);
  return Object.assign({}, state, {
    threads: newThreads
  });
}

export function questions(state = [], action) {
  switch (action.type) {
    case QuestionProvider.ALL_QUESTION:
      const { questions } = action;
      setAllQuestion(questions);
      const allQuestions = getAllQuestion();
      questionDAO.saveAllQuestions(allQuestions);
      return Object.assign({}, state, {
        questions: allQuestions,
        threads: []
      });
    case QuestionProvider.RANDOM_QUESTION: {
      const questions = state.questions;
      const newQuestionsList = Object.assign(
        [],
        getRandomQuestion(QuestionParam.RANDOM_COUNT, questions)
      );
      const threads = state.threads;
      const newRandomThread = {
        name: "Random Question",
        type: ThreadType.RANDOM,
        description: "",
        passed: 0,
        wrong: 0,
        result: undefined,
        selected: false,
        questionList: newQuestionsList
      };
      if (threads.length == 0) {
        threads.push(newRandomThread);
      } else {
        threads[0] = newRandomThread;
      }
      threadDAO.updateThread(newRandomThread);
      return Object.assign({}, state, { threads });
    }
    case QuestionProvider.THREAD_QUESTION: {
      const newState = getThreadsState(state, action);
      return newState;
    }
    case QuestionProvider.SET_CURRENT_THREAD:
      return Object.assign({}, state, { currentThread: action.thread });
    case QuestionProvider.CURRENT_RANDOM_QUESTION: {
      const currentThread = state.currentThread;
      const currentQuestion = currentThread.questionList[action.index];
      return Object.assign({}, state, {
        currentQuestion
      });
    }
    case QuestionModification.ADD_ANSWER: {
      const currentQuestion = state.currentQuestion;
      const { selectedAnswered } = currentQuestion;
      selectedAnswered.push(action.option);
      const newRandomQuestion = Object.assign({}, currentQuestion);

      const currentThread = state.currentThread;
      const currentQuestions = currentThread.questionList;
      const newQuestionList = currentQuestions.map(question => {
        if (question.name == currentQuestion.name) {
          return newRandomQuestion;
        }
        return question;
      });

      const newCurrentThread = Object.assign({}, currentThread, {
        questionList: newQuestionList
      });

      const threads = state.threads;
      const newThreads = threads.map(thread => {
        if (thread.name == currentThread.name) {
          return newCurrentThread;
        }
        return thread;
      });

      return Object.assign({}, state, {
        currentThread: newCurrentThread,
        currentQuestion: newRandomQuestion,
        threads: newThreads
      });
    }
    case QuestionModification.REMOVE_ANSWER: {
      const currentQuestion = state.currentQuestion;
      const { selectedAnswered } = currentQuestion;
      const newSelectedAnswered = arrayRemove(selectedAnswered, action.option);
      const newRandomQuestion = Object.assign({}, currentQuestion, {
        selectedAnswered: newSelectedAnswered
      });
      const currentThread = state.currentThread;
      const currentQuestions = currentThread.questionList;
      const newQuestionList = currentQuestions.map(question => {
        if (question.name == currentQuestion.name) {
          return newRandomQuestion;
        }
        return question;
      });

      const newCurrentThread = Object.assign({}, currentThread, {
        questionList: newQuestionList
      });

      const threads = state.threads;
      const newThreads = threads.map(thread => {
        if (thread.name == currentThread.name) {
          return newCurrentThread;
        }
        return thread;
      });

      return Object.assign({}, state, {
        currentThread: newCurrentThread,
        currentQuestion: newRandomQuestion,
        threads: newThreads
      });
    }
    case QuestionModification.SHOW_ANSWER: {
      const currentQuestion = state.currentQuestion;
      const newRandomQuestion = Object.assign({}, currentQuestion, {
        answerChecked: true
      });

      const currentThread = state.currentThread;
      const currentQuestions = currentThread.questionList;
      const newCurrentQuestions = currentQuestions.map(question => {
        if (question.name == currentQuestion.name) {
          return newRandomQuestion;
        }
        return question;
      });

      const newCurrentThread = Object.assign({}, currentThread, {
        questionList: newCurrentQuestions
      });

      const threads = state.threads;
      const newThreads = threads.map(thread => {
        if (thread.name == currentThread.name) {
          return newCurrentThread;
        }
        return thread;
      });

      return Object.assign({}, state, {
        currentThread: newCurrentThread,
        currentQuestion: newRandomQuestion,
        threads: newThreads
      });
    }
    case QuestionModification.THREAD_SELECTED: {
      const currentThread = action.thread;
      currentThread.selected = true;

      const threads = state.threads;
      const newThreads = threads.map(thread => {
        if (thread.name == currentThread.name) {
          return Object.assign({}, thread, { selected: true });
        }
        return thread;
      });

      return Object.assign({}, state, { threads: newThreads });
    }
    case QuestionModification.THREAD_REFRESH: {
      const threads = state.threads;
      const newThreads = threads.map((thread, index) => {
        if (index == 0 || index > 8) {
          return thread;
        }
        const questionList = thread.questionList;
        const newQuestionList = questionList.map(question => {
          return Object.assign({}, question, {
            selectedAnswered: [],
            // answerChecked: false
          });
        });
        return Object.assign({}, thread, {
          questionList: newQuestionList,
          result: undefined
        });
      });
      Promise.resolve(threadDAO.saveThreads(newThreads));
      return Object.assign({}, state, { threads: newThreads });
    }
    case QuestionProvider.ERRORS: {
      const threads = state.threads;
      const examThreads = threads.slice(0, 9);
      let errorList = [];

      for (let i = 0; i < examThreads.length; i++) {
        const thread = examThreads[i];
        const result = thread.result;
        if (!result) {
          continue;
        }
        errorList = errorList.concat(Object.values(result.errorList));
      }

      const newErrorList = errorList.map((question, index) => {
        return Object.assign({}, question, {
          selectedAnswered: undefined,
          answerChecked: true,
          reviewed: true,
          index: index + 1
        });
      });
      const errorThread = {
        name: "Errors",
        type: ThreadType.ERRORS,
        passed: 0,
        wrong: 0,
        result: undefined,
        selected: false,
        questionList: newErrorList
      };
      // threadDAO.updateThread(errorThread);
      return Object.assign({}, state, { errorThread });
    }
    case QuestionResult.RESULT: {
      const currentThread = state.currentThread;
      const questions = currentThread.questionList;
      const timeCount = action.time;
      let none = 0;
      let passed = 0;
      let wrong = 0;
      let total = questions.length;
      let resultList = [];
      let errorList = [];
      for (questionKey in questions) {
        const question = Object.assign({}, questions[questionKey]);
        const acceptedAnswered = question.answer;
        const selectedAnswered = question.selectedAnswered;
        const selectedLength = selectedAnswered.length;
        question.answerChecked = true;
        const resultItem = {
          name: `Câu ${question.index}`,
          state: "NONE"
        };
        if (selectedLength > 1) {
          errorList.push(question);
          resultItem.state = "WRONG";
          wrong++;
        } else if (selectedLength === 0) {
          resultItem.state = "NONE";
          none++;
        } else if (selectedAnswered[0] === acceptedAnswered) {
          resultItem.state = "PASSED";
          passed++;
        } else {
          resultItem.state = "WRONG";
          errorList.push(question);
          wrong++;
        }
        resultList.push(resultItem);
      }

      const newCurrentThread = Object.assign({}, currentThread, {
        result: {
          total,
          none,
          passed,
          wrong,
          resultList,
          errorList,
          time: timeCount
        }
      });

      const threads = state.threads;
      const newThreads = threads.map(thread => {
        if (thread.name == currentThread.name) {
          return newCurrentThread;
        }
        return thread;
      });
      threadDAO.updateThread(newCurrentThread);
      return Object.assign({}, state, {
        currentThread: newCurrentThread,
        threads: newThreads
      });
    }
    default:
      return state;
  }
}

export function mark(state = { showMarkDlg: false }, action) {
  switch (action.type) {
    case QuestionRequestMark.SHOW_MARK_DLG:
      return Object.assign({}, state, { showMarkDlg: true });
    case QuestionRequestMark.DISMISS_MARK_DLG:
      return Object.assign({}, state, { showMarkDlg: false });
    default:
      return state;
  }
}

const questionApp = combineReducers({ questions, mark });

export default questionApp;
