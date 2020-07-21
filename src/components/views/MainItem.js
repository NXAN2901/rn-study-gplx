import React, { Component } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import BaseText from "./BaseText";
import ScalableButton from "./ScalableButton";
import LinearGradient from "react-native-linear-gradient";
import ReactContainer from "./RectContainer";

export type MainModelItem = {
  name: string,
  icon: string,
  bgColor: string,
  isFlexEnd: boolean,
  onClick: () => {}
};

type MainItemProps = {
  mainModel: MainModelItem
};

export default class MainItem extends Component<MainItemProps> {
  static defaultProps: MainItemProps = {
    mainModel: {
      name: "",
      icon: require("../../assets/icons/refresh.png"),
      bgColor: "green",
      isFlexEnd: true
    }
  };

  render() {
    const { bgColor, isFlexEnd, onClick } = this.props.mainModel;
    return (
      <ScalableButton
        friction={90}
        tension={100}
        activeScale={0.95}
        onPress={() => this.props.mainModel.onClick()}
      >
        <View style={[MainItemStyle.container, { backgroundColor: bgColor }]}>
          <View style={[MainItemStyle.subContainer]}>
            <Image
              style={MainItemStyle.icon}
              source={this.props.mainModel.icon}
            />
            <BaseText
              style={MainItemStyle.itemName}
              text={this.props.mainModel.name}
            />
          </View>
        </View>
      </ScalableButton>
    );
  }
}

const MainItemStyle = StyleSheet.create({
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
    marginTop: 20,
    color: "white",
    fontWeight: "500",
    fontSize: 14
    // flex: 1
  }
});
