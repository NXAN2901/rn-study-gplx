import BaseRTCScreen from "../../screens/BaseRTCScreen";

const defaultAvatar = require("../../assets/icons/avatar_1.png");
export default class RTC {
  constructor() {
    this.localStream = undefined;
    this.remoteStream = undefined;
    this._container = undefined;
    this.socketId = undefined;
    this.avatar = defaultAvatar;
    this.peers = {};
  }

  setLocalStream = localStream => {
    this.localStream = localStream;
  };

  getLocalStream = () => this.localStream;

  setRemoteStream = remoteStream => {
    this.remoteStream = remoteStream;
  };

  getRemoteStream = () => this.remoteStream;

  setContainer = (container: BaseRTCScreen) => {
    this._container = container;
  };

  getContainer = (): BaseRTCScreen => this._container;

  setSocketId = socketId => {
    this.socketId = socketId;
  };

  getSocketId = () => this.socketId;

  setAvatar = avatar => {
    this.avatar = avatar;
  };

  getAvatar = () => this.avatar;
}
