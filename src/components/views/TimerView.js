import React, { Component } from "react";
import { View, Text } from "native-base";
import { secondToMinutesAndSeconds } from "../../utils/CommonUtils";

type TimerViewProps = {
  time: number, //second
  timeCountStep: number,
  onTimeOut: () => {},
  onTick: number => {},
  disableCounter: boolean
};

export default class TimerView extends Component<TimerViewProps> {
  static defaultProps = {
    time: 1200,
    timeCountStep: 1,
    onTimeOut: () => {},
    onTick: () => {},
    disableCounter: false
  };

  constructor(props: Object) {
    super(props);
    this.state = { time: this.props.time };
  }

  componentDidMount() {
    if (this.props.disableCounter) {
      return;
    }
    this.interval = setInterval(() => {
      this.setState(prevState => ({ time: prevState.time - 1 }));
    }, 1000);
  }

  componentDidUpdate() {
    if (this.props.disableCounter) {
      return;
    }
    if (this.state.time == 0) {
      clearInterval(this.interval);
      this.props.onTimeOut(this.props.time);
    } else {
      this.props.onTick(this.props.time - this.state.time);
    }
  }

  componentWillUnmount() {
    if (this.props.disableCounter) {
      return;
    }
    clearInterval(this.interval);
  }

  render() {
    return (
      <View>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {secondToMinutesAndSeconds(this.state.time)}{" "}
        </Text>
      </View>
    );
  }
}
