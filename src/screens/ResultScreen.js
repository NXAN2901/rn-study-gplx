import React, { Component } from "react";
import { View, Text, Container } from "native-base";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import ResultList from "../components/views/ResultList";
import ResultSumView from "../components/views/ResultSumView";
import ResultInfoListView from "../components/views/ResultInfoListView";
import { provideResultInfoViews } from "../utils/ScreenProvider";
import ScalableButton from "../components/views/ScalableButton";
import { Image } from "react-native";
import NavigationService from "../services/NavigationService";
import { NavigationTag } from "../utils/Constants";

export type Result = {
  none: number,
  passed: number,
  wrong: number,
  resultList: number,
  time: number
};

type ResultScreenProps = {
  result: Result
};

const ResultListLink = connect(state => ({
  resultList: state.question.questions.currentThread.result.resultList
}))(ResultList);

const ResultSumLink = connect(state => ({
  result: state.question.questions.currentThread.result
}))(ResultSumView);

const ResultInfoListViewLink = connect(state => ({
  result: state.question.questions.currentThread.result
}))(ResultInfoListView);

export default class ResultScreen extends Component<ResultScreenProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: "Kết Quả Bài Thi",
      headerLeft: (
        <ScalableButton
          onPress={() => NavigationService.goHome()}
        >
          <Image
            style={{
              width: 24,
              height: 24,
              marginLeft: 20,
              tintColor: "white"
            }}
            source={require("../assets/icons/home.png")}
          />
        </ScalableButton>
      ),
      headerRight: (
        <ScalableButton>
          <Image
            style={{
              width: 24,
              height: 24,
              marginRight: 20,
              tintColor: "white"
            }}
            source={require("../assets/icons/share.png")}
          />
        </ScalableButton>
      )
    };
  };

  static defaultProps = {
    result: {
      none: 0,
      passed: 0,
      wrong: 0,
      resultList: []
    }
  };

  render() {
    const infoList = provideResultInfoViews();
    return (
      <Container>
        <ResultSumLink style={{ marginTop: 10 }} />
        <ResultInfoListViewLink
          style={{ justifyContent: "center", marginTop: 12 }}
          infoList={infoList}
        />
        <ResultListLink style={{ marginTop: 10 }} />
      </Container>
    );
  }
}
