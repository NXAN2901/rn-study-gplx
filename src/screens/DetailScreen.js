import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { NavigationTag } from "../utils/Constants";
import { Screen } from "react-native-screens";

export default class DetailScreen extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam("name", "NoName")
  //   };
  // };

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.name : "Param NoName",
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam("itemId", "NO-ID");
    const detailName = navigation.getParam("name", "NoName");
    return (
      <Screen
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(id)}</Text>
        <Text>otherParam: {JSON.stringify(detailName)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push("Detail")}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </Screen>
    );
  }
}
