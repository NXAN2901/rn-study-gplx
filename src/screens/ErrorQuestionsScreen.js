import React, { Component } from "react";
import { View } from 'native-base';
import RandomQuestion from "../components/views/RandomQuestion";

type ErrorQuestionsScreenProps = {};

const RandomQuestionLink = connect(state => ({
  question: state.question.questions.currentQuestion
}))(RandomQuestion);

export default class ErrorQuestionsScreen extends Component<ErrorQuestionsScreenProps> {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: "",
      headerTitle: (
        <TimerView
          onTick={time => {
            timeCounter = time;
          }}
          onTimeOut={time => {
            timeCounter = time;
            getStore().dispatch(result(timeCounter));
            NavigationService.replace(NavigationTag.RESULT_SCREEN);
          }}
        />
      ),
      headerLeft: <QuestionCountLink max={QuestionParam.RANDOM_COUNT} />,
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            getStore().dispatch(showRequestMarkDlg());
          }}
        >
          <Text style={{ color: "white", paddingRight: 10 }}>Chấm Điểm</Text>
        </TouchableOpacity>
      )
    };
  };
  
  render() {
    return (
      <View>
        <RandomQuestionLink />
      </View>
    )
  }
}
