import React from 'react';
import { View, Text, StyleSheet, Switch, useWindowDimensions, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { SafeAreaView } from 'react-native';
import { registerForPushNotificationsAsync } from '../services/permissions';
import { translate } from 'react-translate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setAppLocale } from '../actions';
import { Button, Snackbar } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SettingsScreen = ({ t }) => {
  const { theme, themeName, toggleTheme } = useTheme();
  const { width } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const locale = useSelector((state) => state?.i18n?.locale || 'en');
  const [pushStatus, setPushStatus] = React.useState(null);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const handlePush = async () => {
    const res = await registerForPushNotificationsAsync();
    setPushStatus(res);
    setSnackbarVisible(true);
  };

  const handleLanguageChange = async (nextLocale) => {
    dispatch(setAppLocale(nextLocale));
    await AsyncStorage.setItem('locale', nextLocale);
  };

  const handleThemeToggle = async () => {
    const nextTheme = themeName === 'dark' ? 'light' : 'dark';
    toggleTheme();
    await AsyncStorage.setItem('theme', nextTheme);
  };

  const resolvedPushStatusText = React.useMemo(() => {
    if (!pushStatus) {
      return null;
    }
    if (pushStatus.ok) {
      return `${t('pushToken')}: ${pushStatus.token}`;
    }
    const rawError = pushStatus.error || '';
    if (rawError.toLowerCase().includes('physical device')) {
      return t('pushPhysicalDeviceRequired');
    }
    if (rawError.toLowerCase().includes('permission denied')) {
      return t('permissionDenied');
    }
    return rawError || t('pushFailed');
  }, [pushStatus, t]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingHorizontal: Math.max(16, width * 0.05),
            paddingBottom: tabBarHeight + insets.bottom + 20,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.text }]}>{t('darkMode')}</Text>
            <Switch value={themeName === 'dark'} onValueChange={handleThemeToggle} />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.label, { color: theme.colors.text }]}>{t('language')}</Text>
          <View style={styles.languageButtons}>
            <Button mode={locale === 'en' ? 'contained' : 'outlined'} compact onPress={() => handleLanguageChange('en')}>EN</Button>
            <Button mode={locale === 'uk' ? 'contained' : 'outlined'} compact onPress={() => handleLanguageChange('uk')}>UK</Button>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.text }]}>{t('pushNotifications')}</Text>
            <Button mode="contained" onPress={handlePush}>{t('enable')}</Button>
          </View>
          {resolvedPushStatusText ? (
            <Text style={[styles.status, { color: pushStatus?.ok ? theme.colors.muted : theme.colors.danger || theme.colors.secondary }]}>
              {resolvedPushStatusText}
            </Text>
          ) : null}
        </View>

        <Snackbar
          visible={snackbarVisible}
          duration={2500}
          onDismiss={() => setSnackbarVisible(false)}
          style={{ backgroundColor: theme.colors.card }}
        >
          {pushStatus?.ok ? t('pushEnabled') : t('pushFailed')}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    gap: 12,
  },
  section: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    fontSize: 18,
    flexShrink: 1,
  },
  status: {
    fontSize: 15,
    lineHeight: 20,
  }
});

export default translate('SettingsScreen')(SettingsScreen);