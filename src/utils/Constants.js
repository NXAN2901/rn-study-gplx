const NavigationTag = {
  MAIN: "MAIN",
  RANDOM_QUESTION: "RANDOM_QUESTION",
  RESULT_SCREEN: "RESULT_SCREEN",
  THREAD_SCREEN: "THREAD_SCREEN",
  REVIEW_SCREEN: "REVIEW_SCREEN",
  RTC_LIST_SCREEN: "RTC_LIST_SCREEN",
  RTC_SCREEN: "RTC_SCREEN"

  // HOME: "Home",
  // DETAIL: "Detail",
  // MODAL: "Modal",
  // SETTINGS: "Settings"
};

const QuestionParam = {
  RANDOM_COUNT: 30,
  PICTURE_MIN_COUNT: 5,
  PICTURE_MAX_COUNT: 10,
  PICTURE_INDEX_BEGIN: 70,
  THREAD_NUMBER: 8,
  THREAD_REVIEW_BEGIN_INDEX: 9
};

const DB = {
  QUESTION_SCHEME: "question",
  THREAD_SCHEME: "thread",
  RESULT_SCHEME: "result",
  RESULT_ITEM_SCHEME: "resultItem",
  ERROR_SCHEME: "error"
};

const ThreadType = {
  RANDOM: "RANDOM",
  ERRORS: "ERRORS",
  REVIEW: "REVIEW",
  DEFAULT: "DEFAULT"
};

const IdPrefix = {
  QUESTION: "QUESTION",
  RANDOM: "RANDOM",
  ERRORS: "ERRORS",
  REVIEW: "REVIEW",
  THREAD: "THREAD"
};

const RtcStatus = {
  READY: "READY",
  INITIALIZATION: "INITIALIZATION"
}

export { NavigationTag, QuestionParam, DB, ThreadType, IdPrefix, RtcStatus };
