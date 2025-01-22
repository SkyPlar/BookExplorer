import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Platform.OS === 'ios' ? '#333' : '#000',
  },
  author: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    color: '#666',
  },
  description: {
    fontSize: 12,
    color: '#888',
  }
});

const CustomText = ({ text, style, type = 'default' }) => {
  const textStyle = [styles[type] || styles.default, style];

  return <Text style={textStyle}>{text}</Text>;
};

export default CustomText;
