import React, { Component } from "react";
import { View, Text } from "react-native";
import { BaseButton } from "../components/index";

export default class ModalScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <BaseButton
          action={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}
