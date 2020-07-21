import React, { Component } from "react";
import ScalableButton from "./ScalableButton";
import { View } from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import BaseText from "./BaseText";
import ResultInfoView from "./ResultInfoView";

export type ThreadModelItem = {
  name: string,
  selected: boolean,
  onClick: () => {}
};

type ThreadItemProps = {
  threadItem: ThreadModelItem
};

export default class ThreadItem extends Component<ThreadItemProps> {
  static defaultProps = {
    threadItem: {
      name: "",
      selected: false,
      onClick: () => {},
      isLeft: true
    }
  };

  generateItemInfo = () => {
    const passedInfo = {
      text: "0",
      icon: require("../../assets/icons/tick.png"),
      tintColor: "#19AF86",
      textColor: "blue"
    };
    const wrongInfo = {
      text: "0",
      icon: require("../../assets/icons/wrong.png"),
      tintColor: "#FC563C",
      textColor: "red"
    };
    return { passedInfo, wrongInfo };
  };

  calculateInfoCount = questionList => {
    let passedCount = 0;
    let wrongCount = 0;
    for (let i = 0; i < questionList.length; i++) {
      const question = questionList[i];
      const acceptedAnswered = question.answer;
      const selectedAnswered = question.selectedAnswered;
      const selectedLength = selectedAnswered.length;

      if (selectedLength > 0) {
        if (selectedAnswered[0] === acceptedAnswered) {
          passedCount++;
        } else wrongCount++;
      }
    }
    return { passedCount, wrongCount };
  };

  render() {
    const { selected, questionList, result } = this.props.threadItem;
    let bgColor = "#CCCCCC";
    let textColor = "blue";
    if (result) {
      bgColor = "red";
      textColor = "white";
    }
    const { passedInfo, wrongInfo } = this.generateItemInfo();
    if (result) {
      passedInfo.text = result.passed;
      wrongInfo.text = result.wrong;
    }

    return (
      <ScalableButton
        friction={90}
        tension={100}
        activeScale={0.95}
        onPress={() => this.props.threadItem.onClick()}
      >
        <View style={[ThreadItemStyle.container, { backgroundColor: bgColor }]}>
          <View style={[ThreadItemStyle.subContainer]}>
            <BaseText
              style={[ThreadItemStyle.itemName, { color: textColor }]}
              text={this.props.threadItem.name}
            />
            {result && selected && (
              <View style={ThreadItemStyle.result}>
                <ResultInfoView
                  key={"passed"}
                  resultInfo={passedInfo}
                  style={{ marginRight: 10, color: "white" }}
                />
                <ResultInfoView
                  key={"wrong"}
                  resultInfo={wrongInfo}
                  style={{ marginLeft: 10 }}
                />
              </View>
            )}
          </View>
        </View>
      </ScalableButton>
    );
  }
}

const ThreadItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    width: Dimensions.get("window").width / 3.5,
    backgroundColor: "#CCCCCC",
    // alignContent: "center",
    borderRadius: 5,
    margin: 5,
    aspectRatio: 1
  },
  subContainer: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  icon: {
    width: 36,
    height: 36
  },
  itemName: {
    alignItems: "center",
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    fontWeight: "bold"
  },
  result: {
    width: "100%",
    position: "absolute",
    backgroundColor: "#CCCCCC",
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    justifyContent: "center",
    bottom: 0
  }
});
