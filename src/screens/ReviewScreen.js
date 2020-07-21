import React, { Component } from "react";
import { View, List } from "native-base";
import RandomQuestion from "../components/views/RandomQuestion";
import { ListItem } from "react-native-elements";
import { Container, Content } from "native-base";
import { Image, FlatList } from "react-native";
import ScalableButton from "../components/views/ScalableButton";
import LinearGradient from "react-native-linear-gradient";
import TouchableScale from "react-native-touchable-scale";
import NavigationService from "../services/NavigationService";
import { NavigationTag } from "../utils/Constants";
import { getStore } from "../modules/redux/index";
import { provideReviewItemViews } from "../utils/ScreenProvider";
import { QuestionParam } from "../utils/Constants";
import { setCurrentThread } from "../modules/redux/actions/QuestionActions";

type ReviewScreenProps = {};

export default class ReviewScreen extends Component<ReviewScreenProps> {
  constructor(props) {
    super(props);
    this.reviewItems = provideReviewItemViews();
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: "Ôn Tập",
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
      )
    };
  };

  renderReviewItem = ({ item, index }) => {
    return (
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        // ViewComponent={LinearGradient}
        // linearGradientProps={{
        //   colors: ["rgba(214,116,112,1)", "rgba(233,174,87,1)"],
        //   start: { x: 0, y: 0.5 },
        //   end: { x: 1, y: 0.5 }
        // }}
        key="1"
        title={item.name}
        subtitle={item.description}
        bottomDivider
        chevron
        onPress={() => {
          const store = getStore();
          const currentThread = store.getState().question.questions.threads[
            QuestionParam.THREAD_REVIEW_BEGIN_INDEX + index
          ];
          store.dispatch(setCurrentThread(currentThread));
          NavigationService.navigate(NavigationTag.RANDOM_QUESTION, {
            reviewState: true,
            title: item.name,
            backState: true
          });
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "gray" }}>
        <FlatList
          scrollEnabled={false}
          renderItem={this.renderReviewItem}
          keyExtractor={item => item.name}
          data={this.reviewItems}
        />
      </View>
    );
  }
}
