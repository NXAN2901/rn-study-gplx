import React, { Component } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import BaseText from "./BaseText";
import ScalableButton from "./ScalableButton";
import LinearGradient from "react-native-linear-gradient";
import ReactContainer from "./RectContainer";

export type Result = {
  name: string,
  state: ["PASSED" | "FAILED" | "NONE"]
};

type ResultItemProps = {
  resultModel: Result
};

export default class ResultItem extends Component<ResultItemProps> {
  static defaultProps: ResultItemProps = {
    resultModel: {
      name: "",
      state: "NONE"
    }
  };

  renderIcon = state => {
    let icon;
    let tintColor;
    switch (state) {
      case "PASSED":
        tintColor = "green";
        icon = require("../../assets/icons/tick.png");
        break;
      case "WRONG":
        tintColor = "red";
        icon = require("../../assets/icons/wrong.png");
        break;
      default:
        tintColor = "#F59331";
        icon = require("../../assets/icons/exclamation-point.png");
    }

    return (
      <Image style={[ResultItemStyle.icon, { tintColor }]} source={icon} />
    );
  };

  render() {
    const { name, state } = this.props.resultModel;
    return (
      <View
        style={[ResultItemStyle.container, { backgroundColor: "#808D8D8D" }]}
      >
        <BaseText style={ResultItemStyle.itemName} text={name} />
        {this.renderIcon(state)}
      </View>
    );
  }
}

const ResultItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    alignContent: "center",
    borderRadius: 3,
    margin: 5,
    aspectRatio: 1
  },
  icon: {
    width: 16,
    height: 16,
    marginTop: 10,
    tintColor: "white"
  },
  itemName: {
    marginTop: 6,
    color: "black",
    fontWeight: "500",
    fontSize: 10
  }
});
