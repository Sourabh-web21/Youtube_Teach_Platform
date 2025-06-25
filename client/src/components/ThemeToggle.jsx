import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
// import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (targetTheme) => {
    if (theme !== targetTheme) {
      toggleTheme();
    }
    setOpen(false);
  };

  return (
    <div className="theme-toggle-wrapper" ref={dropdownRef}>
      <button className="theme-toggle-button" onClick={() => setOpen(!open)}>
        {theme === 'dark' ? '🌙 Dark' : '🌞 Light'} <span className="arrow">▾</span>
      </button>

      {open && (
        <div className="theme-dropdown">
          <label className="theme-option">
            <input
              type="radio"
              name="theme"
              checked={theme === 'light'}
              onChange={() => handleThemeChange('light')}
            />
            <span className="radio-icon"></span>
            <span>🌞 Light</span>
          </label>
          <label className="theme-option">
            <input
              type="radio"
              name="theme"
              checked={theme === 'dark'}
              onChange={() => handleThemeChange('dark')}
            />
            <span className="radio-icon"></span>
            <span>🌙 Dark</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
