import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const CategoriesScreen = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.container, { backgroundColor: theme.colors.background, paddingHorizontal: Math.max(12, width * 0.03) }]}>
        <Text style={{ color: theme.colors.text }}>Categories</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoriesScreen;