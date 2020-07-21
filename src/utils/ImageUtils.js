import ImageResizer from "react-native-image-resizer";
import { Logger } from "../modules/logger";

function resizeImage(path, cb = res => {}) {
  return function(newWidth) {
    return function(newHeight) {
      return function(compressFormat) {
        return function(quality) {
          return function(rotation) {
            return function(outputPath) {
              ImageResizer.createResizedImage(
                path,
                newWidth,
                newHeight,
                compressFormat,
                quality,
                rotation,
                outputPath
              )
                .then(result => {
                  cb(result);
                })
                .catch(error => Logger.error("Resize Image Err: ", error));
            };
          };
        };
      };
    };
  };
}

const currResize = resizeImage;

function resizeJPG(path, cb) {
  Logger.log("resizeJPG: ", { path });
  resizeImage(path, cb)(720)(1280)("JPEG")(100)(0)(null);
}

export { resizeJPG, resizeImage };
