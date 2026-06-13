import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
    onClick={onToggle}
    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    aria-label="Toggle theme"
  >
    <div className="toggle-track">
      <div className="toggle-thumb">
        {isDark ? <FiMoon size={12} /> : <FiSun size={12} />}
      </div>
    </div>
    <span className="toggle-label">{isDark ? 'Dark' : 'Light'}</span>
  </button>
);

export default ThemeToggle;
