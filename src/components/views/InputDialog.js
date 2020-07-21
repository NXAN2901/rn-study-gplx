import React, { Component } from "react";
import {
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView
} from "react-native";
import Dialog from "./Dialog";
import { Input, Button as ButtonModel } from "../../data/model";
import { Logger } from "../../modules/logger";
import BaseButton from "../views/BaseButton";
import { Color } from "../../assets";
import KeyboardShift from "./KeyboardShift";

type InputDialogProps = {
  visible: boolean,
  inputs: [Input],
  buttons: [ButtonModel]
};

export default class InputDialog extends Component<InputDialogProps> {
  static defaultProps = {
    inputs: []
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  renderInputs = () => {
    const inputs = this.props.inputs;
    Logger.log("inputs:", inputs);
    const arr = [];
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      arr.push(
        <View key={input.title} style={{ marginTop: 8 }}>
          <Text>{input.title}</Text>
          <TextInput
            placeholder={input.placeholder}
            style={{
              borderRadius: 5,
              marginTop: 8,
              paddingLeft: 8,
              paddingRight: 8,
              height: 48,
              borderColor: "#8d8d8d",
              borderWidth: 2
            }}
            onChangeText={text => input.setText(text)}
          />
        </View>
      );
    }
    return arr;
  };

  generateButtons = () => {
    const buttons = this.props.buttons || [];
    Logger.log("buttons:", buttons);
    const arr = [];
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const text = button.getText();
      const key = text || `${i}`;
      const bgColor = button.getBgColor() || Color.transparent;
      const textColor = button.getTextColor() || "blue";
      Logger.log("textColor: ", textColor);
      arr.push(
        <TouchableOpacity
          key={key}
          style={{
            flex: 1,
            height: 48,
            alignItems: "center",
            justifyContent: "center"
            // backgroundColor: bgColor
          }}
          onPress={() => button.execute(this.props.inputs)}
        >
          <Text style={{ color: textColor }}>{text}</Text>
        </TouchableOpacity>
      );
    }
    return <View style={{ flexDirection: "row" }}>{arr}</View>;
  };

  render() {
    return (
      <KeyboardShift>
        <Dialog
          title="InputDialog"
          buttons={this.generateButtons()}
          visible={this.props.visible}
          buttonsStyle={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
          // onTouchOutside={() => this.setState({ dialogVisible: false })}
        >
          <View>{this.renderInputs()}</View>
        </Dialog>
      </KeyboardShift>
    );
  }
}
