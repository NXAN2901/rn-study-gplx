import { Platform } from "react-native";
import io from "socket.io-client";

import {
  RTCPeerConnection,
  MediaStreamTrack,
  mediaDevices,
  RTCSessionDescription,
  RTCIceCandidate
} from "react-native-webrtc";
import RTC from "./RTC";
import Peer from "./Peer";
import Socket from "./Socket";
import BaseRTCScreen from "../../screens/BaseRTCScreen";

class WebRTC {
  init = () => {
    this.rtc = new RTC();
    this.rtc.setContainer(null);

    this.socket = new Socket();
    this.peer = new Peer();

    this.peer.setRTCModel(this.rtc);
    this.peer.setSocket(this.socket);

    this.socket.setPeer(this.peer);
    this.socket.setRTC(this.rtc);
  };

  setContainer = (container: BaseRTCScreen) => {
    this.rtc.setContainer(container);
  };

  connect = () => {
    const socket = this.socket;
    socket.connect();
    socket.handleOnConnect();
    socket.handleOnChange();
    socket.handleOnLeave();
    socket.handleOnMessage();
  };

  leave = () => {
    this.socket.leave();
  };

  join = (roomId, displayName) => {
    this.socket.join({ roomId, displayName });
  };

  sendMessage = (roomId, displayName, message) => {
    this.socket.emitSendMessage(roomId, displayName, message);
  };

  sendPhoto = (roomId, photoData) => {
    this.socket.emitSendPhoto(roomId, photoData);
  };

  getRoomList = () => {
    this.socket.emitGetRooms();
  };

  addRoom = (roomId, displayName, cb: (room) => {}) => {
    this.socket.emitAddRooms({ roomId, displayName }, cb);
  };
}

export default new WebRTC();
