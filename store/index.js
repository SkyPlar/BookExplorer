import { createStore, combineReducers } from 'redux';
import favoritesReducer from '../reducers/favoritesReducer';
import booksReducer from '../reducers/booksReducer';
import uiReducer from '../reducers/uiReducer';
import i18nReducer from '../reducers/i18nReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  books: booksReducer,
  ui: uiReducer,
  i18n: i18nReducer,
});

const store = createStore(rootReducer);

export default store;
