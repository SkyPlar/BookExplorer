import React from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Image, Platform } from 'react-native';
import axios from 'axios';
import Book from '../../assets/images/book.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
      },
      android: {
        color: 'red',
      },
    }),
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        color: '#333',
      },
      android: {
        color: '#000',
      },
    }),
  },
  author: {
    fontSize: 14,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: 'bold',
      },
    }),
  },
});

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://192.168.2.57:3000/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToDetails = React.useCallback((book) => {
    navigation.navigate('Details', book);
  }, [navigation]);

  return (
    // NOTE: create and add custom NavigationBar with opportunity to use one single component for all screens
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Пошук книг..."
        value={searchQuery}
        onChangeText={text => { setSearchQuery(text); }}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigateToDetails(books.find(el => el.id === item.id))}
          >
            {/* NOTE: no inline styles, try to move them into StyleSheet */}
            <Image source={Book} style={{ width: 75, height: 75, marginRight: 20 }} />
            <View style={styles.bookInfo}>
              {/* NOTE: create custom flexible component for Text, Cards and other repeatable things  */}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
