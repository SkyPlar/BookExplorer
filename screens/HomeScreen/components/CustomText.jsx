import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

const CustomText = ({ text= '', style, type = 'default' }) => {
  const textStyle = [styles[type] || styles.default, style];

  return <Text style={textStyle}>{text}</Text>;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
  },
  description: {
    fontSize: 12,
  }
});

export default CustomText;
