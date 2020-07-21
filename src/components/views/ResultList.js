import React, { Component } from "react";
import { FlatList } from "react-native";
import { View } from "native-base";
import ResultItem, { Result } from "./ResultItem";

type ResultListProps = {
  resultList: [ResultItem]
};

export default class ResultList extends Component<ResultListProps> {
  static defaultProps = {
    resultList: []
  };

  renderResultItem = ({ item }) => {
    return <ResultItem resultModel={item} />;
  };

  render() {
    return (
      <View style={[{ flex: 1 }, this.props.style]}>
        <FlatList
          style={{ flex: 1, width: "100%", height: "100%" }}
          data={this.props.resultList}
          scrollEnabled={false}
          renderItem={this.renderResultItem}
          numColumns={5}
          keyExtractor={item => item.name}
          columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
        />
      </View>
    );
  }
}
