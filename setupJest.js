import '@testing-library/jest-native/extend-expect';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-translate', () => ({
  translate: () => (Comp) => {
    const React = require('react');
    const TranslatedComponent = (props) => React.createElement(Comp, { ...props, t: (key) => key });
    TranslatedComponent.displayName = `Translated(${Comp.displayName || Comp.name || 'Component'})`;
    return TranslatedComponent;
  },
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('expo-font', () => ({ useFonts: () => [true, false] }));
