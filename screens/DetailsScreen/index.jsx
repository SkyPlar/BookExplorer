import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import themeSettings from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { translate } from "react-translate";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    padding: 20,
				marginBottom: 20,
    alignItems: 'flex-start',
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  textSection: {
    flex: 1,
  },
  title: {
    ...themeSettings.typography.textStyles.title,
    marginBottom: 10,
  },
  author: {
    ...themeSettings.typography.textStyles.title,
    marginBottom: 10,
  },
  description: {
    ...themeSettings.typography.textStyles.text,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
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
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    zIndex: 1,
  },
  favoriteIcon: {
    fontSize: 24,
    color: 'red',
  },
});

const DetailsScreen = ({ route, navigation, t }) => {
  const book = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.some(fav => fav.id === book.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(book.id));
    } else {
      dispatch(addFavorite(book));
    }
  };

  React.useEffect(() => {
    if (!book || !book.id) {
      console.error("Book details are missing.");
      navigation.goBack();
    } else {
      console.log(`Opened book ${book.id}`);
    }
  }, [book, navigation]);

  if (!book) {
    return (
					<View style={styles.container}>
							<Text style={styles.errorText}>{t('noBookDetails')}</Text>
							<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
									<Text style={styles.backButtonText}>{t('backToSearch')}</Text>
							</TouchableOpacity>
					</View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.textContainer}>
          <Image 
            source={book?.imageLinks?.thumbnail ? { uri: book.imageLinks.thumbnail } : require('../../assets/images/book.png')} 
            style={styles.image} 
          />
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <MaterialCommunityIcons name={isFavorite ? 'heart' : 'heart-outline'} style={styles.favoriteIcon} />
          </TouchableOpacity>
          <View style={styles.textSection}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.authors?.join(', ')}</Text>
            <Text style={styles.description}>{book.description || t('noDescriptionAvailable')}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{t('backToSearch')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const translated = translate('DetailsScreen')(DetailsScreen);

export default translated;
