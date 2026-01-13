import { useTheme } from '../Context/ThemeProvider';

const ThemeTest = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-base-200 p-4 rounded-lg shadow-lg border border-base-300">
        <h3 className="text-base-content font-semibold mb-2">Theme Debug</h3>
        <p className="text-base-content text-sm">Current theme: {theme}</p>
        <p className="text-base-content text-sm">Is dark: {isDark ? 'Yes' : 'No'}</p>
        <button 
          onClick={toggleTheme}
          className="btn btn-primary btn-sm mt-2"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeTest;