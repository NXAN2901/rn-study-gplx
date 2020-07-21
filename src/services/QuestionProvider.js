import { QuestionParam, ThreadType, IdPrefix } from "../utils/Constants";
import Api from "../services/NetworkService";
import { strings } from "../i18n";
import { Logger } from "../modules/logger";

export type Question = {
  index: int,
  name: string,
  question: string,
  options: [string],
  answer: string,
  image: string,
  selectedAnswered: [string],
  answerChecked: boolean
};

export const imageMapping = {
  "71": require("../assets/image/71.jpg"),
  "72": require("../assets/image/72.jpg"),
  "73": require("../assets/image/73.jpg"),
  "74": require("../assets/image/74.jpg"),
  "75": require("../assets/image/75.jpg"),
  "76": require("../assets/image/76.jpg"),
  "77": require("../assets/image/77.jpg"),
  "78": require("../assets/image/78.jpg"),
  "79": require("../assets/image/79.jpg"),
  "80": require("../assets/image/80.jpg"),
  "81": require("../assets/image/81.jpg"),
  "82": require("../assets/image/82.jpg"),
  "83": require("../assets/image/83.jpg"),
  "84": require("../assets/image/84.jpg"),
  "85": require("../assets/image/85.jpg"),
  "86": require("../assets/image/86.jpg"),
  "87": require("../assets/image/87.jpg"),
  "88": require("../assets/image/88.jpg"),
  "89": require("../assets/image/89.jpg"),
  "90": require("../assets/image/90.jpg"),
  "91": require("../assets/image/91.jpg"),
  "92": require("../assets/image/92.jpg"),
  "93": require("../assets/image/93.jpg"),
  "94": require("../assets/image/94.jpg"),
  "95": require("../assets/image/95.jpg"),
  "96": require("../assets/image/96.jpg"),
  "97": require("../assets/image/97.jpg"),
  "98": require("../assets/image/98.jpg"),
  "99": require("../assets/image/99.jpg"),
  "100": require("../assets/image/100.jpg")
};

let questions;

function setAllQuestion(questionList) {
  questions = questionList;
}

function getAllQuestion() {
  const questionList = [];
  for (questionName in questions) {
    if (questionName != "default") {
      const name = questionName;
      const index = parseInt(questionName.split("Câu hỏi ")[1], 10);
      const questionInfo = questions[name];
      const selectedAnswered = [];
      const imagePath = questionInfo.image
        ? imageMapping[questionInfo.image]
        : undefined;
      const id = IdPrefix.QUESTION + index;
      questionList.push({
        id,
        index,
        name,
        selectedAnswered,
        ...questionInfo,
        image: imagePath,
        answerChecked: false
      });
    }
  }
  return questionList.sort().reverse();
}

function getRandomQuestion(numQuestion, questList) {
  let randomQuestions = [];
  const newQuestions = questList.map((question, index) => {
    return Object.assign({}, question, { selectedAnswered: [] });
  });
  const sortedList = newQuestions.sort(function() {
    return 0.5 - Math.random();
  });
  const randomList = sortedList.slice(0, numQuestion);
  for (index = 0; index < randomList.length; index++) {
    const question = randomList[index];
    randomQuestions.push(
      Object.assign({}, question, { 
        id: IdPrefix.RANDOM + index,
        index: index + 1
      })
    );
  }
  return randomQuestions;
}

function generateReviewThreads(questions) {
  let threads = [];
  const imageBeginIndex = QuestionParam.PICTURE_INDEX_BEGIN;
  const newQuestions = questions.map((question, index) => {
    return Object.assign({}, question, {
      selectedAnswered: undefined,
      answerChecked: true,
      reviewed: true,
      index: index + 1
    });
  });
  const questionLength = newQuestions.length;
  const imageQuestions = newQuestions
    .slice(imageBeginIndex, questionLength)
    .map((question, index) => {
      return Object.assign({}, question, {
        id: IdPrefix.REVIEW + index,
        selectedAnswered: undefined,
        answerChecked: true,
        reviewed: true,
        index: index + 1
      });
    });
  threads.push(
    {
      name: `${strings.training.full}`,
      type: ThreadType.REVIEW,
      description: `${strings.training.fullDescription}`,
      result: undefined,
      selected: false,
      questionList: newQuestions
    },
    {
      name: `${strings.training.pictures}`,
      type: ThreadType.REVIEW,
      description: `${strings.training.picturesDescription}`,
      result: undefined,
      selected: false,
      questionList: imageQuestions
    }
  );
  return threads;
}

