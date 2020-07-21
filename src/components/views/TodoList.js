import React, { Component } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import LinearGradient from "react-native-linear-gradient";

export type Todo = {
  id: string,
  text: string,
  completed: boolean,
  onClick: () => {}
};

type TodoListProps = {
  todos: [Todo],
  onTodoClicked: () => {}
};

export default class TodoList extends Component<TodoListProps> {
  static defaultProps: TodoListProps = {
    todos: [],
    onTodoClicked: () => {}
  };

  renderRow = ({ item }) => {
    if (item.completed) {
      return (
        <ListItem
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          linearGradientProps={{
            colors: ["rgba(214,116,112,1)", "rgba(233,174,87,1)"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 }
          }}
          containerStyle={TodoStyle.containerItem}
          roundAvatar
          title={item.text}
          leftAvatar={{
            source: {
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
            }
          }}
          ViewComponent={LinearGradient}
          chevronColor="white"
          chevron
          badge={{
            status: "success",
            value: "Done",
            textStyle: { color: "red" }
          }}
        />
      );
    }
    return (
      <ListItem
        Component={TouchableScale}
        containerStyle={TodoStyle.containerItem}
        roundAvatar
        title={item.text}
        leftAvatar={{
          source: {
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
          }
        }}
        ViewComponent={LinearGradient}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
          colors: ["#AA9800", "#F44336"],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 }
        }}
        chevronColor="white"
        chevron
      />
    );
  };

  render() {
    const { todos } = this.props.todos;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={todos}
          renderItem={this.renderRow}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const TodoStyle = StyleSheet.create({
  containerItem: {
    flex: 1,
    borderRadius: 8,
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10
  }
});
