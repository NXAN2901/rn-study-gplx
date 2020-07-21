import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription
} from "react-native-webrtc";
import { Logger } from "../../modules/logger";
import RTC from "./RTC";
import Socket from "./Socket";

export default class Peer {
  constructor() {
    this.pcPeers = {};
    this.rtc = undefined;
    this.socket = undefined;
    this.dataChannler = undefined;
  }

  setPcPeers = pcPeers => {
    this.pcPeers = pcPeers;
  };

  getPcPeers = () => this.pcPeers;

  setRTCModel = (rtc: RTC) => {
    this.rtc = rtc;
  };

  setSocket = (socket: Socket) => {
    this.socket = socket;
  };

  getRTC = () => this.rtc;

  setDataChannel = dataChannel => {
    this.dataChannel = dataChannel;
  };

  getDataChannel = () => this.dataChannel;

  createPC = (socketId, isOffer) => {
    const pc = new RTCPeerConnection(this.configuration);
    const container = this.getRTC().getContainer();
    const localStream = this.getRTC().getLocalStream();
    this.pcPeers[socketId] = pc;
    pc.onicecandidate = event => {
      Logger.log("onicecandidate", event.candidate);
      if (event.candidate) {
        this.socket.emitExchange(socketId, event.candidate);
      }
    };

    pc.onnegotiationneeded = () => {
      Logger.log("onnegotiationneeded");
      if (isOffer) {
        this.createOffer(pc, socketId);
      }
    };

    pc.onsignalingstatechange = event => {
      Logger.log("onsignalingstatechange:", event.target.signalingState);
    };

    pc.onaddstream = event => {
      Logger.log("onaddstream: ", event.stream);
      this.getRTC()
        .getContainer()
        .onAddStream();
      const remoteList = this.getRTC().getContainer().state.remoteList;
      remoteList[socketId] = event.stream.toURL();
      this.getRTC()
        .getContainer()
        .onRemoteList(remoteList);
    };
    pc.onremovestream = event => {
      Logger.log("onremovestream:", event.stream);
    };
    pc.addStream(localStream);
    return pc;
  };

  createDataChannel = (pc: RTCPeerConnection) => {
    if (pc.textDataChannel) {
      return;
    }
    const dataChannel = pc.createDataChannel("text");
    this.setDataChannel(dataChannel);
    this.onDataChannelCreated(dataChannel);
    pc.textDataChannel = dataChannel;
  };

  createOffer = (pc: RTCPeerConnection, socketId) => {
    pc.createOffer()
      .then(desc => {
        Logger.log("createOffer", desc);
        return pc.setLocalDescription(desc);
      })
      .then(() => {
        Logger.log("setLocalDescription", pc.localDescription);
        this.socket.emitExchangeSdp(socketId, pc.localDescription);
      })
      .catch(error => Logger.log("CreateOffer Error", error));
  };

  exchange = data => {
    Logger.log("exchange", data);
    const fromId = data.from;
    let pc: RTCPeerConnection;
    Logger.log("this.pcPeers", this.pcPeers);
    if (fromId in this.pcPeers) {
      pc = this.pcPeers[fromId];
    } else {
      pc = this.createPC(fromId, false);
    }
    Logger.log("pc", pc);

    if (data.sdp) {
      Logger.log({ ExchangeData: data });
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
        .then(() => {
          if (pc.remoteDescription.type == "offer") {
            pc.createAnswer()
              .then(desc => {
                Logger.log("createAnswer", desc);
                return pc.setLocalDescription(desc);
              })
              .then(() => {
                Logger.log("setLocalDescription", pc.localDescription);
                this.socket.emitExchangeSdp(fromId, pc.localDescription);
              });
          }
        })
        .catch(error => Logger.log("exchange error: ", error));
    } else {
      Logger.log("exchange candidate", data);
      pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  onDataChannelCreated = dataChannel => {
    dataChannel.onerror = error => {
      Logger.log("ChannelError: ", error);
    };
    dataChannel.onmessage = event => {
      Logger.log("dataChannel.onmessage:", event.data);
      this.getRTC()
        .getContainer()
        .onReceiveTextData(socketId, event.data);
    };
    dataChannel.onopen = () => {
      Logger.log("datachannel.onopen");
    };

    dataChannel.onclose = () => {
      Logger.log("datachannel.onclose");
    };
  };

  sendPhoto = () => {
    const CHUNK_LEN = 64000
  }
}
