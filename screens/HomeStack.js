import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import { translate } from "react-translate";

const Stack = createNativeStackNavigator();

const HomeStack = ({ t }) => {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: t('bookstoreTitle') }} />
      <Stack.Screen name="Details" component={DetailsScreen}/>
    </Stack.Navigator>
  );
}

const translated = translate('Navigation')(HomeStack);

export default translated;
