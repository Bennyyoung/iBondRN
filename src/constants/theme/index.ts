import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';

import { RFValue } from 'react-native-responsive-fontsize';
import { PaddingSizesObjectType } from '../types';

export const palette = {
  agricultureGreen: 'rgba(70, 158, 142, 1)',
  bankReceivedGreen: '#03B146',
  black: '#101818',
  blackTint: '#696977',
  blockBg: '#C1C7CF',
  blue: '#3878B8',
  cardSecondary: '#EFEFEF',
  darkPurple: '#7B46CC',
  error: '#E25825',
  grey: '#C1C7CF',
  lightGrey: 'rgba(245, 245, 245, 1)',
  negativeColor: '#E70011',
  primary: '#6500E0',
  primaryGreen: '#2EAF7D',
  primaryGrey: '#FCFCFF',
  primaryPurple: '#7B46CD',
  primarySky: '#001D3D',
  purple: 'rgba(35, 0, 83, 1)',
  red: 'rgba(227, 30, 36, 1)',
  secondary: '#878681',
  secondaryGrey: '#A6A6AA',
  success: '#00A067',
  textColorTint: '#000000',
  transparent: 'transparent',
  warning: '#D1A000',
  white: '#FBFBFB',
  whiteColor: '#ffffff',
  textColor: '#101818',
  yellow: '#F2C948',
};

export type PaletteType = keyof typeof palette;

