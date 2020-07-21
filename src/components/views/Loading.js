import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Platform,
  Text
} from "react-native";
import { Logger } from "../../modules/logger";

export type LoadingProps = {
  showing: boolean,
  size: ["small" | "large"],
  color: string,
  text: string,
  visible: boolean,
  shouldShowText: boolean
};
export default class Loading extends Component<LoadingProps> {
  static defaultProps: LoadingProps = {
    showing: false,
    size: "large",
    color: "white",
    visible: true,
    shouldShowText: false,
    text: "Loading"
  };

  renderText = () => {
    if (this.props.shouldShowText) {
      return <Text style={styles.text}>{this.props.text}</Text>;
    }
    return null;
  };

  render() {
    const visible = this.props.visible;
    if (visible) {
      return (
        <View style={styles.container} visible={visible}>
          {/* <View style={{ borderRadius: 6, backgroundColor: "gray" }}> */}
          <ActivityIndicator
            style={styles.indicator}
            color={this.props.color}
            animating
            size="large"
          />
          {this.renderText()}
          {/* </View> */}
        </View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    backgroundColor: "#80808080"
    // backgroundColor: "black"
    // ...Platform.select({
    //   ios: {
    //     marginBottom: 64
    //   },
    //   android: {
    //     marginBottom: 54
    //   }
    // })
  },
  indicator: {
    backgroundColor: "transparent"
  },
  text: {
    marginTop: 34,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray"
  }
});
