import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import Book from '../../assets/images/book.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 20,
  },
  textSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Platform.OS === 'ios' ? '#333' : '#000',
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
  },
  description: {
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    ...Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    } : {
      elevation: 4,
    },
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});

const DetailsScreen = ({ route, navigation }) => {
  const book = route.params;

  React.useEffect(() => {
    console.log(`Відкрита книга ${book.id}`);
  }, [book]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Image source={Book} style={styles.image} />
        <View style={styles.textSection}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.description}>{book.description}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Назад до головної</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailsScreen;
