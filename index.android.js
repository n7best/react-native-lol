import React, { Component } from 'react';
import ReactLOL from './src';
import Shared from './src/shared';
import { ThemeProvider } from 'styled-components/native';
import Styles from './src/styles';
import { Image } from 'react-native';

const { themeDefault, themeGold, colors } = Styles
const { Button } = ReactLOL

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class reactNativeLOL extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/logo.png')} />
        <Text style={styles.welcome}>
          Welcome to React Native LOL!
        </Text>
        <View style={{ margin: 10 }} >
          <Button primary>
            GET START
          </Button>
        </View>
        <View style={{ margin: 10 }} >
          <Button>
            DOCUMENTATION
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg_main,
    borderTopColor: colors.border_gold_normal,
    borderTopWidth: 3
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#EDE3CF'
  }
});

AppRegistry.registerComponent('reactNativeLOL', () => reactNativeLOL);
