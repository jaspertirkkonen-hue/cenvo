import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        indigo: '#6366F1',
        turquoise: '#00C6FF',
        deepnavy: '#0A0F1F',
        graphite: '#12141C',
        soft: '#E0E0E0'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        dmsans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config

