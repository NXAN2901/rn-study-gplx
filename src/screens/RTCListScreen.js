import React from "react";
import { FlatList, Image } from "react-native";
import { Container } from "native-base";
import RTCRoomList from "../components/views/RTCRoomList";
import WebRTC from "../services/rtc/WebRTC";
import { Logger } from "../modules/logger";
import BaseRTCScreen from "./BaseRTCScreen";
import ScalableButton from "../components/views/ScalableButton";
import { NavigationEvents } from "react-navigation";
import { getStore } from "../modules/redux";
import {
  showInputDialog,
  dismissInputDialog
} from "../modules/redux/actions/AppActions";
import {
  provideRTCRoomInputs,
  provideRTCRoomDialogButton
} from "../utils/ScreenProvider";
import InputModel from "../data/model/InputModel";
import { addRoom, setRoomList } from "../modules/redux/actions/RTCActions";
import { connect } from "react-redux";

const RTCRoomListLink = connect(state => ({
  rtcRooms: state.rtc.rtc.roomList
}))(RTCRoomList);

export default class RTCListScreen extends BaseRTCScreen {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerRight: (
        <ScalableButton
          onPress={() => {
            const store = getStore();
            const inputs = provideRTCRoomInputs();
            const buttons = provideRTCRoomDialogButton();
            buttons[1].onPressed = (inputs: [InputModel]) => {
              Logger.log("Add Room: ", inputs);
              WebRTC.addRoom(inputs[0].getText(), inputs[1].getText(), room => {
                Logger.log("Room Added", room);
                store.dispatch(addRoom(room));
              });
              store.dispatch(dismissInputDialog());
            };
            store.dispatch(showInputDialog(inputs, buttons));
          }}
        >
          <Image
            style={{
              width: 24,
              height: 24,
              marginRight: 20,
              tintColor: "white"
            }}
            source={require("../assets/icons/refresh.png")}
          />
        </ScalableButton>
      )
    };
  };

  onRoomList(roomList) {
    if (!roomList) {
      return;
    }
    const newRoomList = Object.keys(roomList).map(key => {
      return Object.assign({}, roomList[key], { id: key });
    });
    getStore().dispatch(setRoomList(newRoomList));
    Logger.log("newRoomList: ", getStore().getState().rtc.rtc.roomList);
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <RTCRoomListLink />
        <NavigationEvents
          onWillFocus={payload => {
            Logger.log("WillFocused: ", payload);
            WebRTC.setContainer(this);
            WebRTC.connect();
            WebRTC.getRoomList();
          }}
          // onDidFocus={payload => console.log("did focus", payload)}
          // onWillBlur={payload => console.log("will blur", payload)}
          // onDidBlur={payload => console.log("did blur", payload)}
        />
      </Container>
    );
  }
}
