import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, useWindowDimensions, SafeAreaView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translate } from "react-translate";
import { searchBooks } from '../../services/api';
import { useTheme } from '../../theme/ThemeProvider';
import { Portal, Modal, Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBooksError,
  setBooksLoading,
  setBooksQuery,
  setBooksSort,
  setBooksSuccess,
  setBooksWithCoverOnly,
} from '../../actions';
import BookCard from './components/BookCard';

const HomeScreen = ({ navigation, t }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { query, items, isLoading, error, sortBy, withCoverOnly } = useSelector((state) => state?.books || {});
  const searchQuery = query || '';
  const books = items || [];
  const abortRef = useRef(null);
  const skipNextFetchRef = useRef(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { theme } = useTheme();
  const visibleBooks = books.filter((book) => {
    if (!withCoverOnly) {
      return true;
    }
    return Boolean(book?.volumeInfo?.imageLinks?.thumbnail);
  });

  useEffect(() => {
    const loadLastSearch = async () => {
      try {
        const saved = await AsyncStorage.getItem('lastSearch');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.query) {
            skipNextFetchRef.current = true;
            dispatch(setBooksQuery(parsed.query));
            dispatch(setBooksSuccess(parsed.items || []));
          }
        }
      } catch (err) {
        console.error('Error loading last search:', err);
      }
    };
    loadLastSearch();
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }
    if (searchQuery.length > 2) {
      dispatch(setBooksLoading(true));
      dispatch(setBooksError(null));
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      const fetchBooks = async () => {
        try {
          const data = await searchBooks(searchQuery, controller.signal);
          dispatch(setBooksSuccess(data.items || []));
          await AsyncStorage.setItem('lastSearch', JSON.stringify({ query: searchQuery, items: data.items || [] }));
        } catch (err) {
          if (err.name === 'CanceledError' || err.name === 'AbortError') {
            return;
          }
          dispatch(setBooksSuccess([]));
          dispatch(setBooksError(t('fetchError')));
          setSnackbarVisible(true);
          console.error('Error fetching books:', err);
        } finally {
          dispatch(setBooksLoading(false));
        }
      };
      fetchBooks();
    } else {
      dispatch(setBooksSuccess([]));
      dispatch(setBooksError(null));
      if (abortRef.current) {
        abortRef.current.abort();
      }
      AsyncStorage.removeItem('lastSearch').catch(() => {});
    }
  }, [dispatch, searchQuery, t]);

  const navigateToDetails = useCallback((book) => {
    navigation.navigate('Details', { ...book.volumeInfo, id: book.id, description: book.volumeInfo.description });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[styles.container, { backgroundColor: theme.colors.background, paddingHorizontal: Math.max(10, width * 0.03) }] }>
      <TextInput
        style={[styles.input, { borderColor: theme.colors.border }]}
        placeholder={t('searchPlaceholder')}
        value={searchQuery}
          onChangeText={(value) => dispatch(setBooksQuery(value))}
        clearButtonMode="while-editing"
      />
        <Button mode="outlined" onPress={() => setIsFilterVisible(true)}>{t('filterSort')}</Button>
      {error && <Text style={[styles.errorText, { color: theme.colors.danger || 'red' }]}>{error}</Text>}
      {!isLoading && books.length === 0 && searchQuery.length > 2 && (
        <Text style={[styles.noBooksText, { color: theme.colors.text }]}>{t('noBooksFound')}</Text>
      )}
        <Portal>
          <Modal
            visible={isFilterVisible}
            onDismiss={() => setIsFilterVisible(false)}
            contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.card }]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{t('filterSortTitle')}</Text>
            <View style={styles.modalButtons}>
              <Button mode={sortBy === 'relevance' ? 'contained' : 'outlined'} onPress={() => dispatch(setBooksSort('relevance'))}>
                {t('sortRelevance')}
              </Button>
              <Button mode={sortBy === 'title' ? 'contained' : 'outlined'} onPress={() => dispatch(setBooksSort('title'))}>
                {t('sortTitle')}
              </Button>
              <Button mode={sortBy === 'author' ? 'contained' : 'outlined'} onPress={() => dispatch(setBooksSort('author'))}>
                {t('sortAuthor')}
              </Button>
            </View>
            <View style={styles.filterRow}>
              <Text style={{ color: theme.colors.text }}>{t('withCoverOnly')}</Text>
              <Switch value={withCoverOnly} onValueChange={(enabled) => dispatch(setBooksWithCoverOnly(enabled))} />
            </View>
            <Button onPress={() => setIsFilterVisible(false)}>{t('close')}</Button>
          </Modal>
        </Portal>
      {error && (
        <Portal>
          <View style={styles.portalOverlay} pointerEvents="none">
            <View style={[styles.portalCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Text style={{ color: theme.colors.text }}>{error}</Text>
            </View>
          </View>
        </Portal>
      )}
      <FlatList
          data={isLoading ? [1, 2, 3] : visibleBooks}
          keyExtractor={(item, index) => (isLoading ? `skeleton-${index}` : item.id.toString())}
        renderItem={({ item }) => (
            <BookCard
              book={isLoading ? null : item}
              theme={theme}
              index={isLoading ? item : 0}
              isSkeleton={isLoading}
              onPress={() => navigateToDetails(item)}
            />
        )}
      />
        <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={2500}>
          {error || t('fetchError')}
        </Snackbar>
      </View>
    </SafeAreaView>
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
  noBooksText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 10,
  },
  portalOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  portalCard: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalButtons: {
    gap: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const screen = translate('HomeScreen')(HomeScreen);

export default screen;
