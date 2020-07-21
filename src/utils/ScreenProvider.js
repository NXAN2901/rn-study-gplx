import NavigationService from "../services/NavigationService";
import { NavigationTag } from "./Constants";
import { getStore } from "../modules/redux/index";
import {
  getRandomQuestion,
  setCurrentThread,
  getErrorsThread
} from "../modules/redux/actions/QuestionActions";
import { QuestionParam } from "../utils/Constants";
import strings from "../i18n/Locale";
import { Input, Button } from "../data/model";
import { Color } from "../assets";
import { dismissInputDialog } from '../modules/redux/actions/AppActions';

export function provideMainListItem() {
  const listItem = [];
  listItem.push(
    {
      name: `${strings.main.randomThread}`,
      icon: require("../assets/icons/random.png"),
      bgColor: "orange",
      isFlexEnd: true,
      onClick: () => {
        const store = getStore();
        store.dispatch(getRandomQuestion(QuestionParam.RANDOM_COUNT));
        const randomThread = store.getState().question.questions.threads[0];
        store.dispatch(setCurrentThread(randomThread));
        NavigationService.navigate(NavigationTag.RANDOM_QUESTION, {
          reviewState: false
        });
      }
    },
    {
      name: `${strings.main.threads}`,
      icon: require("../assets/icons/test.png"),
      bgColor: "tomato",
      isFlexEnd: false,
      onClick: () => NavigationService.navigate(NavigationTag.THREAD_SCREEN)
    },
    {
      name: `${strings.main.wrongOverview}`,
      icon: require("../assets/icons/wrong.png"),
      bgColor: "#67D844",
      isFlexEnd: true,
      onClick: () => {
        const store = getStore();
        store.dispatch(getErrorsThread());
        const errorThread = store.getState().question.questions.errorThread;
        if (!errorThread.questionList || errorThread.questionList.length == 0) {
          alert("Don't Have Error Question");
          return;
        }
        store.dispatch(setCurrentThread(errorThread));
        NavigationService.navigate(NavigationTag.RANDOM_QUESTION, {
          reviewState: true,
          title: `${strings.wrongQuestions.title}`,
          backState: false
        });
      }
    },
    {
      name: `${strings.main.training}`,
      icon: require("../assets/icons/book.png"),
      bgColor: "#3BBBBF",
      isFlexEnd: false,
      onClick: () => NavigationService.navigate(NavigationTag.REVIEW_SCREEN)
    },
    {
      name: `${strings.main.rtc}`,
      icon: require("../assets/icons/book.png"),
      bgColor: "#3BBBBF",
      isFlexEnd: false,
      onClick: () => NavigationService.navigate(NavigationTag.RTC_LIST_SCREEN)
    }
  );
  return listItem;
}

export function provideResultInfoViews() {
  const infoViews = [];
  infoViews.push(
    {
      name: "0",
      icon: require("../assets/icons/sum.png"),
      tintColor: "#454545"
    },
    {
      name: "0",
      icon: require("../assets/icons/tick.png"),
      tintColor: "#19AF86"
    },
    {
      name: "0",
      icon: require("../assets/icons/wrong.png"),
      tintColor: "#FC563C"
    },
    {
      name: "0",
      icon: require("../assets/icons/exclamation-point.png"),
      tintColor: "#F59331"
    }
  );
  return infoViews;
}

export function provideReviewItemViews() {
  const reviewViews = [];
  reviewViews.push(
    {
      name: `${strings.training.full}`,
      description: `${strings.training.fullDescription}`,
      questions: []
    },
    {
      name: `${strings.training.pictures}`,
      description: `${strings.training.picturesDescription}`,
      questions: []
    }
  );
  return reviewViews;
}

export function provideRTCRoomInputs() {
  return [
    new Input("Enter Room", "Room Name", "", ""),
    new Input("Display Name", "Display Name", "", "")
  ];
}

export function provideRTCRoomDialogButton() {
  return [
    new Button("Cancel", Color.green, Color.white, (inputs) => {
      getStore().dispatch(dismissInputDialog())
    }),
    new Button("OK", Color.green, Color.white, null)
  ];
}
