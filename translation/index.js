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

export default translations[Localization.getLocales()[0].languageCode] || translations[defaultAppLanguage];
