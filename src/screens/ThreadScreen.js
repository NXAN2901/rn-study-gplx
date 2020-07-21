import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { View, Container } from "native-base";
import ThreadList from "../components/views/ThreadList";
import { getStore } from "../modules/redux/index";
import {
  getThreadsQuestion,
  setCurrentThread,
  setThreadSelected,
  refreshThread
} from "../modules/redux/actions/QuestionActions";
import { QuestionParam, NavigationTag } from "../utils/Constants";
import NavigationService from "../services/NavigationService";
import ScalableButton from "../components/views/ScalableButton";
import { strings } from "../i18n";
import { Logger } from "../modules/logger";
import {
  dismissLoading,
  showLoading
} from "../modules/redux/actions/AppActions";

type ThreadScreenProps = {
  threads: [],
  result: {}
};

export default class ThreadScreen extends Component<ThreadScreenProps> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: `${strings.threads.title}`,
      headerLeft: (
        <ScalableButton
          onPress={() => NavigationService.navigate(NavigationTag.MAIN)}
        >
          <Image
            style={{
              width: 24,
              height: 24,
              marginLeft: 20,
              tintColor: "white"
            }}
            source={require("../assets/icons/home.png")}
          />
        </ScalableButton>
      ),
      headerRight: (
        <ScalableButton onPress={() => getStore().dispatch(refreshThread())}>
          <Image
            style={{
              width: 24,
              height: 24,
              marginRight: 20,
              tintColor: "white"
            }}
            source={require("../assets/icons/refresh.png")}
          />
        </ScalableButton>
      )
    };
  };

  static defaultProps = {
    threads: []
  };

  render() {
    let threads = [];
    if (this.props.threads) {
      if (this.props.threads.length > QuestionParam.THREAD_NUMBER) {
        threads = this.props.threads.slice(1, QuestionParam.THREAD_NUMBER + 1);
      } else {
        threads = this.props.threads;
      }
      threads = threads.map(thread => {
        return Object.assign({}, thread, {
          onClick: () => {
            const store = getStore();
            store.dispatch(setCurrentThread(thread));
            store.dispatch(setThreadSelected(thread));
            NavigationService.navigate(NavigationTag.RANDOM_QUESTION, {
              reviewState: false
            });
          }
        });
      });
    }
    return (
      <Container style={ThreadScreenStyle.container}>
        <ThreadList style={ThreadScreenStyle.listItem} threadList={threads} />
      </Container>
    );
  }
}

const ThreadScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  listItem: {
    flex: 1,
    alignContent: "center"
  }
});
