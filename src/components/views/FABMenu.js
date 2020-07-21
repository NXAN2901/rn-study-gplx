import React, { Component } from "react";
import { FAB, Portal, Provider } from "react-native-paper";

type FABMenuProps = {
  type: "small" | "large"
};

export default class FABMenu extends Component<FABMenuProps> {
  state = {
    open: false
  };

  render() {
    return (
      <Provider>
        <Portal>
          {this.props.children}
          <FAB.Group
            open={this.state.open}
            icon={this.state.open ? "today" : "add"}
            actions={[
              { icon: "add", onPress: () => 
              // console.log("Pressed add") 
              },
              {
                icon: "star",
                label: "Star",
                // onPress: () => console.log("Pressed star")
              },
              {
                icon: "email",
                label: "Email",
                // onPress: () => console.log("Pressed email")
              },
              {
                icon: "access-alarm",
                label: "Remind",
                // onPress: () => console.log("Pressed notifications")
              }
            ]}
            onStateChange={({ open }) => this.setState({ open })}
            onPress={() => {
              if (this.state.open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    );
  }
}
