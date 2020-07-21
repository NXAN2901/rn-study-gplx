import { Platform } from "react-native";
import { mediaDevices } from "react-native-webrtc";
import { Logger } from "../../modules/logger";

function getLocalStreamDevices(isFront, cb = () => {}) {
  mediaDevices
    .enumerateDevices()
    .then(sourcesInfos => {
      Logger.log({ sourcesInfos });
      let videoSourceId;
      for (let i = 0; i < sourcesInfos; i++) {
        const sourceInfo = sourcesInfos[i];
        if (
          sourceInfo == "videoinput" &&
          sourceInfo.facing == (isFront ? "front" : "back")
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 640,
              minHeight: 360,
              minFrameRate: 30
            },
            facingMode: isFront ? "user" : "environment",
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
          }
        })
        .then(stream => {
          Logger.log("getUserMedia success", stream);
          cb(stream);
        });
    })
    .catch(error => Logger.log("getLocalMedia Error: ", error));
}

const mapHash = (hash, func) => {
  const arr = [];
  for (const key in hash) {
    const obj = hash[key];
    arr.push(func(obj, key));
  }
  return arr;
};

export { getLocalStreamDevices, mapHash };
