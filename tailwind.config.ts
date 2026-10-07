import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#edf7ff',
          100: '#dfeefe',
          200: '#bcdcff',
          300: '#8cc9ff',
          400: '#5eaaf9',
          500: '#3e8ee8',
          700: '#1e3a5f',
          800: '#102b49',
          900: '#0d1f36'
        },
        gold: {
          300: '#f6d77b',
          400: '#f0c75a',
          500: '#d9a92a'
        },
      },
      boxShadow: {
        glow: '0 20px 45px -20px rgba(30, 58, 95, 0.5)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.2) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
} satisfies Config;
