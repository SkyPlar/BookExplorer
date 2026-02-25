import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../theme/ThemeProvider';

const WebViewScreen = ({ route }) => {
  const { theme } = useTheme();
  const { url } = route.params || {};
  if (!url) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={{ marginTop: 20 }} />}
      />
    </SafeAreaView>
  );
};

export default WebViewScreen;
