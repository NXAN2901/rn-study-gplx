import ImagePicker from "react-native-image-picker";
import { Logger } from "../modules/logger";

const options = {
  title: "Select Photo",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const showImagePicker = (cb = url => {}) => {
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      Logger.log("User cancelled image picker");
    } else if (response.error) {
      Logger.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      Logger.log("User tapped custom button: ", response.customButton);
    } else {
      const source = { uri: response.uri };
      cb(source);
    }
  });
};

export { showImagePicker };
