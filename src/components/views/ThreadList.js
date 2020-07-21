import React, { Component } from "react";
import { FlatList, View } from "react-native";
import ThreadItem, { ThreadModelItem } from "./ThreadItem";
import { Logger } from "../../modules/logger";

type ThreadListItemProps = {
  threadList: [ThreadItem]
};

export default class ThreadList extends Component<ThreadListItemProps> {
  static defaultProps: ThreadListItemProps = {
    threadList: []
  };

  renderRow = ({ item }) => {
    return <ThreadItem threadItem={item} />;
  };

  render() {
    return (
      <View>
        <FlatList
          scrollEnabled={false}
          data={this.props.threadList}
          numColumns={2}
          renderItem={this.renderRow}
          keyExtractor={item => item.name}
          columnWrapperStyle={{ flex: 1, justifyContent: "center" }}
        />
      </View>
    );
  }
}
