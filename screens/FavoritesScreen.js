import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, useWindowDimensions, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from './HomeScreen/components/CustomText';
import { translate } from "react-translate";
import { useTheme } from '../theme/ThemeProvider';

const FavoritesScreen = ({ navigation, t }) => {
  const translate = t || ((key) => key);
  const favorites = useSelector(state => state.favorites.favorites) || [];
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const navigateToDetails = (book) => {
    navigation.navigate('Home', {
      screen: 'Details',
      params: {
        ...book,
        id: book.id,
        description: book.description,
      }
    });
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={[styles.container, { backgroundColor: theme.colors.background, paddingHorizontal: Math.max(12, width * 0.03) }]}>
          <Text style={[styles.header, { color: theme.colors.text }]}>{translate('favoriteTitle')}</Text>
          <Text style={[styles.noFavoritesText, { color: theme.colors.muted }]}>{translate('noFavoriteBooks')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.container, { backgroundColor: theme.colors.background, paddingHorizontal: Math.max(12, width * 0.03) }]}>
        <Text style={[styles.header, { color: theme.colors.text }]}>{translate('favoriteTitle')}</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() => navigateToDetails(item)}
            >
              <Image
                source={item.imageLinks?.thumbnail ? { uri: item.imageLinks.thumbnail } : require('../assets/images/book.png')}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.bookInfo}>
                <CustomText type="title" text={item.title} style={{ color: theme.colors.text }}>{item.title}</CustomText>
                <CustomText type="author" text={item.authors?.join(', ')} style={{ color: theme.colors.muted }}>{item.authors?.join(', ')}</CustomText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  bookInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 20,
  },
  noFavoritesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

const translated = translate('FavoritesScreen')(FavoritesScreen);

export default translated;
