import React from 'react';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Linking from 'expo-linking';
import HomeStack from './screens/HomeStack';
import CategoriesScreen from './screens/CategoriesScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import { TranslatorProvider } from 'react-translate';
import translations, { resolveInitialLocale } from './translation';
import store from './store';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setAppLocale, setThemeName } from './actions';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Main: {
        screens: {
          Home: {
            screens: {
              Home: 'home',
              Details: 'details/:id?',
            },
          },
          Categories: 'categories',
          Favorites: 'favorites',
          Settings: 'settings',
        },
      },
    },
  },
};

const HomeTabs = ({ labels, appTheme }) => (
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
      tabBarActiveTintColor: appTheme.colors.primary,
      tabBarInactiveTintColor: appTheme.colors.muted,
      tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
      tabBarStyle: {
        paddingVertical: 5, 
        height: 60, 
        marginBottom: 10,
        backgroundColor: appTheme.colors.card,
        borderTopColor: appTheme.colors.border,
      },
      headerStyle: { backgroundColor: appTheme.colors.card },
      headerTintColor: appTheme.colors.text,
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{ title: labels.Home || 'Home' }}
    />
    <Tab.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{ title: labels.Categories || 'Categories' }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{ title: labels.Favorites || 'Favorites' }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: labels.Settings || 'Settings' }}
    />
  </Tab.Navigator>
);

const AppContent = () => {
  const dispatch = useDispatch();
  const { theme: appTheme } = useTheme();
  const locale = useSelector((state) => state?.i18n?.locale || 'en');
  const activeLocale = translations[locale] ? locale : 'en';
  const activeTranslations = translations[activeLocale] || translations.en;
  const tabLabels = activeTranslations?.TabLabels || {};

  React.useEffect(() => {
    const restoreAppPreferences = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          dispatch(setThemeName(savedTheme));
        }

        const savedLocale = await AsyncStorage.getItem('locale');
        dispatch(setAppLocale(savedLocale || resolveInitialLocale()));
      } catch {
        dispatch(setAppLocale(resolveInitialLocale()));
      }
    };

    restoreAppPreferences();
  }, [dispatch]);

  const [loaded, error] = useFonts({
    Light: require('./assets/fonts/Roboto-Light.ttf'),
    Regular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <TranslatorProvider translations={activeTranslations}>
      <NavigationContainer linking={linking}>
        <Portal.Host>
          <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Main" options={{ title: tabLabels.Home || 'Home' }}>
              {() => <HomeTabs labels={tabLabels} appTheme={appTheme} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </Portal.Host>
      </NavigationContainer>
    </TranslatorProvider>
  );
};

const AppThemedContent = () => {
  const { theme } = useTheme();
  const paperBaseTheme = theme.name === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const paperTheme = {
    ...paperBaseTheme,
    colors: {
      ...paperBaseTheme.colors,
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      error: theme.colors.danger || paperBaseTheme.colors.error,
      background: theme.colors.background,
      surface: theme.colors.card,
      onSurface: theme.colors.text,
      outline: theme.colors.border,
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <AppContent />
    </PaperProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <AppThemedContent />
    </ThemeProvider>
  </Provider>
);

export default App;
