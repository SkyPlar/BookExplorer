import * as Localization from 'expo-localization';
import ukrainianLanguage from './languages/uk.json';
import englishLanguage from './languages/en.json';
import config from '../config.json';

const { defaultAppLanguage } = config;

const translations = {
  'uk': ukrainianLanguage,
  'en': englishLanguage,
};

console.log('Current device languageCode is: ', Localization.getLocales()[0].languageCode);

// So this is copied code from one of our company's projects :) the main thing is that it works 
// this is one of the features of expo which allows you to determine the device language for using translation in application
// I took the information from https://docs.expo.dev/versions/latest/sdk/localization/#localizationgetlocales

export default translations[Localization.getLocales()[0].languageCode] || translations[defaultAppLanguage];
