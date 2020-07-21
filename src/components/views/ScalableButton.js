import React, { Component } from "react";
import TouchableScale from "react-native-touchable-scale";

type ScalableProps = {
  friction: number,
  tension: number,
  activeScale: number,
  onPress: () => {}
};

export default class ScalableButton extends Component<ScalableProps> {
  static defaultProps: ScalableProps = {
    friction: 90,
    tension: 100,
    activeScale: 0.95,
    onPress: () => {}
  };

  render() {
    return (
      <TouchableScale
        {...this.props.style}
        onPress={this.props.onPress}
        activeScale={this.props.activeScale}
        friction={this.props.friction}
        tension={this.props.tension}
      >
        {this.props.children}
      </TouchableScale>
    );
  }
}
