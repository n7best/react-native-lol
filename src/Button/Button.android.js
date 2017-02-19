import React from 'react';
import { TouchableNativeFeedback, Text, StyleSheet, View } from 'react-native';
import Styles from '../styles';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import Shared from '../shared';

const { themeDefault, themeGold } = Styles
const { GradientBorderBox } = Shared

class Button extends React.Component {

  constructor(props){
    super(props)

    this._onPressHanlde = this._onPressHanlde.bind(this)
  }

  _onPressHanlde(e){
    console.log(e)
    if(this.props.onPress) this.props.onPress(e)
  }

  render() {
    const { children, primary, width, height, ...others } = this.props
    const theme = primary ? themeDefault : themeGold
    const containerStyle = { width, height }


    const innerStyle = {
      backgroundColor: theme.button_text_bg,
      width: width - 4,
      height: height - 4,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#000'
    }

    const textStyle = {
      fontFamily: 'merriweather',
      color: theme.text_color_primary,
      fontSize: 16
    }

    return (
      <ThemeProvider theme={theme}>
        <TouchableNativeFeedback onPress={this._onPressHanlde}>
          <View style={containerStyle}>
            <GradientBorderBox theme={theme}>
              <View style={innerStyle}>
               <Text style={textStyle}>{ children }</Text>
              </View>
            </GradientBorderBox>
          </View>
        </TouchableNativeFeedback>
      </ThemeProvider>
    );
  }
}

Button.defaultProps = {
  primary: false,
  width: 250,
  height: 40
}

export default Button;