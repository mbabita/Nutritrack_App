import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useAppContext();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1001 }}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeSwitcher;
