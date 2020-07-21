import React, { Component } from "react";
import { View, Text } from "native-base";
import { StyleSheet, Image } from "react-native";
import { Result } from "../../screens/ResultScreen";
import { secondToMinutesAndSeconds } from "../../utils/CommonUtils";

type ResultSumViewProps = {
  result: Result
};

export default class ResultSumView extends Component<ResultSumViewProps> {
  renderTime = ({ time }) => {
    return (
      <View style={ResultSumViewStyle.timeContainer}>
        <Image
          style={{
            width: 14,
            height: 14,
            marginRight: 6,
            alignSelf: "center",
            tintColor: "#1A8EBA"
          }}
          source={require("../../assets/icons/clock.png")}
        />
        <Text style={{ color: "#356697", textAlignVertical: "center" }}>
          {secondToMinutesAndSeconds(this.props.result.time)}
        </Text>
      </View>
    );
  };

  renderResultSum = ({ wrong, none }) => {
    if (wrong > 0 || none > 0) {
      return <Text style={ResultSumViewStyle.failedText}>Không Đạt</Text>;
    }
    return <Text style={ResultSumViewStyle.passedText}>Đạt</Text>;
  };

  renderPassedCount = ({ passed, total }) => {
    return (
      <Text style={ResultSumViewStyle.passedCount}>{`${passed}/${total}`}</Text>
    );
  };

  render() {
    if (this.props.result) {
      const { time, wrong, none, passed, total } = this.props.result;
      return (
        <View style={[ResultSumViewStyle.container, this.props.style]}>
          {this.renderTime(time)}
          {this.renderResultSum({ wrong, none })}
          {this.renderPassedCount({ passed, total })}
        </View>
      );
    }
    return <View />;
  }
}

const ResultSumViewStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  timeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 6
  },
  failedText: {
    flex: 1.2,
    color: "#FC0D1B",
    textAlign: "center",
    backgroundColor: "#EAA7A6",
    padding: 10
  },
  passedText: {
    flex: 1.2,
    color: "#FC0D1B",
    textAlign: "center",
    backgroundColor: "green",
    padding: 10
  },
  passedCount: {
    flex: 1,
    color: "red",
    marginLeft: 10
  }
});
