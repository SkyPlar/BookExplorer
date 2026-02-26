import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import favoritesReducer from '../reducers/favoritesReducer';
import booksReducer from '../reducers/booksReducer';
import uiReducer from '../reducers/uiReducer';
import i18nReducer from '../reducers/i18nReducer';
import HomeScreen from '../screens/HomeScreen';
import { ThemeProvider } from '../theme/ThemeProvider';
import { searchBooks } from '../services/api';
import { Provider as PaperProvider } from 'react-native-paper';

jest.mock('../services/api', () => ({
  searchBooks: jest.fn(),
}));

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  books: booksReducer,
  ui: uiReducer,
  i18n: i18nReducer,
});
const store = createStore(rootReducer);

const navigationMock = { navigate: jest.fn() };

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows results after search', async () => {
    searchBooks.mockResolvedValue({
      items: [
        {
          id: 'abc',
          volumeInfo: {
            title: 'Harry Potter',
            authors: ['J.K. Rowling'],
          },
        },
      ],
    });

    const { getByPlaceholderText, getByText } = render(
      <ReduxProvider store={store}>
        <PaperProvider>
          <ThemeProvider>
            <HomeScreen navigation={navigationMock} />
          </ThemeProvider>
        </PaperProvider>
      </ReduxProvider>
    );

    fireEvent.changeText(getByPlaceholderText('searchPlaceholder'), 'harry');

    await waitFor(() => {
      expect(getByText('Harry Potter')).toBeTruthy();
    });
  });
});
