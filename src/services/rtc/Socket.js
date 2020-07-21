import io from "socket.io-client";
import { RTC_URL } from "../../config/Config";
import { Logger } from "../../modules/logger";
import Peer from "./Peer";
import RTC from "./RTC";
import { Object } from "core-js";
import { getLocalStreamDevices } from "./RTCUtils";
import { RtcStatus } from "../../utils/Constants";

// const url = "https://rtc-server-demo.herokuapp.com/"
const url = "http://172.16.1.28:3000/";
export default class Socket {
  constructor() {
    this.rtc = undefined;
    this.socket = null;
    this.peer = undefined;
  }

  setPeer = (peer: Peer) => {
    this.peer = peer;
  };

  getPeer = () => this.peer;

  setRTC = (rtc: RTC) => {
    this.rtc = rtc;
  };

  getRtc = () => this.rtc;

  connect = () => {
    Logger.log("URL: ", RTC_URL);
    this.socket = io.connect(RTC_URL, { transports: ["websocket"] });
  };

  join = (roomInfo: { roomId: string, displayName: string }) => {
    Logger.log("join", roomInfo);
    this.socket.emit("join", roomInfo, socketIds => {
      Logger.log("join", socketIds);
      for (const id in socketIds) {
        const socketId = socketIds[id];
        this.getPeer().createPC(socketId, true);
      }
    });
  };

  leave = socketId => {
    Logger.log("leave", socketId);
    const pcPeers = this.getPeer().getPcPeers();
    const pc = pcPeers[socketId];
    if (pc) {
      const viewIndex = pc.viewIndex;
      pc.close();
      const remoteList = container.state.remoteList;
      delete remoteList[socketId];
      const container = this.getRtc().getContainer();
      if (container) {
        container.onRemoteList(remoteList);
      }
    }
  };

  mapHash = (hash, func) => {
    Logger.log({ hash, func });
    const arr = [];
    for (const key in hash) {
      const obj = hash[key];
      arr.push(func(obj, key));
    }
    return arr;
  };

  handleOnChange = () => {
    this.socket.on("exchange", data => {
      this.getPeer().exchange(data);
    });
  };

  handleOnLeave = () => {
    this.socket.on("leave", socketId => {
      this.leave(socketId);
    });
  };

  handleOnConnect = () => {
    this.socket.on("connect", data => {
      getLocalStreamDevices(true, stream => {
        Logger.log("localStream", stream);
        this.getRtc().setLocalStream(stream);
        const container = this.getRtc().getContainer();
        if (container) {
          container.onLocalStream(stream);
          container.onRTCStatus(RtcStatus.READY);
        }
      });
    });
  };

  emitExchange = (socketId, candidate) => {
    this.socket.emit("exchange", {
      to: socketId,
      candidate
    });
  };

  emitExchangeSdp = (socketId, localDescription) => {
    this.socket.emit("exchange", {
      to: socketId,
      sdp: localDescription
    });
  };

  emitSendMessage = (roomId, displayName, message) => {
    this.socket.emit("send-message", { roomId, displayName, message }, data => {
      Logger.log("EmitSendMessage", data);
    });
  };

  emitSendPhoto = (roomId, photoData) => {
    this.socket.emit("send-image", { roomId, photoData }, data => {
      Logger.log("Emit Send Photo: ", data);
    });
  };

  handleOnMessage = () => {
    this.socket.on("send-message", data => {
      Logger.log("handleOnMessage", data);
      const container = this.getRtc().getContainer();
      if (container) {
        container.onMessage(data);
      }
    });
  };

  handleOnPhoto = () => {
    this.socket.on("send-image", data => {
      Logger.log("handleOnPhoto: ", data);
      const container = this.getRtc().getContainer();
      if (container) {
        container.onPhoto(data);
      }
    });
  };

  handleOnLeave = () => {
    this.socket.on("leave", socketId => {
      this.leave(socketId);
    });
  };

  emitGetRooms = () => {
    this.socket.emit("list-room", roomList => {
      const container = this.getRtc().getContainer();
      if (container) {
        container.onRoomList(roomList);
      }
    });
  };

  emitAddRooms = (roomInfo: { roomId: string, displayName: string }, cb: (room) => {}) => {
    this.socket.emit("create-room", roomInfo, cb);
  };

  // getStats = () => {
  //   const pcPeers = this.getPeer().getPcPeers();
  //   const pc = pcPeers[Object.keys(pcPeers)[0]];
  //   const remoteStream = pc.getRemoteStreams()[0];
  //   if (remoteStream && remoteStream.getAudioTrackks()[0]) {
  //     const track = remoteStream.getAudioTrackks()[0];
  //     Logger.log("track", track);
  //     pc.getStats(track)
  //       .then(report => {
  //         Logger.log("getStats Report", report);
  //       })
  //       .catch(error => Logger.log("GetStats Error: ", error));
  //   }
  // };
}
