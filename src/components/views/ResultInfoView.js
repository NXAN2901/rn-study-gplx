import React, { Component } from "react";
import { View } from "native-base";
import { Image } from "react-native";
import BaseText from "./BaseText";

export type ResultInfo = {
  icon: string,
  text: string,
  tintColor: string,
  textColor: string
};

type ResultInfoViewProps = {
  resultInfo: ResultInfo
};

export default class ResultInfoView extends Component<ResultInfoViewProps> {
  render() {
    let { textColor } = this.props.resultInfo;
    if (!textColor) {
      textColor = "black";
    }
    return (
      <View style={[{ flexDirection: "row" }, this.props.style]}>
        <Image
          style={{
            width: 14,
            height: 14,
            tintColor: this.props.resultInfo.tintColor
          }}
          source={this.props.resultInfo.icon}
        />
        <BaseText
          style={{ marginLeft: 6, color: textColor }}
          text={this.props.resultInfo.text}
        />
      </View>
    );
  }
}
