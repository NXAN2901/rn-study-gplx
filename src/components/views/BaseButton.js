import React, { Component } from "react";
import { Button } from "react-native-elements";
import PropTypes from "prop-types";
import { getStore } from "../../modules/redux/index";
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter
} from "../../modules/redux/actions/TodoAction";
import { VisibilityFilters } from "../../modules/redux/actions/ActionsTypes";

export type BaseButtonProps = {
  title: string,
  action: () => {},
  textColor: string,
  type: "solid" | "outline" | "clear"
};

// export const BaseButtonProps = PropTypes.shape({
//   title: PropTypes.string,
//   action: PropTypes.func,
//   textColor: PropTypes.string,
//   type: PropTypes.oneOf(['solid'|'outline'|'clear'])
// });

// Component.propTypes = {
//   title: PropTypes.string,
//   action: PropTypes.func,
//   textColor: PropTypes.string,
//   type: PropTypes.oneOf(['solid'|'outline'|'clear'])
// }

export default class BaseButton extends Component<BaseButtonProps> {
  static defaultProps: BaseButtonProps = {
    title: "",
    action: () => {},
    textColor: "#fff",
    type: "clear"
  };

  render() {
    return (
      <Button
        style={this.props.style}
        title={this.props.title}
        onPress={this.props.action}
        type={this.props.type}
      />
    );
  }
}
