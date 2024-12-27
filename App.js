import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();
// OVERALL
// NOTE: add eslint, prettier
// NOTE: create new project name instead of "mobile" or "mobileTest"
// NOTE: need more logic for
// - tab screens, stack screens;
// - fonts, splash screen;
// - add translations, multi-language support, redux.

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Книжковий Магазин' }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}