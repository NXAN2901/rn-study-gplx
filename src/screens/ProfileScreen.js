import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={SettingStyle.container}>
        <Text>ProfileScreen</Text>
        <Button 
          title='Profile Screen'
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

const SettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})