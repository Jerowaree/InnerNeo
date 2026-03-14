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
        'bg-base': '#FFFFFF',
        'bg-surface': '#F8FAFF',
        'bg-elevated': '#F3F4F6',
        accent: '#A78BFA',
        'accent-deep': '#612DAA',
        'accent-glow': 'rgba(167, 139, 250, 0.12)',
        'text-primary': '#0F1724',
        'text-muted': '#6B7280',
        border: 'rgba(124, 58, 237, 0.10)',
      },
      fontFamily: {
        mont: ['"Mont Regular"', ...defaultTheme.fontFamily.sans],
        'dm-mono': ['"DM Mono"', 'ui-monospace', 'SFMono-Regular'],
        sans: ['"Kumbh Sans"', 'ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'purple-glow': '0 8px 30px rgba(167,139,250,0.14)',
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
