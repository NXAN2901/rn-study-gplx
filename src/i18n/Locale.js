import LocalizedStrings from "react-native-localization";
import * as vn from "./vn.json";
import * as en from "./en.json";

let strings = new LocalizedStrings({
  vn,
  "en-US": en
});

export default strings;
