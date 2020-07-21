import React, { Component } from "react";

export default class BaseRTCScreen extends Component {
  onRemoteList(remoteList) {}

  onLocalStream(localStream) {}

  onRTCStatus(status) {}

  onReceiveTextData(user, message) {}

  onAddStream() {}

  onError(error) {}

  onMessage(message){}

  onPhoto(message) {}

  onRoomList(roomList) {}
}
