import RNFS from "react-native-fs";
import { Logger } from "../modules/logger";

// const RNFS = require("react-native-fs");
const readFile = encode => {
  return function(path, cb = res => {}) {
    RNFS.readFile(path, encode).then(response => {
      cb(response);
    });
  };
};

const readPhotoBase64 = readFile("base64");

export { readFile, readPhotoBase64 };
