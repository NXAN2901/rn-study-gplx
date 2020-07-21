import React, { Component } from "react";

import { StyleSheet, View } from "react-native";

export default class ReactContainer extends Component {
  render() {
    return (
      <View style={styles.RectangleShapeView}>
        {/* <View style={styles.SquareShapeView} /> */}
          {this.props.children}
        {/* <View style={styles.RectangleShapeView} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  RectangleShapeView: {
    // height: "70%",
    // aspectRatio: 1,
    marginRight:10,
    marginTop:10,
    marginBottom:10,
  }
});
