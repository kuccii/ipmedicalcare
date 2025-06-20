// tailwind.config.js

import animationDelay from 'tailwindcss-animation-delay';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 1. Add custom animation keyframes and utilities
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // 2. Add custom animation delay values (optional, but good for consistency)
      // The plugin will generate these, but you can add more here.
      animationDelay: {
        3000: '3000ms',
      },
    },
  },
  // 3. Register the plugin
  plugins: [
    animationDelay,
  ],
};