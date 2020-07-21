import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, View, TouchableHighlight } from "react-native";
import { Image, Text, withBadge, Icon } from "react-native-elements";

export type HeaderIconProps = {
  strIconSource: String
};

export default class HeaderIcon extends Component {
  static defaultProps: HeaderIconProps = {
    strIconSource: require("../../assets/icons/refresh.png")
  };

  render() {
    // const MessagesBadge = withBadge(5)(Icon);
    const { counter } = this.props.value;
    return (
      <View style={style.container}>
        <Image source={this.props.strIconSource} />
        <Text style={style.textInfo}>{counter}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    // flex: 1,
    width: 60,
    height: 60
  },
  icon: {
    width: 24,
    height: 24
  },
  textInfo: {
    top: -3,
    right: 6,
    width: 24,
    height: 24,
    fontSize: 10,
    position: "absolute",
    color: "green",
    textAlign: "center",
    paddingTop: 6,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: "#BDBDBD",
    borderColor: "#d6d7da",
    textAlignVertical: "center",
    alignSelf: "center"
  }
});