const theme = createTheme({
  borderRadii: {
    lg: RFValue(32),
    md: RFValue(16),
    none: 0,
    sl: RFValue(20),
    sm: RFValue(8),
    smd: RFValue(6),
    sml: RFValue(24),
    smm: RFValue(10),
    xl: RFValue(64),
    xs: RFValue(4),
    xxl: RFValue(100),
  },

  breakpoints: {
    bigscreen: 412,
    phone: 0,
    tablet: 768,
  },
  colors: {
    ...palette,
    blockBg: palette.grey,
  },
  buttonSizes: {
    lg: {
      paddingHorizontal: 'xl',
      paddingVertical: 'lg',
    },
    md: {
      paddingHorizontal: 'lg',
      paddingVertical: 'md',
    },
    none: {
      paddingHorizontal: 'none',
      paddingVertical: 'none',
    },
    sm: {
      paddingHorizontal: 'md',
      paddingVertical: 'sm',
    },
    xl: {
      paddingHorizontal: 'xxl',
      paddingVertical: 'xl',
    },
    xs: {
      paddingHorizontal: 'sm',
      paddingVertical: 'xs',
    },
  } as PaddingSizesObjectType,

  buttonVariants: {
    defaults: {
      borderRadius: 'sm',
    },
    filled: {
      backgroundColor: 'primary',
    },
    ghost: {
      backgroundColor: 'paleGrey50',
    },
    none: {},
    outlined: {
      borderColor: 'paleGrey',
      borderWidth: 1,
    },
    transparent: {
      backgroundColor: 'transparent',
    },
  },
  iconSizes: {
    default: {},
    lg: {
      height: RFValue(32),
      width: RFValue(32),
    },
    'logo-iconsize': {
      height: RFValue(40),
      width: RFValue(40),
    },
    m: {
      height: RFValue(12),
      width: RFValue(12),
    },
    md: {
      height: RFValue(24),
      width: RFValue(24),
    },
    mm: {
      height: RFValue(16),
      width: RFValue(17),
    },
    pspxl: {
      height: RFValue(80),
      width: RFValue(80),
    },
    pspxll: {
      height: RFValue(90),
      width: RFValue(100),
    },
    s: {
      height: RFValue(4),
      width: RFValue(4),
    },
    sm: {
      height: RFValue(16),
      width: RFValue(16),
    },
    sml: {
      height: RFValue(20),
      width: RFValue(20),
    },
    xl: {
      height: RFValue(48),
      width: RFValue(48),
    },
    xll: {
      height: RFValue(32),
      width: RFValue(99),
    },

    xlll: {
      height: RFValue(38),
      width: RFValue(140),
    },
    xs: {
      height: RFValue(8),
      width: RFValue(8),
    },
    xsl: {
      height: RFValue(108),
      width: RFValue(120),
    },
    xxl: {
      height: RFValue(60),
      width: RFValue(60),
    },
    xxxl: {
      height: RFValue(138),
      width: RFValue(180),
    },
    xxxxl: {
      height: RFValue(183),
      width: RFValue(157),
    },
  },
  spacing: {
    Ml: RFValue(60),
    lg: RFValue(24),
    md: RFValue(16),
    sl: RFValue(20),
    sm: RFValue(12),
    sml: RFValue(8),
    xl: RFValue(32),
    xs: RFValue(4),
    xxl: RFValue(40),
    xxs: RFValue(2),
  },
  textVariants: {
    bigSubHeading: {
      color: 'textColor',
      fontSize: RFValue(20),
      fontWeight: '600',
    },
    body: {
      color: 'textColorTint',
      fontSize: RFValue(14),
      fontWeight: '400',
      lineHeight: RFValue(20),
    },
    bold10: {
      color: 'darkGrey',
      fontSize: RFValue(10),
      fontWeight: '800',
      lineHeight: RFValue(16),
    },
    bold12: {
      color: 'darkGrey',
      fontSize: RFValue(12),
      fontWeight: '800',
      lineHeight: RFValue(16),
    },
    bold14: {
      fontSize: RFValue(14),
      fontWeight: '800',
    },
    bold16: {
      fontSize: RFValue(16),
      fontWeight: '800',
    },
    bold18: {
      color: 'textColor',
      fontSize: RFValue(18),
      fontWeight: '800',
    },
    bold20: {
      color: 'textColor',
      fontSize: RFValue(20),
      fontWeight: '800',
    },
    bold22: {
      fontSize: RFValue(22),
      fontWeight: '800',
    },
    bold24: {
      fontSize: RFValue(24),
      fontWeight: '800',
    },
    bold32: {
      fontSize: RFValue(32),
      fontWeight: '800',
    },
    bold48: {
      fontSize: RFValue(48),
      fontWeight: '800',
    },
    bold8: {
      color: 'darkGrey',
      fontSize: RFValue(8),
      fontWeight: '700',
      lineHeight: RFValue(16),
    },
    boldBody: {
      color: 'textColorTint',
      fontSize: RFValue(16),
      fontWeight: '600',
      lineHeight: RFValue(20),
    },
    button: {
      color: 'mainBackground',
      fontSize: RFValue(18),
      fontWeight: '600',
      lineHeight: RFValue(22),
    },
    defaults: {
      color: 'black',
      fontSize: RFValue(14),
    },
    header: {
      color: 'textColor',
      fontSize: RFValue(24),
      fontWeight: '600',
      lineHeight: RFValue(40),
    },
    medium: {
      color: 'mainBackground',
      fontSize: RFValue(16),
      fontWeight: '400',
      lineHeight: RFValue(20),
    },
    medium10: {
      fontSize: RFValue(10),
      fontWeight: '600',
    },
    medium12: {
      color: 'textColor',
      fontSize: RFValue(12),
      fontWeight: '600',
    },
    medium14: {
      fontSize: RFValue(14),
      fontWeight: '700',
    },
    medium16: {
      color: 'textColor',
      fontSize: RFValue(16),
      fontWeight: '700',
      lineHeight: RFValue(20),
    },
    medium18: {
      fontSize: RFValue(18),
      fontWeight: '700',
    },
    medium22: {
      fontSize: RFValue(22),
      fontWeight: '700',
    },
    medium8: {
      fontSize: RFValue(8),
      fontWeight: '600',
    },
    regular10: {
      fontSize: RFValue(10),
      fontWeight: '400',
      lineHeight: RFValue(16),
    },
    regular12: {
      fontSize: RFValue(12),
      fontWeight: '400',
      lineHeight: RFValue(16),
    },
    regular14: {
      color: 'textColor',
      fontSize: RFValue(14),
      fontWeight: '400',
      lineHeight: RFValue(16),
    },
    regular16: {
      color: 'textColor',
      fontSize: RFValue(16),
      fontWeight: '400',
      lineHeight: RFValue(20),
    },
    regular18: {
      color: 'textColor',
      fontSize: RFValue(18),
      fontWeight: '400',
      lineHeight: RFValue(18),
    },
    regular22: {
      color: 'textColor',
      fontSize: RFValue(22),
      fontWeight: '400',
      lineHeight: RFValue(22),
    },
    regular24: {
      color: 'textColor',
      fontSize: RFValue(24),
      fontWeight: '400',
      lineHeight: RFValue(28),
    },
    regular8: {
      fontSize: RFValue(8),
      fontWeight: '400',
    },
    regular9: {
      fontSize: RFValue(9),
      fontWeight: '400',
      lineHeight: RFValue(16),
    },
    subHeading: {
      color: 'textColor',
      fontSize: RFValue(18),
      fontWeight: '600',
      lineHeight: RFValue(21),
    },
  },
  zIndices: {
    modal: 100,
    overlay: 10,
  },
});

export type Theme = typeof theme;

export const useTheme = () => useRestyleTheme<Theme>();

export default theme;
