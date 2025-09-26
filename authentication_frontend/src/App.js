import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * App is the root component rendering a minimal UI with theme toggle.
 * It ensures a visible placeholder is displayed so the preview never looks blank.
 * Returns a simple page with a header, logo, and helpful status text.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [hasError, setHasError] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      // In very constrained preview contexts, document may be blocked
      // Ensure we still render something useful
      setHasError(true);
      // eslint-disable-next-line no-console
      console.error('Theme apply error:', e);
    }
  }, [theme]);

  // PUBLIC_INTERFACE
  /**
   * Toggle between light and dark theme.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {/* Minimal placeholder to guarantee visible UI */}
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            marginBottom: 16,
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
          }}
          role="status"
          aria-live="polite"
        >
          <strong>Authentication Frontend</strong>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>
            Status: UI loaded {hasError ? '(with fallback)' : ''}
          </div>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
