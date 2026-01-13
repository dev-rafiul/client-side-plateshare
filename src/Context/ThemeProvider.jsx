import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('plateshare-theme');
      console.log('Initial theme from localStorage:', savedTheme);
      return savedTheme || 'plateshare_light';
    }
    return 'plateshare_light';
  });

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Applying theme:', theme);
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('plateshare-theme', theme);
      
      // Force background color change on body and html
      if (theme === 'plateshare_dark') {
        document.body.style.backgroundColor = '#1f1f1f';
        document.body.style.color = '#ffffff';
        document.documentElement.style.backgroundColor = '#1f1f1f';
        document.documentElement.style.colorScheme = 'dark';
        console.log('Applied dark theme styles');
      } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#171717';
        document.documentElement.style.backgroundColor = '#ffffff';
        document.documentElement.style.colorScheme = 'light';
        console.log('Applied light theme styles');
      }
      
      // Force a repaint to ensure styles are applied
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'plateshare_light' ? 'plateshare_dark' : 'plateshare_light';
      return newTheme;
    });
  };

  // Check if current theme is dark
  const isDark = theme === 'plateshare_dark';

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;