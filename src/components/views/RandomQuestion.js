import React, { Component } from "react";
import {
  Text,
  View,
  Content,
  ListItem,
  Container,
  Body,
  CheckBox
} from "native-base";
import { Image, Dimensions } from "react-native";
import { Question } from "../../services/QuestionProvider";
import { getStore } from "../../modules/redux/index";
import {
  addSelectedAnswered,
  removeSelectedAnswered
} from "../../modules/redux/actions/QuestionActions";
import { Logger } from "../../modules/logger";
import { ThreadType } from "../../utils/Constants";
import { isDisableChoiceAnsweredThreadType } from "../../utils/ScreenUtils";

type RandomQuestionProps = {
  question: Question,
  questionIndex: number
};

export default class RandomQuestion extends Component<RandomQuestionProps> {
  static defaultProps = {
    questionIndex: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedAnswered: []
    };
  }

  renderOption = ({ option, answerChecked, threadResult, threadType }) => {
    let { selectedAnswered, answer } = this.props.question;
    let isSelected = false;
    let disableCheck = false;
    let checked = answerChecked;
    if (
      threadResult ||
      isDisableChoiceAnsweredThreadType(threadType) ||
      !selectedAnswered
    ) {
      disableCheck = true;
      checked = true
    }
    isSelected = selectedAnswered ? selectedAnswered.includes(option) : false;
    let textColor = "black";
    if (checked) {
      if (option == answer) {
        if (!selectedAnswered) {
          isSelected = true;
        }
        textColor = "blue";
      } else if (isSelected) {
        textColor = "red";
      }
    }

    return (
      <ListItem
        key={option}
        disabled={disableCheck}
        onPress={() => {
          const store = getStore();
          if (isSelected) {
            store.dispatch(removeSelectedAnswered(this.props.question, option));
          } else {
            store.dispatch(addSelectedAnswered(this.props.question, option));
          }
        }}
      >
        <CheckBox
          disabled={disableCheck}
          checked={isSelected}
          color="green"
          onPress={() => {
            const store = getStore();
            if (isSelected) {
              store.dispatch(
                removeSelectedAnswered(this.props.question, option)
              );
            } else {
              store.dispatch(addSelectedAnswered(this.props.question, option));
            }
          }}
        />
        <Body>
          <Text style={{ color: textColor }}>{option}</Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    if (this.props.question) {
      const currentThread = getStore().getState().question.questions
        .currentThread;
      const threadResult = currentThread.result;
      const threadType = currentThread.type;
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;
      const {
        name,
        question,
        options,
        index,
        image,
        answerChecked
      } = this.props.question;
      return (
        <View
          style={{ flex: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}
        >
          <Text
            style={{ fontWeight: "bold", color: "black", fontSize: 20 }}
          >{`Câu hỏi ${index}`}</Text>
          <ListItem key={name} style={{ flexDirection: "column" }}>
            <Text style={{ fontWeight: "500", color: "#5A98CB", fontSize: 16 }}>
              {question}
            </Text>
            {image && (
              <Image
                source={image}
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 10,
                  width: (width * 3) / 4,
                  height: width / 2
                }}
                resizeMethod={"auto"}
              />
            )}
          </ListItem>
          {options.map(option => {
            return this.renderOption({
              option,
              answerChecked,
              threadResult,
              threadType
            });
          })}
        </View>
      );
    }
    return <View />;
  }
}
