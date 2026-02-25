import favoritesReducer from '../reducers/favoritesReducer';
import { addFavorite, removeFavorite } from '../actions';

const book = { id: '1', title: 'Test Book' };

describe('favoritesReducer', () => {
  it('adds favorite', () => {
    const state = favoritesReducer(undefined, addFavorite(book));
    expect(state.favorites).toHaveLength(1);
    expect(state.favorites[0].id).toBe('1');
  });

  it('removes favorite', () => {
    const initial = { favorites: [book] };
    const state = favoritesReducer(initial, removeFavorite('1'));
    expect(state.favorites).toHaveLength(0);
  });
});
