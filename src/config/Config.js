import Config from "react-native-config";

const config = {
  api: {
    host: Config.HOST,
    timeout: 20000,
    env: Config.ENV,
    sKey: Config.SKEY
  },
  rtc: {
    host: Config.HOST_RTC,
    ice: Config.ICE_SERVER
  }
};

const BASE_URL = config.api.host;
const ENV_NAME = config.api.env;
const KEY = config.api.sKey;
const RTC_URL = config.rtc.host;
const RTC_ICE = {iceServers: [{url: `${config.rtc.ice}`}]};
const IS_PRODUCTION = config.IS_PRODUCTION

export { BASE_URL, ENV_NAME, KEY, RTC_URL, RTC_ICE, IS_PRODUCTION };

export default config;
