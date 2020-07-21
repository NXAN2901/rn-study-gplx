import React, { Component } from 'react';
import { Text } from 'react-native-elements';

export type BaseTextProps = {
  text: string,
}

export default class BaseText extends Component<BaseTextProps> {
  render() {
    return (
      <Text style={this.props.style}>{this.props.text}</Text>
    )
  }

}