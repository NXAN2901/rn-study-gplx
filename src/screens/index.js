import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  NavigationActions
} from "react-navigation";
import { strings } from "../i18n";
import { Text } from "native-base";
import { SafeAreaView } from "react-native";
import MainScreen from "./MainScreen";
import ThreadScreen from "./ThreadScreen";
import RandomExamScreen from "./RandomExamScreen";
import ReviewScreen from "./ReviewScreen";
import { NavigationTag } from "../utils/Constants";
import { BaseButton, HeaderIcon } from "../components/index";
import NavigationService from "../services/NavigationService";
import { useScreens } from "react-native-screens";
import { getStore } from "../modules/redux";
import { Provider, connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconWithBadge from "../components/views/IconWithBadge";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ResultScreen from "./ResultScreen";
import { initRealm, getRealm, closeRealm } from "../modules/realm";
import Loading from "../components/views/Loading";
import RTCListScreen from "./RTCListScreen";
import WebRTC from "../services/rtc/WebRTC";
import InputDialog from "../components/views/InputDialog";
import { Logger } from "../modules/logger";
import RTCScreen from './RTCScreen';

MaterialIcons.loadFont();
Ionicons.loadFont();

useScreens();

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

function getCurrentParams(state) {
  if (state.routes) {
    return getCurrentParams(state.routes[state.index]);
  }
  return state.params || {};
}

const ResultScreenLink = connect(state => ({
  result: state.question.result
}))(ResultScreen);

const ThreadScreenLink = connect(state => ({
  threads: state.question.questions.threads,
  result: state.question.result
}))(ThreadScreen);

const LoadingLink = connect(state => ({
  visible: state.ui.dialog.loading.visible
}))(Loading);

const InputDialogLink = connect(state => ({
  visible: state.ui.dialog.inputDialog.visible,
  inputs: state.ui.dialog.inputDialog.inputs,
  buttons: state.ui.dialog.inputDialog.buttons
}))(InputDialog);

const UINavigator = createStackNavigator(
  {
    MAIN: MainScreen,
    RANDOM_QUESTION: RandomExamScreen,
    RESULT_SCREEN: ResultScreenLink,
    THREAD_SCREEN: ThreadScreenLink,
    REVIEW_SCREEN: ReviewScreen,
    RTC_LIST_SCREEN: RTCListScreen,
    RTC_SCREEN: RTCScreen
  },
  {
    headerLayoutPreset: "center",
    initialRouteName: NavigationTag.Main,
    defaultNavigationOptions: {
      title: `${strings.main.home}`,
      headerStyle: {
        backgroundColor: "#5A98CB"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        flex: 1
      }
    }
  }
);

const AppContainer = createAppContainer(UINavigator);

export default class App extends React.Component {
  gotoDetail = () => {
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: NavigationTag.DETAIL })
      );
  };

  componentDidMount() {
    initRealm();
    WebRTC.init();
  }

  componentWillUnmount() {
    closeRealm();
  }

  render() {
    return (
      <MenuProvider>
        <Provider store={getStore()}>
          <LoadingLink />
          <InputDialogLink />
          <AppContainer
            onNavigationStateChange={(prevState, currentState, nextState) => {
              const currentScreen = getActiveRouteName(currentState);
            }}
            uriPrefix="/app"
            ref={nav => {
              this.navigator = nav;
              NavigationService.setTopLevelNavigator(nav);
            }}
          />
        </Provider>
      </MenuProvider>
    );
  }
}
