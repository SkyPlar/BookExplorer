import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Book from '../../assets/images/book.png';
import CustomText from './components/CustomText';
import { translate } from "react-translate";
import 'dotenv/config';

const keyToken = process.env.REACT_APP_API_KEY;

const HomeScreen = ({ navigation, t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true);
      const fetchBooks = async () => {
        const encodedQuery = encodeURIComponent(searchQuery);
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${keyToken}`;
        try {
          const response = await axios.get(url);
          setBooks(response.data.items || []);
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [searchQuery]);

  const navigateToDetails = useCallback((book) => {
    navigation.navigate('Details', { ...book.volumeInfo, id: book.id, description: book.volumeInfo.description });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t('searchPlaceholder')}
        value={searchQuery}
        onChangeText={setSearchQuery}
        clearButtonMode="while-editing"
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {!isLoading && books.length === 0 && searchQuery.length > 2 && (
        <Text style={styles.noBooksText}>{t('noBooksFound')}</Text>
      )}
      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigateToDetails(item)}
          >
            <Image
              source={item.volumeInfo.imageLinks?.thumbnail ? { uri: item.volumeInfo.imageLinks.thumbnail } : Book}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.bookInfo}>
              <CustomText type="title" text={item.volumeInfo.title}>{item.volumeInfo.title}</CustomText>
              <CustomText type="author" text={item.volumeInfo.authors?.join(', ')}>{item.volumeInfo.authors?.join(', ')}</CustomText>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 15,
    marginLeft: 15,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    marginVertical: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  bookInfo: {
    width: '70%',
    flexDirection: 'column',
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 20,
  },
  noBooksText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

const screen = translate('HomeScreen')(HomeScreen);

export default screen;
