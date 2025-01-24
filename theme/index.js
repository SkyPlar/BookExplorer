const fontFamilyList = {
  Light: "Light",
  Regular: "Regular"
};

const themeSettings = {
  typography: {
    textStyles: {
      title: {
        fontFamily: fontFamilyList.Light,
        fontWeight: 400,
        fontSize: 26,
        lineHeight: 34,
        letterSpacing: 0.38,
      },
      text: {
        fontFamily: fontFamilyList.Regular,
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: -0.26,
      }
    },
  },
};
export default themeSettings;