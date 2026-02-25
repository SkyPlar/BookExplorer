import React from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  useWindowDimensions,
  SafeAreaView
} from 'react-native';
import themeSettings from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { translate } from 'react-translate';
import { useTheme } from '../../theme/ThemeProvider';
import { requestMediaLibraryPermission } from '../../services/permissions';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Button } from 'react-native-paper';

const DetailsScreen = ({ route, navigation, t }) => {
  const book = route.params;
  const { width } = useWindowDimensions();
  const {
    id,
    title = t('unknownTitle'),
    authors = [],
    description = t('noDescriptionAvailable'),
    imageLinks = {}
  } = book || {};
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === id);
  const { theme } = useTheme();
  const [saving, setSaving] = React.useState(false);
  const previewUrl = book?.previewLink || book?.infoLink;
  const heroOpacity = React.useRef(new Animated.Value(0)).current;
  const heroTranslate = React.useRef(new Animated.Value(16)).current;

  const openPreview = () => {
    if (previewUrl) {
      navigation.navigate('WebView', { url: previewUrl });
    }
  };

  const saveCover = async () => {
    if (!book?.imageLinks?.thumbnail) return;
    setSaving(true);
    try {
      const granted = await requestMediaLibraryPermission();
      if (!granted) {
        console.error('Media permission denied');
        return;
      }
      const fileUri = FileSystem.cacheDirectory + `${id || 'cover'}.jpg`;
      const download = await FileSystem.downloadAsync(book.imageLinks.thumbnail, fileUri);
      await MediaLibrary.saveToLibraryAsync(download.uri);
    } catch (err) {
      console.error('Save cover error:', err);
    } finally {
      setSaving(false);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(book));
    }
  };

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(heroTranslate, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    if (!book || !id) {
      console.error('Book details are missing.');
      navigation.goBack();
    } else {
      console.log(`Opened book ${id}`);
    }
  }, [book, heroOpacity, heroTranslate, id, navigation]);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('noBookDetails')}</Text>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: theme.colors.card }]}>{t('backToSearch')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ScrollView style={styles.scrollContainer}>
          <Animated.View
            style={{
              opacity: heroOpacity,
              transform: [{ translateY: heroTranslate }],
            }}
          >
            <View style={{ flexDirection: 'row', padding: Math.max(16, width * 0.04) }}>
              <Image
                source={
                  book?.imageLinks?.thumbnail
                    ? { uri: imageLinks.thumbnail }
                    : require('../../assets/images/book.png')
                }
                style={styles.image}
              />
              <View style={{ flex: 1, paddingLeft: 20 }}>
                <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
                <Text style={[styles.author, { color: theme.colors.muted }]}>{authors.join(', ')}</Text>
              </View>
              <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                <MaterialCommunityIcons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  style={styles.favoriteIcon}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              opacity: heroOpacity,
              transform: [{ translateY: heroTranslate }],
              paddingHorizontal: Math.max(16, width * 0.04),
              gap: 12,
            }}
          >
            <Text style={[styles.description, { color: theme.colors.text }]}>{description}</Text>
            {previewUrl ? (
              <Button mode="contained" onPress={openPreview}>{t('openPreview')}</Button>
            ) : null}
            {book?.imageLinks?.thumbnail ? (
              <Button mode="contained" onPress={saveCover} disabled={saving}>{saving ? t('saving') : t('saveCover')}</Button>
            ) : null}
          </Animated.View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: theme.colors.card }]}>{t('backToSearch')}</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-start'
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 20
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 50
  },
  textSection: {
    flex: 1
  },
  title: {
    ...themeSettings.typography.textStyles.title,
    marginBottom: 10
  },
  author: {
    ...themeSettings.typography.textStyles.title,
    marginBottom: 10
  },
  description: {
    ...themeSettings.typography.textStyles.text,
    flex: 1,
    paddingTop: 20
  },
  backButton: {
    padding: 10,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3
        }
      : {
          elevation: 4
        })
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    zIndex: 1
  },
  favoriteIcon: {
    fontSize: 24,
    color: 'red'
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600'
  }
});

const translated = translate('DetailsScreen')(DetailsScreen);

export default translated;
