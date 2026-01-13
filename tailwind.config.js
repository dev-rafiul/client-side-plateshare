/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom spacing scale for consistent layout
      spacing: {
        'xs': '0.5rem',    // 8px
        'sm': '0.75rem',   // 12px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '3rem',     // 48px
        '3xl': '4rem',     // 64px
        '4xl': '5rem',     // 80px
        '5xl': '6rem',     // 96px
      },
      // Custom border radius scale
      borderRadius: {
        'sm': '0.375rem',  // 6px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
      },
      // Custom font family
      fontFamily: {
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Custom animations for enhanced UX
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        plateshare_light: {
          "primary": "#ebc15e",
          "primary-content": "#ffffff", 
          "secondary": "#8d5751",
          "secondary-content": "#ffffff",
          "accent": "#22c55e", 
          "accent-content": "#ffffff",
          "neutral": "#737373",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f5f5f5", 
          "base-300": "#e5e5e5",
          "base-content": "#171717",
          "info": "#3b82f6",
          "success": "#22c55e", 
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      },
      {
        plateshare_dark: {
          "primary": "#ebc15e",
          "primary-content": "#171717",
          "secondary": "#8d5751", 
          "secondary-content": "#ffffff",
          "accent": "#22c55e",
          "accent-content": "#171717", 
          "neutral": "#404040",
          "neutral-content": "#ffffff",
          "base-100": "#1f1f1f",
          "base-200": "#2a2a2a",
          "base-300": "#3a3a3a", 
          "base-content": "#ffffff",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b", 
          "error": "#ef4444",
        }
      }
    ],
    darkTheme: "plateshare_dark",
    base: true,
    styled: true,
    utils: true,
    logs: false,
    prefix: "",
  },
};