function generateThreads(numQuestion, questions) {
  let threads = [];
  const max = QuestionParam.PICTURE_MAX_COUNT;
  const min = QuestionParam.PICTURE_MIN_COUNT;
  const imageBeginIndex = QuestionParam.PICTURE_INDEX_BEGIN;
  const questionLength = questions.length;
  const questionImageLength = questionLength - imageBeginIndex;

  const newQuestions = questions.map(question => {
    return Object.assign({}, question, { selectedAnswered: [] });
  });

  const defaultQuestions = newQuestions.slice(0, imageBeginIndex);
  const imageQuestions = newQuestions.slice(imageBeginIndex, questionLength);

  const sortedDefaultQuestions = defaultQuestions.sort(function() {
    return 0.5 - Math.random();
  });

  const sortedImageQuestions = imageQuestions.sort(function() {
    return 0.5 - Math.random();
  });
  let pictureBeginIndex = 0;
  let defaultBeginIndex = 0;
  for (let i = 0; i < 8; i++) {
    let pictureQuestionCount = Math.floor(Math.random() * (max - min) + min);
    let defaultQuestionCount = numQuestion - pictureQuestionCount;
    let lengthDefaultQuestion = defaultQuestionCount + defaultBeginIndex;
    let defaultQuestionList;
    if (lengthDefaultQuestion > imageBeginIndex - 1) {
      const firstDefaultList = sortedDefaultQuestions.slice(
        defaultBeginIndex,
        imageBeginIndex
      );
      const endIndex = lengthDefaultQuestion - imageBeginIndex;
      const secondDefaultList = sortedDefaultQuestions.slice(0, endIndex);
      defaultQuestionList = firstDefaultList.concat(secondDefaultList);
      defaultBeginIndex = endIndex;
    } else {
      defaultQuestionList = sortedDefaultQuestions.slice(
        defaultBeginIndex,
        lengthDefaultQuestion
      );
      defaultBeginIndex += defaultQuestionCount;
    }

    let lengthImageQuestion = pictureQuestionCount + pictureBeginIndex;
    let pictureQuestionList;
    if (lengthImageQuestion > questionImageLength - 1) {
      const firstImageList = sortedImageQuestions.slice(
        pictureBeginIndex,
        questionImageLength
      );
      const endImageIndex = lengthImageQuestion - questionImageLength;
      const secondImageList = sortedImageQuestions.slice(0, endImageIndex);
      pictureQuestionList = firstImageList.concat(secondImageList);
      pictureBeginIndex = endImageIndex;
    } else {
      pictureQuestionList = sortedImageQuestions.slice(
        pictureBeginIndex,
        lengthImageQuestion
      );
      pictureBeginIndex += pictureQuestionCount;
    }
    const totalQuestion = defaultQuestionList
      .concat(pictureQuestionList)
      .sort(function() {
        return 0.5 - Math.random();
      })
      .map((question, index) => {
        return Object.assign({}, question, {
          index: index + 1,
          id: IdPrefix.THREAD + i + index
        });
      });
    threads.push({
      name: `Đề Thi Số ${i + 1}`,
      type: ThreadType.DEFAULT,
      result: undefined,
      selected: false,
      questionList: totalQuestion
    });
  }
  return threads;
}

function getThreadQuestions(numQuestion, questions) {
  let threadQuestions = [];
  const max = QuestionParam.PICTURE_MAX_COUNT;
  const min = QuestionParam.PICTURE_MIN_COUNT;
  let pictureQuestionCount = Math.floor(Math.random() * (max - min) + min);
  const imageBeginIndex = QuestionParam.PICTURE_INDEX_BEGIN;
  let defaultQuestionCount = numQuestion - pictureQuestionCount;
  const newQuestions = questions.map(question => {
    return Object.assign({}, question, { selectedAnswered: [] });
  });

  const sortedList = newQuestions.sort(function() {
    return 0.5 - Math.random();
  });
  let index = 1;
  for (let idx = 0; idx < sortedList.length; idx++) {
    const question = sortedList[idx];
    if (question.image && pictureQuestionCount > 0) {
      pictureQuestionCount--;
      question.index = index;
      threadQuestions.push(question);
      index++;
    } else if (defaultQuestionCount > 0) {
      defaultQuestionCount--;
      question.index = index;
      threadQuestions.push(question);
      index++;
    }
    if (defaultQuestionCount == 0 && pictureQuestionCount == 0) {
      return threadQuestions;
    }
  }
  return threadQuestions;
}

export {
  getAllQuestion,
  getRandomQuestion,
  getThreadQuestions,
  generateThreads,
  generateReviewThreads,
  setAllQuestion
};
