import * as Localization from 'expo-localization';
import ukrainianLanguage from './languages/uk.json';
import englishLanguage from './languages/en.json';
import config from '../config.json';

const { defaultAppLanguage } = config;

export const translations = {
  'uk': ukrainianLanguage,
  'en': englishLanguage,
};

export const resolveInitialLocale = () => {
  const deviceLocale = Localization.getLocales()?.[0]?.languageCode;
  if (deviceLocale && translations[deviceLocale]) {
    return deviceLocale;
  }
  return defaultAppLanguage;
};

export default translations;
