import React, { Component } from "react";
import { Image, FlatList, StyleSheet } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";
import { Question } from "../../services/QuestionProvider";
import { ListItem } from "native-base";
import { getStore } from "../../modules/redux/index";
import { setCurrentRandomQuestion } from "../../modules/redux/actions/QuestionActions";

type PopupMenuQuestionProps = {
  name: string,
  questionList: [Question],
  onSelect: () => {}
};

const { ContextMenu, SlideInMenu, Popover } = renderers;

const CustomPopover = <Popover />;

export default class PopupMenuQuestion extends Component<PopupMenuQuestionProps> {
  static defaultProps: PopupMenuQuestionProps = {
    onSelect: () => {}
  };

  renderMenuQuestion = ({ item, index }) => {
    return (
      <ListItem bottomDivider>
        <MenuOption
          style={{ height: 25, color: "black", width: 100 }}
          onSelect={() => {
            getStore().dispatch(setCurrentRandomQuestion(item.index - 1));
          }}
          text={`Câu ${item.index}`}
          customStyles={{ color: "black" }}
        />
      </ListItem>
    );
  };

  render() {
    return (
      <Menu
        renderer={Popover}
        rendererProps={{
          preferredPlacement: "bottom",
          anchorStyle: { backgroundColor: "gray" }
        }}
      >
        <MenuTrigger>
          {this.props.name && <Text>{this.props.name}</Text>}
          {this.props.children}
        </MenuTrigger>
        <MenuOptions
          customStyles={optionsStyles}
          // customStyles={{
          //   borderRadius: 6,
          //   borderWidth: 6,
          //   borderColor: "gray"
          // }}
          // style={{ borderRadius: 6, borderWidth: 6, borderColor: "gray" }}
        >
          <FlatList
            style={{ height: 200, width: 100 }}
            data={this.props.questionList}
            renderItem={this.renderMenuQuestion}
            keyExtractor={item => item.name}
            initialNumToRender={8}
          />
          {/* {this.props.questionList.map((question, index) => {
            return this.renderMenuQuestion(question);
          })} */}
        </MenuOptions>
      </Menu>
    );
  }
}

const MenuStyle = StyleSheet.create({
  textStyle: {
    color: "black"
  },
  optionStyle: {}
});

const optionsStyles = {
  optionsContainer: {
    padding: 5,
    borderColor: "gray",
    borderRadius: 6,
    tintColor: "gray",
    borderWidth: 6
  },
  optionsWrapper: {
    backgroundColor: "white"
  },
  // optionWrapper: {
  //   backgroundColor: "yellow",
  //   margin: 5
  // },
  optionTouchable: {
    underlayColor: "transparent"
    // activeOpacity: 70
  },
  optionText: {
    color: "black"
  }
};
