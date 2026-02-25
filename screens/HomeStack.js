import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import { translate } from "react-translate";
import WebViewScreen from './WebViewScreen';

const Stack = createNativeStackNavigator();

const HomeStack = ({ t }) => {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: t('bookstoreTitle') }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ animation: 'fade_from_bottom' }} />
      <Stack.Screen name="WebView" component={WebViewScreen} options={{ animation: 'fade' }} />
    </Stack.Navigator>
  );
}

const translated = translate('Navigation')(HomeStack);

export default translated;
