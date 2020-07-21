import Realm from "realm";
import { DB } from "../../utils/Constants";
import {
  saveAllQuestions,
  getQuestions,
  deleteAllQuestions
} from "./QuestionDAO";
import * as threadDAO from "./ThreadDAO";
import * as questionDAO from "./QuestionDAO";

type Question = {
  id: string,
  index: int,
  name: string,
  question: string,
  options: [string],
  answer: string,
  image: string,
  selectedAnswered: [string],
  answerChecked: boolean
};

const QuestionSchema = {
  name: DB.QUESTION_SCHEME,
  primaryKey: "id",
  properties: {
    id: "string",
    index: "int?",
    name: "string",
    question: "string",
    options: "string[]",
    answer: "string",
    image: "int?",
    selectedAnswered: { type: "string[]", default: [] },
    answerChecked: "bool"
  }
};

const ResultItemSchema = {
  name: DB.RESULT_ITEM_SCHEME,
  properties: {
    name: "string",
    state: { type: "string", default: "NONE" }
  }
};

const ResultSchema = {
  name: DB.RESULT_SCHEME,
  properties: {
    total: { type: "int", default: 0 },
    none: { type: "int", default: 0 },
    passed: { type: "int", default: 0 },
    wrong: { type: "int", default: 0 },
    resultList: {
      type: `${DB.RESULT_ITEM_SCHEME}[]`,
      default: [],
      options: true
    },
    errorList: { type: `${DB.QUESTION_SCHEME}[]`, default: [], options: true },
    time: { type: "int", default: 0, options: true }
  }
};

const ErrorSchema = {
  name: DB.ERROR_SCHEME,
  properties: {
    thread: { type: `${DB.THREAD_SCHEME}`, default: undefined },
    time: { type: "number", default: -1, options: true }
  }
};

const ThreadSchema = {
  name: DB.THREAD_SCHEME,
  primaryKey: "name",
  properties: {
    name: "string",
    type: "string",
    description: { type: "string", options: true, default: "" },
    passed: { type: "int", default: 0 },
    wrong: { type: "int", default: 0 },
    selected: { type: "bool", options: true, default: false },
    questionList: { type: `${DB.QUESTION_SCHEME}[]`, default: [] },
    result: { type: `${DB.RESULT_SCHEME}`, default: undefined, options: true }
  }
};

let _realm;

function initRealm() {
  return Realm.open({
    schema: [QuestionSchema, ResultItemSchema, ResultSchema, ThreadSchema],
    deleteRealmIfMigrationNeeded: true
  }).then(realm => {
    _realm = realm;
  });
}

function getRealm() {
  return _realm;
}

function closeRealm() {
  _realm.close();
}

export {
  initRealm,
  getRealm,
  saveAllQuestions,
  getQuestions,
  closeRealm,
  deleteAllQuestions,
  threadDAO,
  questionDAO
};
