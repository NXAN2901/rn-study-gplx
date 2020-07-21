import { getRealm } from "./index";
import { DB } from "../../utils/Constants";
import { ThreadType } from "../../utils/Constants";
import { Logger } from "../logger";
import {
  convertRealmArrayToJsonObject,
  convertRealmObjectToJsonObject,
  convertJsonObjectToArray
} from "../../utils/CommonUtils";

async function saveThreads(threads, enableForceUpdate = true) {
  return new Promise(resolve => {
    const realm = getRealm();
    realm.write(() => {
      threads.map(thread => {
        const threadRealm = realm.create(
          DB.THREAD_SCHEME,
          thread,
          enableForceUpdate
        );
        refreshThread(thread, threadRealm);
      });
      return resolve();
    });
  });
}

function refreshThread(thread, threadRealm) {
  const result = thread.result;
  if (!result) {
    threadRealm.result = undefined;
  }
  threadRealm.questionList.forEach(question => {
    question.answerChecked = false;
    if (!question.selectedAnswered) {
      question.selectedAnswered = [];
    }
  });
}

async function updateThread(thread, enableForceUpdate = true) {
  return new Promise(resolve => {
    const realm = getRealm();
    realm.write(() => {
      const threadRealm = realm.create(
        DB.THREAD_SCHEME,
        thread,
        enableForceUpdate
      );
      refreshThread(thread, threadRealm);
      return resolve();
    });
  });
}

async function getAllThreads() {
  return new Promise(resolve => {
    const realm = getRealm();
    realm.write(() => {
      const threads = realm.objects(DB.THREAD_SCHEME);
      const appThreads = threads.map(appThread => {
        const thread = convertRealmObjectToJsonObject(appThread);
        const arrQuestionList = convertJsonObjectToArray(thread.questionList);
        arrQuestionList.forEach(question => {
          const arrOptions = convertJsonObjectToArray(question.options);
          const seletedAnswered = question.selectedAnswered;
          const arrSelectedAnswered = seletedAnswered
            ? Object.values(seletedAnswered)
            : [];

          question.options = arrOptions;
          question.selectedAnswered = arrSelectedAnswered;
        });
        thread.questionList = arrQuestionList;

        const result = thread.result;
        if (result) {
          const errorList = result.errorList;
          if (errorList) {
            const errorQuestionList = convertJsonObjectToArray(
              result.errorList
            );
            errorQuestionList.forEach(errorQuestion => {
              const errorQuestionOptions = convertJsonObjectToArray(
                errorQuestion.options
              );
              errorQuestion.options = errorQuestionOptions;
            });
            result.errorList = errorQuestionList;
            thread.result = result;
          }
        }

        return thread;
      });
      return resolve(appThreads);
    });
  });
}

async function getThreadsByType(type) {
  return new Promise(resolve => {
    const realm = getRealm();
    realm.write(() => {
      const threads = realm
        .objects(DB.THREAD_SCHEME)
        .filtered(`type = "${type}"`)
        .sorted("index");
      return resolve(threads);
    });
  });
}

function getDefaultThreads() {
  return getThreadsByType(ThreadType.DEFAULT);
}

export {
  getAllThreads,
  getThreadsByType,
  getDefaultThreads,
  saveThreads,
  updateThread
};
