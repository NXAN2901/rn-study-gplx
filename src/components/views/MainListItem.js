import React, { Component } from "react";
import { FlatList, View } from "react-native";
import MainItem, { MainModelItem } from "./MainItem";

type MainListItemProps = {
  mainList: [MainModelItem]
};

export default class MainListItem extends Component<MainListItemProps> {
  static defaultProps: MainListItemProps = {
    mainList: []
  };

  renderRow = ({ item }) => {
    return <MainItem mainModel={item} />;
  };

  render() {
    return (
      <View>
        <FlatList
          scrollEnabled={false}
          // style={{ width: "100%" }}
          data={this.props.mainList}
          numColumns={2}
          renderItem={this.renderRow}
          keyExtractor={item => item.name}
          columnWrapperStyle={{ flex: 1, justifyContent: "center" }}
        />
      </View>
    );
  }
}
