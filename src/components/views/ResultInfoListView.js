import React, { Component } from "react";
import { View, ListItem } from "native-base";
import ResultInfoView, { ResultInfo } from "./ResultInfoView";
import { Result } from "../../screens/ResultScreen";

type ResultInfoListViewProps = {
  infoList: [ResultInfo],
  result: Result
};

export default class ResultInfoListView extends Component<ResultInfoListViewProps> {
  renderInfoList = (infoList, result) => {
    let infoViewList = [];
    let text = "0";
    for (let i = 0; i < infoList.length; i++) {
      switch (i) {
        case 0:
          text = result.total;
          break;
        case 1:
          text = result.passed;
          break;
        case 2:
          text = result.wrong;
          break;
        default:
          text = result.none;
      }
      const infoItem = infoList[i];
      infoItem.text = text;
      infoViewList.push(
        <ResultInfoView
          key={`${i}`}
          resultInfo={infoItem}
          style={{ marginRight: 30 }}
        />
      );
    }
    return infoViewList;
  };

  render() {
    if (this.props.infoList && this.props.result) {
      return (
        <View style={[{ flexDirection: "row" }, this.props.style]}>
          {this.renderInfoList(this.props.infoList, this.props.result)}
        </View>
      );
    }
    return <View />;
  }
}
