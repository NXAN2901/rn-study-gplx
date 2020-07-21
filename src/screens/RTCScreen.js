import React from "react";
import BaseRTCScreen from "./BaseRTCScreen";
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { RTCView } from "react-native-webrtc";
import WebRTC from "../services/rtc/WebRTC";
import { RtcStatus } from "../utils/Constants";
import { Logger } from "../modules/logger";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import KeyboardAccessory from "react-native-sticky-keyboard-accessory";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getDimensions } from "../utils/ScreenUtils";
import { showImagePicker } from "../utils/ImagePicker";
import { readPhotoBase64 } from "../utils/FileUtils";
import { resizeJPG, resizeImage } from "../utils/ImageUtils";

const { width, height } = getDimensions();

type RTCScreenProps = {
  roomId: String,
  displayName: string
};

export default class RTCScreen extends BaseRTCScreen<RTCScreenProps> {
  static defaultProps = {
    roomID: "",
    displayName: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      info: "Initializing",
      status: RtcStatus.INITIALIZATION,
      roomID: "",
      isFront: true,
      selfViewSrc: null,
      remoteList: {},
      textRoomConnected: false,
      message: "",
      messageList: [],
      textRoomData: [],
      textRoomValue: ""
    };
  }

  onRemoteList(remoteList) {
    this.setState({ remoteList });
  }

  onLocalStream(localStream) {
    Logger.log("onLocalStream", localStream);
    this.setState({ selfViewSrc: localStream.toURL() });
  }

  onRTCStatus(status) {
    Logger.log("status", status);
    switch (status) {
      case RtcStatus.READY:
        this.setState({
          status: RtcStatus.READY,
          info: "Please enter or create room ID"
        });
        break;
      case RtcStatus.INITIALIZATION:
      default:
        this.setState({
          status: RtcStatus.INITIALIZATION,
          info: "Initializing"
        });
    }
  }

  onReceiveTextData(user, message) {}

  onAddStream() {
    this.setState({ info: "One Peer Join!" });
  }

  onError(error) {}

  componentDidMount() {
    // this.roomId = "123";
    this.webRTC = WebRTC;
    this.webRTC.setContainer(this);
    this.webRTC.join(this.props.roomID, this.props.displayName);
  }

  _press = event => {
    this.webRTC.join(this.state.roomID);
    // this.refs.roomID.blur();
    this.setState({ status: "connect", info: "Connecting" });
  };

  onChangeMessageText = value => {
    this.setState({ message: value });
  };

  onPressSend = () => {
    const { message, messageList } = this.state;
    if (message === "") {
      return;
    }
    this.webRTC.sendMessage(this.roomId, "An", message);
    const newListMsg = this.state.messageList.slice();
    newListMsg.push({ displayName: "An", message, type: "message" });
    this.setState({ message: "", messageList: newListMsg });
  };

  onMessage(message) {
    const newListMsg = this.state.messageList.slice();
    newListMsg.push(message);
    this.setState({ message: "", messageList: newListMsg });
  }

  onPhoto(message) {
    const newListMsg = this.state.messageList.slice();
    newListMsg.push(message);
    this.setState({ message: "", messageList: newListMsg });
  }

  renderRemotes = () => {
    const remoteList = this.state.remoteList;
    Logger.log("RemoteList: ", this.state.remoteList);
    const array = [];
    if (remoteList) {
      for (const key in remoteList) {
        const obj = remoteList[key];
        array.push(
          <RTCView key={0} streamURL={obj} style={styles.remoteView} />
        );
      }
    }
    return array;
  };

  renderLocalVideo = () => {
    return (
      <View style={styles.WrapLocalVideo}>
        <RTCView
          objectFit="contain"
          streamURL={this.state.selfViewSrc}
          zOrder={1}
          style={styles.selfView}
        />
      </View>
    );
  };

  renderMainRemote = () => {
    const remoteList = this.state.remoteList;
    Logger.log("RemoteList: ", this.state.remoteList);
    const arr = [];
    if (remoteList) {
      for (const key in remoteList) {
        const obj = remoteList[key];
        arr.push(
          <RTCView
            key={key}
            streamURL={obj}
            style={styles.remoteView}
            objectFit="cover"
          />
        );
      }
      return arr;
    }
    return <View style={styles.remoteView} />;
  };

  onPressHeart = () => {
    showImagePicker(source => {
      Logger.log("ImagePick: ", source);
      resizeJPG(source.uri, res => {
        Logger.log("Begin readPhotoBase64", res);
        readPhotoBase64(res.uri, res => {
          Logger.log("ReadPhoto", res);
          this.webRTC.sendPhoto(this.roomId, res);

          const { messageList } = this.state;
          const newListMsg = this.state.messageList.slice();
          newListMsg.push({
            photoData: res,
            type: "photo"
          });
          this.setState({ message: "", messageList: newListMsg });
        });
      });
    });
  };

  renderWrapBottom = () => {
    const { message } = this.state;
    if (Platform.OS === "ios") {
      return (
        <KeyboardAccessory>
          <View style={styles.wrapBottom}>
            <TextInput
              style={styles.textInput}
              placeholder="Comment input"
              underlineColorAndroid="transparent"
              onChangeText={this.onChangeMessageText}
              value={message}
            />
            <TouchableOpacity
              style={styles.wrapIconSend}
              onPress={this.onPressSend}
              activeOpacity={0.6}
            >
              <Image
                source={require("../assets/icons/ico_send.png")}
                style={styles.iconSend}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrapIconHeart}
              onPress={this.onPressHeart}
              activeOpacity={0.6}
            >
              <Image
                source={require("../assets/icons/ico_send.png")}
                style={styles.iconHeart}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAccessory>
      );
    } else {
      return (
        <View style={styles.wrapBottom}>
          <TextInput
            style={styles.textInput}
            placeholder="Comment input"
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeMessageText}
            value={message}
          />
          <TouchableOpacity
            style={styles.wrapIconSend}
            onPress={this.onPressSend}
            activeOpacity={0.6}
          >
            <Image
              source={require("../assets/icons/ico_send.png")}
              style={styles.iconSend}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapIconHeart}
            onPress={this.onPressHeart}
            activeOpacity={0.6}
          >
            <Image
              source={require("../assets/icons/ico_send.png")}
              style={styles.iconHeart}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    const { messageList } = this.state;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={styles.container}
        >
          <View style={styles.container}>
            {this.renderMainRemote()}
            {this.renderLocalVideo()}
            {this.renderWrapBottom()}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.wrapListMessages}>
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
          >
            {/* <RTCView streamURL={this.state.selfViewSrc} style={styles.selfView} /> */}
            {messageList.length > 0 &&
              messageList.map(item => {
                return (
                  <View>
                    {item.type === "photo" ? (
                      <Image
                        style={{ width: 64, height: 128 }}
                        source={{
                          uri: `data:image/gif;base64,${item.photoData}`
                        }}
                      />
                    ) : (
                      <View style={styles.chatItem}>
                        <View style={styles.wrapAvatar}>
                          <Image
                            source={item.avatar}
                            style={styles.iconAvatar}
                          />
                        </View>
                        <View style={styles.messageItem}>
                          <Text style={styles.name}>{item.displayName}</Text>
                          <Text style={styles.content}>{item.message}</Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    width: width,
    height: height
  },
  selfView: {
    width: 200,
    height: 150
  },
  remoteView: {
    width: width,
    height: height,
    zIndex: -1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  listViewContainer: {
    height: 150
  },
  wrapBottom: {
    zIndex: 50,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: height / 2,
    width: width
  },
  wrapListMessages: {
    zIndex: 10000,
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    height: height / 3,
    width: width
  },
  chatItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 5
  },
  messageItem: {
    flexDirection: "column",
    marginHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15
  },
  wrapIconSend: {
    position: "absolute",
    bottom: 5,
    right: 65,
    width: 42,
    height: 42,
    borderRadius: 42,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  iconSend: {
    width: 33,
    height: 33
  },
  textInput: {
    position: "absolute",
    bottom: 4,
    left: 15,
    right: 120,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 42
  },
  WrapLocalVideo: {
    position: "absolute",
    marginTop: 10,
    right: -20,
    top: 0
  },
  localVideoContainer: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  wrapListMessages: {
    zIndex: 10000,
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    height: height / 3,
    width: width
  },
  wrapIconHeart: {
    position: "absolute",
    bottom: 5,
    right: 12,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center"
  },
  iconHeart: {
    width: 42,
    height: 42
  }
});
