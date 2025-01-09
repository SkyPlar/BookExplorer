import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Platform.OS === 'ios' ? '#333' : '#000',
  },
  author: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
  }
});

const CustomText = ({ children, style, type }) => {
  const textStyle = [
    type === 'title' ? styles.title : styles.author,
    style
  ];

  return <Text style={textStyle}>{children}</Text>;
};

export default CustomText;
