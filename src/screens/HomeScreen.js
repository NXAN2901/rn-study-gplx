import React from "react";
import { View, Text, StatusBar, Button, StyleSheet } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  NavigationEvents
} from "react-navigation";
import { NavigationTag } from "../utils/Constants";
import HeaderIcon from "../components/header/HeaderIcon";
import { BaseButton } from "../components/index";
import { Screen } from "react-native-screens";
// import { Header } from "react-native-elements";
// import { Button } from 'react-native-elements';

import { getStore, initStore } from "../modules/redux/index";
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter
} from "../modules/redux/actions/TodoAction";
import {
  VisibilityFilters,
  INCREMENT,
  DECREMENT
} from "../modules/redux/actions/ActionsTypes";
import NavigationService from "../services/NavigationService";
import { connect } from "react-redux";
import TodoList from "../components/views/TodoList";
import FABMenu from "../components/views/FABMenu";
import { ENV_NAME, BASE_URL } from "../config/Config";
// import { boundIncrement } from "../modules/redux/actions/CounterActions";

export type HomeScreenProps = {
  // count: number
};

let HeaderRight = connect(state => ({ value: state.counter }))(HeaderIcon);
let TodoListView = connect(state => ({ todos: state.todo }))(TodoList);

export default class HomeScreen extends React.Component<HomeScreenProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        // <HeaderIcon strIconSource={require("../assets/icons/ic_noti.png")} />
        <HeaderRight strIconSource={require("../assets/icons/ic_noti.png")} />
      ),
      headerLeft: (
        <BaseButton
          action={() => {
            const store = getStore();
            store.dispatch(addTodo("Learn about actions"));
            store.dispatch({ type: DECREMENT });
          }}
          title="Info"
          textColor="#000"
          type="clear"
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      count: this.props.count
    });
    // const store = getStore();
    // // Log the initial state
    // console.log(store.getState());

    // // Every time the state changes, log it
    // // Note that subscribe() returns a function for unregistering the listener
    // const unsubscribe = store.subscribe(() => console.log(store.getState()));
    // // Dispatch some actions
    // store.dispatch(addTodo("Learn about actions"));
    // store.dispatch(addTodo("Learn about reducers"));
    // store.dispatch(addTodo("Learn about store"));
    // store.dispatch(toggleTodo(0));
    // store.dispatch(toggleTodo(1));
    // store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

    // // Stop listening to state updates
    // unsubscribe();
  }

  render() {
    return (
      <Screen style={HomeStyle.container}>
        <StatusBar barStyle="light-content" backgroundColor="#f4511e" />
        <Text>{this.props.navigation.getParam("counter")}</Text>

        {/* <Button
          title="Go to Details"
          onPress={() => {
            const store = getStore();
            this.props.dispatch({ type: INCREMENT });
            // this.props.navigation.navigate(NavigationTag.DETAIL, {
            //   itemId: 86,
            //   name: "DetailName"
            // });
          }}
        /> */}
        {/* <HeaderIcon strIconSource={require('../assets/icons/ic_detail.png')}/> */}
        <FABMenu style={HomeStyle.FAB}>
          <TodoListView style={HomeStyle.todos} />
        </FABMenu>
        {/* <NavigationEvents
          onWillFocus={payload => console.log("will focus", payload)}
          onDidFocus={payload => console.log("did focus", payload)}
          onWillBlur={payload => console.log("will blur", payload)}
          onDidBlur={payload => console.log("did blur", payload)}
        /> */}
      </Screen>
    );
  }
}

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: "center",
    // justifyContent: "center"
  },
  FAB: {
    // flex: 1,
    position: "absolute"
  },
  todos: {
    flex: 1,
    height: "100%"
  }
});
