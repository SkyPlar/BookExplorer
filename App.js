import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './screens/HomeStack';
import CategoriesScreen from './screens/CategoriesScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import { TranslatorProvider, translate } from 'react-translate';
import translation from './translation';
import store from './store';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const App = ({ t }) => {
  const [loaded, error] = useFonts({
    Light: require('./assets/fonts/Roboto-Light.ttf'),
    Regular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  function getTabTitle(titleKey, t) {
    return () => ({
      title: t(titleKey),
    });
  }

  return (
    <Provider store={store}>
      <TranslatorProvider translations={translation}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                  case 'Home': iconName = 'home'; break;
                  case 'Categories': iconName = 'apps'; break;
                  case 'Favorites': iconName = focused ? 'favorite' : 'favorite-border'; break;
                  case 'Settings': iconName = 'settings'; break;
                  default: break;
                }
                return <MaterialIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
              tabBarStyle: { 
                paddingVertical: 5, 
                height: 60, 
                marginBottom: 10
              },
            })}
          >
            <Tab.Screen
              name="Home"
              component={HomeStack}
            />
            <Tab.Screen
              name="Categories"
              component={CategoriesScreen}
              options={() => getTabTitle('Categories', t)}
            />
            <Tab.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={() => getTabTitle('Favorites', t)}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={() => getTabTitle('Settings', t)}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </TranslatorProvider>
    </Provider>
  );
};

export default translate('TabLabels')(App);
