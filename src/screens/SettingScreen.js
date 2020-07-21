import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class SettingScreen extends Component {
  render() {
    return (
      <View style={SettingStyle.container}>
        <Text>SettingScreen</Text>
        <Button 
          title='Setting Screen'
          onPress={() => this.props.navigation.navigate('Profile')}
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