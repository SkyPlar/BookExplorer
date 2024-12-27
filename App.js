import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();
// NOTE: add eslint, prettier

// NOTE: need more logic for
// - tab screens, stack screens;
// - fonts, splash screen;
// - add translations, multi-language support, redux.

// NOTE: create new project name instead of "mobile" or "mobileTest"
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