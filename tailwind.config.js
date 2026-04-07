/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#050816',
        frost: '#dff7ff',
        accent: '#5eead4',
        coral: '#fb7185',
        gold: '#fbbf24',
      },
      boxShadow: {
        glow: '0 0 40px rgba(94, 234, 212, 0.18)',
        panel: '0 24px 80px rgba(3, 7, 18, 0.45)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top left, rgba(94, 234, 212, 0.22), transparent 36%), radial-gradient(circle at 80% 10%, rgba(251, 113, 133, 0.18), transparent 28%), radial-gradient(circle at bottom center, rgba(96, 165, 250, 0.16), transparent 32%)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 2.8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
