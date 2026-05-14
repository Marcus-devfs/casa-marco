import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5ede0',
        'cream-warm': '#ebe0cb',
        paper: '#faf6ec',
        terracotta: '#c25a2e',
        'terracotta-dark': '#8b3a1f',
        ember: '#b53a1a',
        wheat: '#d4a574',
        'wheat-soft': '#e3c08e',
        basil: '#4a6840',
        charcoal: '#1f1813',
        ink: '#2d2520',
        soot: '#14110d',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Manrope', 'Helvetica Neue', 'sans-serif'],
        display: ['var(--font-display)', 'DM Serif Display', 'Georgia', 'serif'],
        hand: ['var(--font-hand)', 'Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}

export default config
