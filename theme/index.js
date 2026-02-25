const fontFamilyList = {
  Light: 'Light',
  Regular: 'Regular',
};

const typography = {
  textStyles: {
    title: {
      fontFamily: fontFamilyList.Light,
      fontWeight: '400',
      fontSize: 26,
      lineHeight: 34,
      letterSpacing: 0.38,
    },
    text: {
      fontFamily: fontFamilyList.Regular,
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: -0.26,
    },
    body: {
      fontFamily: fontFamilyList.Regular,
      fontSize: 16,
      lineHeight: 22,
    },
  },
};

const palette = {
  primary: '#007AFF',
  secondary: '#FF7043',
  success: '#34C759',
  danger: '#FF3B30',
  gray100: '#F7F7F7',
  gray200: '#E5E5E5',
  gray700: '#3C3C3C',
  black: '#0B0B0B',
  white: '#FFFFFF',
};

const lightTheme = {
  name: 'light',
  colors: {
    background: palette.gray100,
    card: palette.white,
    text: palette.black,
    border: palette.gray200,
    primary: palette.primary,
    secondary: palette.secondary,
    danger: palette.danger,
    muted: palette.gray700,
  },
  typography,
};

const darkTheme = {
  name: 'dark',
  colors: {
    background: '#0E0E10',
    card: '#1C1C1E',
    text: '#F2F2F7',
    border: '#2C2C2E',
    primary: '#0A84FF',
    secondary: '#FF8F6B',
    danger: '#FF453A',
    muted: '#8E8E93',
  },
  typography,
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export { lightTheme, darkTheme, themes };
export default lightTheme;