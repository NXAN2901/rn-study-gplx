import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(NavigationActions.navigate({ routeName, params }));
}

function setParam(param) {
  _navigator.setParam({ param });
}

function replace(routeName) {
  _navigator.dispatch(
    StackActions.replace({
      actions: { type: "Navigation/NAVIGATE", routeName },
      routeName: routeName
    })
  );
}

function reset(routeName) {
  const resetAction = StackActions.reset({
    type: "Navigation/RESET",
    index: 0,
    actions: [{ type: "Navigate", routeName }]
  });
  _navigator.dispatch(resetAction);
}

function goHome() {
  _navigator.dispatch(StackActions.popToTop())
}

function back() {
  _navigator.dispatch(StackActions.pop())
}

export default {
  setTopLevelNavigator,
  navigate,
  setParam,
  reset,
  replace,
  back,
  goHome
};
