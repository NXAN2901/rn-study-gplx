import React, { Component } from "react";
import { View, Thumbnail, Text } from "native-base";
import { Image } from "react-native";
import ScalableButton from "../views/ScalableButton";
import { QuestionParam, ThreadType } from "../../utils/Constants";
import { Question } from "../../services/QuestionProvider";
import { getStore } from "../../modules/redux";
import { isDisableChoiceAnsweredThreadType } from "../../utils/ScreenUtils";

type RandomExamNavigatorProps = {
  drawableRight: string,
  drawableLeft: string,
  previousOnClick: () => {},
  nextOnClick: () => {},
  title: string,
  maxCount: number,
  question: Question,
  onAnswerClick(): () => {}
};

export default class RandomExamNavigator extends Component<RandomExamNavigatorProps> {
  static defaultProps = {
    drawableLeft: require("../../assets/icons/left-arrow.png"),
    drawableRight: require("../../assets/icons/right-arrow.png"),
    title: "Đáp Án",
    maxCount: QuestionParam.RANDOM_COUNT
  };

  renderLeftNav = isShowLeftNav => {
    if (isShowLeftNav) {
      return (
        <ScalableButton
          style={{ width: 48, height: 48 }}
          activeScale={0.75}
          onPress={this.props.previousOnClick}
        >
          <Image
            style={{
              width: 24,
              height: 24,
              tintColor: "white",
              marginLeft: 8
            }}
            source={this.props.drawableLeft}
          />
        </ScalableButton>
      );
    }
    return <View style={{ marginLeft: 8, width: 24, height: 24 }} />;
  };

  renderRightNav = isShowRightNav => {
    if (isShowRightNav) {
      return (
        <ScalableButton
          style={{ width: 48, height: 48 }}
          onPress={this.props.nextOnClick}
          activeScale={0.75}
        >
          <Image
            style={{
              width: 24,
              height: 24,
              tintColor: "white",
              marginRight: 8
            }}
            source={this.props.drawableRight}
          />
        </ScalableButton>
      );
    }
    return <View style={{ marginLeft: 8, width: 24, height: 24 }} />;
  };

  render() {
    if (this.props.question) {
      const index = this.props.question.index;
      const isShowLeftNav = index > 1;
      const isShowRightNav = index < this.props.maxCount;
      const selectedAnswered = this.props.question.selectedAnswered;
      const currentThread = getStore().getState().question.questions
        .currentThread;
      const threadType = currentThread.type;
      const threadResult = currentThread.result;
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            backgroundColor: "#5A98CB"
          }}
        >
          {this.renderLeftNav(isShowLeftNav)}
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {!isDisableChoiceAnsweredThreadType(threadType) && !threadResult ? (
              <ScalableButton
                activeScale={0.75}
                onPress={this.props.onAnswerClick}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  {this.props.title}
                </Text>
              </ScalableButton>
            ) : (
              <Text style={{ textAlign: "center", color: "white" }}>
                {index}/{this.props.maxCount}
              </Text>
            )}
          </View>
          {this.renderRightNav(isShowRightNav)}
        </View>
      );
    }
    return <View />;
  }
}
