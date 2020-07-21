import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import ScalableButton from "../../components/views/ScalableButton";
import LinearGradient from "react-native-linear-gradient";
import TouchableScale from "react-native-touchable-scale";
import NavigationService from "../../services/NavigationService";
import { NavigationTag } from "../../utils/Constants";

type RTCRoomListProps = {
  rtcRooms: [
    {
      id: string,
      name: string,
      token: string
    }
  ]
};

export default class RTCRoomList extends Component<RTCRoomListProps> {
  static defaultProps = {
    rtcRooms: []
  };

  renderRoomItem = ({ item, index }) => {
    return (
      <ListItem
        onPress={() => {
          NavigationService.navigate(NavigationTag.RTC_SCREEN, {
            roomID: item.id,
            displayName: item.name
          });
        }}
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        key={item.id}
        title={item.name}
        bottomDivider
        chevron
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "gray" }}>
        <FlatList
          scrollEnabled={false}
          renderItem={this.renderRoomItem}
          keyExtractor={item => `${item.name + item.id}`}
          data={this.props.rtcRooms}
        />
      </View>
    );
  }
}
