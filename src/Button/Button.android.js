import React from 'react';
import { TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import {BoxShadow} from 'react-native-shadow'
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import Chroma from 'chroma-js';
import Shared from '../shared';
import Styles from '../styles';

const { themeDefault, themeGold } = Styles
const { GradientBorderBox } = Shared
const FX_BUTTON_PRIMARY = 'fx_button_primary.mp3'

class Button extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      active: this.props.active
    }

    this.FXSound = new Sound(FX_BUTTON_PRIMARY, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } 
      // loaded successfully
      //console.log('duration in seconds: ' + this.FXSound.getDuration() + 'number of channels: ' + this.FXSound.getNumberOfChannels());
      this.FXSound.setVolume(0.5)
    });

    this._onPressHanlde = this._onPressHanlde.bind(this)
    this._onPressInHandle = this._onPressInHandle.bind(this)
    this._onPressOutHandle = this._onPressOutHandle.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.active && this.props.active) {
      this.setState({
        active: false
      })
    }

    if(!this.props.active && nextProps.active) {
      this.setState({
        active: true
      })
    }
  }

  _onPressInHandle(e){
    console.log('in')
    this.setState({active: true})
    if(this.props.sound) this.FXSound.play()
  }

  _onPressOutHandle(e){
    console.log('out')
    if(!this.props.active) this.setState({active: false})
  }

  _onPressHanlde(e){
    console.log(e)
    if(this.props.onPress) this.props.onPress(e)
  }

  render() {
    const { children, primary, width, height, animate, ...others } = this.props
    const theme = primary ? themeDefault : themeGold
    const containerStyle = { width, height }
    const shadowOpt = {
        width,
        height,
        color: theme.shadow,
        border: 10,
        radius:5,
        opacity: this.state.active ? 0.3 : 0,
        x:0,
        y:0,
    }

    const innerStyle = {
      width: width - ( this.state.active ? 5 : 4 ),
      height: height - ( this.state.active ? 5 : 4 ),
      margin: 2,
      
    }

    const innerBgStyle = {
      width: width - ( this.state.active ? 5 : 4 ),
      height: height - ( this.state.active ? 5 : 4 ),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000'
    }

    const textStyle = {
      fontFamily: 'merriweather',
      color: this.state.active ? theme.text_active_color : theme.text_color_primary,
      fontSize: 16
    }

    const gradientStyle = {
      justifyContent: 'center',
      alignItems: 'center',
    }

    return (
      <ThemeProvider theme={theme}>
        <BoxShadow setting={shadowOpt}>
          <TouchableWithoutFeedback onPress={this._onPressHanlde} onPressIn={this._onPressInHandle} onPressOut={this._onPressOutHandle} >
            <View style={containerStyle}>
              <GradientBorderBox theme={theme} animate={animate} active={this.state.active} style={gradientStyle}>
                <View style={innerStyle}>
                  <LinearGradient 
                    colors={this.state.active ? [
                        theme.button_text_bg, 
                        theme.bg_bottom_gradient
                      ] : [
                        theme.button_text_bg, 
                        theme.button_text_bg
                      ]
                    }
                    style={innerBgStyle}
                    locations={this.state.active ? [0.5, 1.0] : [0, 1]} 
                  >
                    <Text style={textStyle}>{ children }</Text>
                  </LinearGradient>
                </View>
              </GradientBorderBox>
            </View>
          </TouchableWithoutFeedback>
        </BoxShadow>
      </ThemeProvider>
    );
  }
}

Button.defaultProps = {
  sound: true,
  active: false,
  primary: false,
  width: 250,
  height: 40
}

export default Button;