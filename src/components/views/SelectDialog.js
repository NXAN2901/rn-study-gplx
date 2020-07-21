import React, { Component } from "react";
import { View, Text } from "native-base";
import { ConfirmDialog } from "react-native-simple-dialogs";

type SelectDialogProps = {
  visible: boolean,
  content: string,
  title: string,
  leftButtonTitle: string,
  rightButtonTitle: string,
  onLeftPressed: () => {},
  onRightPressed: () => {},
  question: {}
};

export default class SelectDialog extends Component<SelectDialogProps> {
  static defaultProps = {
    visible: false,
    title: "",
    content: "",
    leftButtonTitle: "NO",
    rightButtonTitle: "YES",
    onLeftPressed: () => {},
    onRightPressed: () => {}
  };

  render() {
    return (
      <ConfirmDialog
        visible={this.props.visible}
        title={this.props.title}
        negativeButton={
          this.props.leftButtonTitle && {
            title: this.props.leftButtonTitle,
            onPress: () => this.props.onLeftPressed()
          }
        }
        positiveButton={
          this.props.rightButtonTitle && {
            title: this.props.rightButtonTitle,
            onPress: () => this.props.onRightPressed()
          }
        }
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {this.props.content}
          </Text>
        </View>
      </ConfirmDialog>
    );
  }
}
