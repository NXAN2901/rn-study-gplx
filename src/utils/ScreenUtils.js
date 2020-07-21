import { Dimensions } from "react-native";
import { ThreadType } from "./Constants";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = TabIcon;
  let iconName;
  if (routeName === NavigationTag.HOME) {
    iconName = `ios-information-circle${focused ? "" : "-outline"}`;
  } else if (routeName === NavigationTag.SETTINGS) {
    iconName = `ios-add-circle${focused ? "" : "-outline"}`;
  }
  return <TabIcon name={iconName} size={25} color={tintColor} />;
};

function isDisableChoiceAnsweredThreadType(threadType) {
  return threadType == ThreadType.REVIEW || threadType == ThreadType.ERRORS;
}

const getDimensions = () => {
  return Dimensions.get("window");
};

export { isDisableChoiceAnsweredThreadType, getDimensions };
