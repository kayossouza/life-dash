/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neutral-light': '#f5f5f5',
        'neutral-medium': '#e0e0e0',
        'neutral-dark': '#404040',
        'dark': {
          'bg': '#121212',
          'surface': '#1e1e1e',
          'border': '#333333',
          'text': '#e0e0e0',
          'muted': '#a0a0a0',
          'accent': '#3b82f6'
        }
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'dark-soft': '0 2px 10px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s infinite',
        'fade-in': 'fadeIn 0.3s ease-in forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.bg-pattern-light': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.6' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        },
        '.bg-pattern-dark': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23232323' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        },
      };
      addUtilities(newUtilities);
    },
  ],
}