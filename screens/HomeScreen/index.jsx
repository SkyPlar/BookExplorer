import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { translate } from "react-translate";
import Book from '../../assets/images/book.png';
import CustomText from '../../components/CustomText';
// import 'dotenv/config';

const keyToken = 'AIzaSyATxrXOGuVHyB6WhfUpJ9C7uhAoxcI2RkI';

const HomeScreen = ({ navigation, t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shortQuery, setShortQuery] = useState(true);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true);
      setShortQuery(false);
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
      setShortQuery(true);
      setBooks([]);
    }
  }, [searchQuery]);

  const navigateToDetails = useCallback((book) => {
    navigation.navigate('Details', { ...book.volumeInfo, id: book.id, description: book.volumeInfo.description });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('screenTitle')} 🔎 📚</Text>
      <View style={styles.searchInputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {
          // add into translation
          shortQuery && <Text style={styles.searchInputSubText}>Type more than 2 letters</Text>
        }
      </View>
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
              <CustomText type="title" text={item.volumeInfo.title} />
              <CustomText type="author" text={item.volumeInfo.authors?.join(', ')} />
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
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 21,
    lineHeight: '28px',
    color: 'tomato',
    fontWeight: 600
  },
  searchInputWrapper: {
    marginTop: 25,
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#969696',
    marginBottom: 4
  },
  searchInputSubText: {
    fontSize: 11,
    color: 'blue',
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
