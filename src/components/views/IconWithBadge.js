import React, { Component } from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type IconWithBadgeProps = {
  name: string,
  badgeCount: number,
  color: string,
  size: number
};

export default class IconWithBadge extends Component<IconWithBadgeProps> {
  static defaultProps: IconWithBadgeProps = {
    name: "",
    badgeCount: 0,
    color: "red",
    size: 8
  };

  render() {
    const { name, badgeCount, color, size } = this.props;
    const { counter } = badgeCount;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {counter > 0 && (
          <View
            style={{
              // If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: "absolute",
              right: -4,
              top: -2,
              backgroundColor: "red",
              borderRadius: 6,
              width: 14,
              fontSize: 4,
              height: 14,
              padding: 2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {counter}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
