/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/screens/index";
import { name as appName } from "./app.json";
import { initStore } from "./src/modules/redux/index";
console.disableYellowBox = true;
initStore();

AppRegistry.registerComponent(appName, () => App);

// import RCTWebRTCDemo from "./App";
// import RTCScreen from "./src/screens/RTCScreen";
// AppRegistry.registerComponent(appName, () => RTCScreen);
