import defaultTheme from 'tailwindcss/defaultTheme.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx}',
    './src/components/**/*.{astro,html,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-base': '#FBF7F2',
        'bg-surface': '#FBF7F2',
        'bg-elevated': '#FDCB45',
        accent: '#4D49B9',
        'accent-deep': '#25245A',
        'accent-glow': 'rgba(77, 73, 185, 0.12)',
        'text-primary': '#1C1B2C',
        'text-muted': '#4D49B9',
        border: 'rgba(37, 36, 90, 0.10)',
      },
      fontFamily: {
        mont: ['"Poppins"', 'ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
        'dm-mono': ['"DM Mono"', 'ui-monospace', 'SFMono-Regular'],
        sans: ['"Poppins"', 'ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'purple-glow': '0 8px 30px rgba(77,73,185,0.14)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'progress-loop': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'progress-loop': 'progress-loop 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
