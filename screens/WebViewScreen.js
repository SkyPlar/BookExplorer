import React from 'react';
import { SafeAreaView, ActivityIndicator, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../theme/ThemeProvider';
import { translate } from 'react-translate';

const WebViewScreen = ({ route, navigation, t }) => {
  const { theme } = useTheme();
  const { url } = route.params || {};

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('Home');
  };

  const handleClose = () => {
    navigation.popToTop();
  };

  if (!url) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.topBar, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity style={styles.actionButton} onPress={handleBack}>
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>{t('back')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleClose}>
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>{t('close')}</Text>
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={{ marginTop: 20 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default translate('WebViewScreen')(WebViewScreen);
