import React, { Component } from "react";
import { SafeAreaView, Image, Platform, ScrollView } from "react-native";
import { View, Text } from "native-base";
import RandomQuestion from "../components/views/RandomQuestion";
import { Question } from "../services/QuestionProvider";
import { QuestionParam, ThreadType } from "../utils/Constants";
import { connect } from "react-redux";
import { getStore } from "../modules/redux/index";
import {
  showRequestMarkDlg,
  getRandomQuestion,
  setCurrentRandomQuestion,
  dismissMarkDlg,
  showCurrentQuestionAnswer,
  result,
  setCurrentThread
} from "../modules/redux/actions/QuestionActions";
import RandomExamNavigator from "../components/views/RandomExamNavigator";
import TimerView from "../components/views/TimerView";
import QuestionCount from "../components/views/QuestionCount";
import { TouchableOpacity } from "react-native-gesture-handler";
import SelectDialog from "../components/views/SelectDialog";
import NavigationService from "../services/NavigationService";
import { NavigationTag } from "../utils/Constants";
import ScalableButton from "../components/views/ScalableButton";
import PopupMenuQuestion from "../components/views/PopupMenuQuestion";
import { Logger } from "../modules/logger";

type RandomExamScreenProps = {
  questionList: [Question]
};

const SelectDialogCustom = () => {
  return <SelectDialog {...this.props} />;
};

const PopupMenuQuestionLink = connect(state => ({
  questionList: state.question.questions.currentThread.questionList
}))(PopupMenuQuestion);

const RandomQuestionLink = connect(state => ({
  question: state.question.questions.currentQuestion
}))(RandomQuestion);

const RandomExamNavigatorLink = connect(state => ({
  maxCount: state.question.questions.currentThread.questionList.length,
  question: state.question.questions.currentQuestion
}))(RandomExamNavigator);

const QuestionCountLink = connect(state => ({
  question: state.question.questions.currentQuestion
}))(QuestionCount);

const SelectDialogLink = connect(state => ({
  visible: state.question.mark.showMarkDlg
}))(SelectDialog);

let timeCounter = 0;

export default class RandomExamScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    const store = getStore();
    const currentThread = store.getState().question.questions.currentThread;
    const threadType = currentThread.type;
    const threadResult = currentThread.result;
    const result = currentThread.result;
    const { reviewState, title, backState } = params;
    if (!threadResult) {
      navigationOptions.gesturesEnabled = false;
    }
    switch (threadType) {
      case ThreadType.ERRORS:
      case ThreadType.REVIEW: {
        return {
          headerTitle: (
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                color: "white",
                fontWeight: "bold"
              }}
            >
              {title}
            </Text>
          ),
          headerLeft: (
            <ScalableButton onPress={() => NavigationService.back()}>
              {backState ? (
                <Image
                  source={require("../assets/icons/left-arrow.png")}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    tintColor: "white"
                  }}
                />
              ) : (
                <Image
                  source={require("../assets/icons/home.png")}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    tintColor: "white"
                  }}
                />
              )}
            </ScalableButton>
          ),
          headerRight: (
            <View style={{ marginRight: 10 }}>
              <PopupMenuQuestionLink>
                <Image
                  source={require("../assets/icons/pop-up.png")}
                  style={{
                    width: 24,
                    height: 24,
                    marginLeft: 10,
                    tintColor: "white"
                  }}
                />
              </PopupMenuQuestionLink>
            </View>
          )
        };
      }
      default:
        return {
          headerTitle: (
            <TimerView
              time={result ? result.time : 1200}
              onTick={time => {
                timeCounter = time;
              }}
              disableCounter={result}
              onTimeOut={time => {
                timeCounter = time;
                getStore().dispatch(result(timeCounter));
                NavigationService.replace(NavigationTag.RESULT_SCREEN);
              }}
            />
          ),
          headerLeft: <QuestionCountLink max={QuestionParam.RANDOM_COUNT} />,
          headerRight: (
            <View style={{ marginRight: 10 }}>
              {threadResult ? (
                <PopupMenuQuestionLink>
                  <Image
                    source={require("../assets/icons/pop-up.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: 10,
                      tintColor: "white"
                    }}
                  />
                </PopupMenuQuestionLink>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    getStore().dispatch(showRequestMarkDlg());
                  }}
                >
                  <Text style={{ color: "white", paddingRight: 10 }}>
                    Chấm Điểm
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )
        };
    }
  };

  componentDidMount() {
    const store = getStore();
    store.dispatch(setCurrentRandomQuestion(0));
  }

  render() {
    let marginBottom = 0;
    if (Platform.OS == "android") {
      marginBottom = 64;
    }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#5A98CB"
        }}
      >
        <SelectDialogLink
          style={{ position: "absolute", alignItems: "center" }}
          title="Kết Thúc"
          content="Kết thúc bài thi và chấm điểm"
          onLeftPressed={() => {
            getStore().dispatch(dismissMarkDlg());
          }}
          onRightPressed={() => {
            getStore().dispatch(result(timeCounter));
            getStore().dispatch(dismissMarkDlg());
            NavigationService.replace(NavigationTag.RESULT_SCREEN);
          }}
        />
        <View style={{ flex: 10, backgroundColor: "white" }}>
          <ScrollView style={{ flex: 9, marginBottom }}>
            <RandomQuestionLink />
          </ScrollView>

          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "flex-end",
              position: "absolute",
              bottom: 0,
              height: 64
            }}
          >
            <RandomExamNavigatorLink
              previousOnClick={() => {
                const store = getStore();
                const currentIndex =
                  store.getState().question.questions.currentQuestion.index - 1;
                const previous = currentIndex - 1;
                store.dispatch(setCurrentRandomQuestion(previous));
              }}
              nextOnClick={() => {
                const store = getStore();
                const currentIndex =
                  store.getState().question.questions.currentQuestion.index - 1;
                const next = currentIndex + 1;
                store.dispatch(setCurrentRandomQuestion(next));
              }}
              onAnswerClick={() => {
                const store = getStore();
                store.dispatch(showCurrentQuestionAnswer());
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
