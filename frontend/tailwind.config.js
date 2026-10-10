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
        olive: {
          DEFAULT: '#606C38',
          50: '#f7f8f2',
          100: '#eef1e3',
          200: '#dde3c7',
          300: '#c5d0a2',
          400: '#a6b777',
          500: '#849851',
          600: '#606C38',
          700: '#4a542b',
          800: '#383f21',
          900: '#2d331a'
        },
        forest: {
          DEFAULT: '#283618',
          950: '#0c1207',
          900: '#141c0c',
          850: '#1b2610',
          800: '#283618',
          700: '#384b22',
          600: '#4f6930'
        },
        cream: {
          DEFAULT: '#FEFAE0',
          50: '#ffffff',
          100: '#FEFAE0',
          200: '#fbf5c8',
          300: '#f8eaab',
          400: '#f3d97b'
        },
        ochre: {
          DEFAULT: '#DDA15E',
          200: '#f1d3af',
          300: '#e7ba86',
          400: '#DDA15E',
          500: '#cb8b44',
          600: '#b1722e'
        },
        terracotta: {
          DEFAULT: '#BC6C25',
          300: '#da8a43',
          400: '#cc7d33',
          500: '#BC6C25',
          600: '#9e5417',
          700: '#7e3f0e'
        },
        dark: {
          950: '#0c1207',
          900: '#141c0c',
          850: '#1b2610',
          800: '#283618',
          700: '#384b22',
          600: '#4f6930'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'clay-card': '0 14px 28px -4px rgba(7, 12, 4, 0.7), 0 6px 12px -2px rgba(7, 12, 4, 0.5), inset 0 1px 2px 0 rgba(254, 250, 224, 0.16), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.4)',
        'clay-card-hover': '0 20px 35px -6px rgba(7, 12, 4, 0.8), 0 8px 16px -3px rgba(7, 12, 4, 0.6), inset 0 1px 2px 0 rgba(254, 250, 224, 0.22), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.45)',
        'clay-btn': '0 6px 16px rgba(188, 108, 37, 0.35), 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(254, 250, 224, 0.35), inset 0 -2px 3px rgba(0, 0, 0, 0.35)',
        'clay-btn-olive': '0 6px 16px rgba(96, 108, 56, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(254, 250, 224, 0.35), inset 0 -2px 3px rgba(0, 0, 0, 0.35)',
        'neomorph-extruded': '8px 8px 18px rgba(5, 9, 3, 0.75), -5px -5px 14px rgba(96, 108, 56, 0.15)',
        'neomorph-debossed': 'inset 3px 3px 6px rgba(0, 0, 0, 0.55), inset -2px -2px 5px rgba(254, 250, 224, 0.08)',
        'clay-pill': '0 4px 10px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(254, 250, 224, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
};
