import colors from './colors'
import defaultTheme from './default.theme'
import Shared from '../shared'
import Chroma from 'chroma-js';

const goldTheme = Object.assign({}, defaultTheme, {
    border_active_start: colors.gold1,
    border_active_end: colors.gold2,
    border_start: colors.gold3,
    border_end: colors.gold4,

    text_color_primary: colors.lightGold,
    button_text_bg: '#1E2328',
    text_active_color: '#F0E6D2',
   // box_inner_shadow: '0 0 .75px .75px #010a13, inset 0 0 .75px .75px #010a13',
    bg_bottom_gradient: '#2E3338',

    animationIteration: 1,
    animationTime: 1,
    shadow: '#EFB760'
})

export default goldTheme;