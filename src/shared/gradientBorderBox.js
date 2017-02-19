import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Chroma from 'chroma-js';

const TOP_COLORS = ['#EF2A2A', '#EF6A2A']
const BOTTOM_COLORS = ['#EF6A2A', '#EFD82A']
const GRADIENT_COLOR_LENGTH = 25
const INTERVAL = 50

class GradientBorderBox extends React.Component {
 constructor(props){
    super(props)
    const { border_active_start, border_active_end } = this.props.theme
    this.TOP_COLORS_SPECTRUM = Chroma.scale([border_active_start, border_active_end, border_active_start]).colors(GRADIENT_COLOR_LENGTH)
    this.BOTTOM_COLORS_SPECTRUM = Chroma.scale([border_active_end, border_active_start, border_active_end]).colors(GRADIENT_COLOR_LENGTH)
    console.log(this.TOP_COLORS_SPECTRUM,this.BOTTOM_COLORS_SPECTRUM )
    this.state = {
      topIndex: 0,
      bottomIndex: 0,
      colorTop: this.TOP_COLORS_SPECTRUM[0],
      colorBottom: this.BOTTOM_COLORS_SPECTRUM[0],
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      let { topIndex, bottomIndex } = this.state

      topIndex++
      if (topIndex === this.TOP_COLORS_SPECTRUM.length) {
        topIndex = 0
      }

      bottomIndex++
      if (bottomIndex === this.BOTTOM_COLORS_SPECTRUM.length) {
        bottomIndex = 0
      }

      this.setState({
        topIndex: topIndex,
        bottomIndex: bottomIndex,
        colorTop: this.TOP_COLORS_SPECTRUM[topIndex],
        colorBottom: this.BOTTOM_COLORS_SPECTRUM[bottomIndex]
      })
    }, INTERVAL)
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { children, primary,  theme, style, ...others } = this.props
    //colors={}[theme.border_active_start, theme.border_active_end]
    return (
      <LinearGradient 
        colors={[this.state.colorTop, this.state.colorBottom]} 
        style={style}
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}>
        { children }
      </LinearGradient>
    );
  }
}

GradientBorderBox.defaultProps = {
  theme: {
    border_active_start: '#4c669f',
    border_active_end: '#3b5998'
  }
}

export default GradientBorderBox;

/*
font-size: 14px;
  background-image: linear-gradient(to bottom, ${props => props.theme.border_active_start} 0%, ${props => props.theme.border_active_end} 100%);
  text-align: center;
  vertical-align: middle;
  padding: 3px;
  color: ${props => props.theme.text_color_primary};
  display: inline-block;
  position: relative;
  z-index: 1;
*/