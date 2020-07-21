import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Container, Button, Text } from "native-base";
import { provideMainListItem, provideRTCRoomInputs, provideRTCRoomDialogButton } from "../utils/ScreenProvider";
import MainListItem from "../components/views/MainListItem";
import {
  questionList,
  getRandomQuestion,
  setAllQuestion
} from "../services/QuestionProvider";
import { getStore } from "../modules/redux/index";
import {
  getAllQuestions,
  getThreadsQuestion
} from "../modules/redux/actions/QuestionActions";
import { QuestionParam } from "../utils/Constants";
import { getQuestions } from "../services/QuestionApi";
import ScalableButton from "../components/views/ScalableButton";
import { strings } from "../i18n";
import { Logger } from "../modules/logger";
import {
  showLoading,
  dismissLoading,
  showInputDialog
} from "../modules/redux/actions/AppActions";
import { threadDAO, questionDAO } from "../modules/realm";

function callGetQuestions() {
  const store = getStore();
  store.dispatch(showLoading());
  getQuestions()
    .then(data => {
      store.dispatch(getAllQuestions(data));
      threadDAO.getAllThreads().then(threads => {
        store.dispatch(getThreadsQuestion(QuestionParam.RANDOM_COUNT, threads));
        store.dispatch(dismissLoading());
      });
    })
    .catch(error => {
      alert("Get Data Error");
      store.dispatch(dismissLoading());
    });
}

export default class MainScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerRight: (
        <ScalableButton onPress={() => callGetQuestions()}>
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

  constructor(props) {
    super(props);
    this.state = {
      mainListItem: []
    };
  }

  _onSetLanguageToVN() {
    strings.setLanguage("vn");
    this.setState({});
  }

  componentDidMount() {
    this._onSetLanguageToVN();
    callGetQuestions();
    const store = getStore();
    this.unsubscribe = store.subscribe(() => {
        Logger.log("store", store.getState());
    });
    this.setState({
      mainListItem: provideMainListItem()
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Container style={MainScreenStyle.container}>
        <MainListItem
          style={MainScreenStyle.listItem}
          mainList={this.state.mainListItem}
        />
      </Container>
    );
  }
}

const MainScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  listItem: {
    flex: 1,
    alignContent: "center"
  }
});
