import React, { Component } from "react";
import { Text, View } from "native-base";
import { Question } from "../../services/QuestionProvider";

type QuestionCountProps = {
  max: number,
  question: Question
};

export default class QuestionCount extends Component<QuestionCountProps> {
  render() {
    if (this.props.question) {
      const index = this.props.question.index;
      return (
        <Text style={{ paddingLeft: 10, color: "white" }}>
          {index}/{this.props.max}
        </Text>
      );
    }
    return <View />;
  }
}
