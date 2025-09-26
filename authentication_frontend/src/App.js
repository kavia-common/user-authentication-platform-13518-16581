import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';

/**
 * PUBLIC_INTERFACE
 * App is the root component rendering a minimal UI with theme toggle and the LoginPage.
 * This version routes directly to the LoginPage without a router to keep dependencies minimal.
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme to document element
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Theme apply error:', e);
    }
  }, [theme]);

  // PUBLIC_INTERFACE
  /**
   * Toggle between light and dark theme.
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <LoginPage />
    </div>
  );
}

export default App;
