import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lightTheme, darkTheme, themes } from './index';
import { setThemeName } from '../actions';

const ThemeContext = createContext({
  theme: lightTheme,
  themeName: 'light',
  toggleTheme: () => {},
  setThemeName: () => {},
});

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const themeName = useSelector((state) => state?.ui?.themeName || 'light');

  const applyTheme = useCallback((next) => {
    if (themes[next]) {
      dispatch(setThemeName(next));
    }
  }, [dispatch]);

  const toggleTheme = useCallback(() => {
    applyTheme(themeName === 'light' ? 'dark' : 'light');
  }, [applyTheme, themeName]);

  const value = useMemo(() => ({
    themeName,
    theme: themeName === 'dark' ? darkTheme : lightTheme,
    toggleTheme,
    setThemeName: applyTheme,
  }), [applyTheme, themeName]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
