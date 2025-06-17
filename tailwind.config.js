/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          500: '#FDB347', // Passion text color
        },
        purple: {
          500: '#7C3AED', // Generation text color
        },
      },
      fontSize: {
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      fontFamily: {
        'anton': ['var(--font-anton)'],
        'lato': ['var(--font-lato)'],
      },
    },
  },
  plugins: [],
};
