import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Celestial Blue Palette
        celestial: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#00C6FF',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        cosmic: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#0A0F1F',
        },
        neon: {
          blue: '#00C6FF',
          purple: '#7C3AED',
          cyan: '#06B6D4',
          pink: '#EC4899',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      boxShadow: {
        'celestial': '0 0 20px rgba(0, 198, 255, 0.4)',
        'celestial-strong': '0 0 30px rgba(0, 198, 255, 0.6)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-strong': '0 20px 60px rgba(0, 0, 0, 0.4)',
        'neon': '0 0 20px var(--celestial-glow), 0 0 40px rgba(0, 198, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-celestial': 'linear-gradient(135deg, #00C6FF 0%, #2563EB 50%, #7C3AED 100%)',
        'gradient-neon': 'linear-gradient(90deg, #00C6FF, #2563EB, #7C3AED, #00C6FF)',
        'gradient-cosmic': 'linear-gradient(135deg, #0A0F1F 0%, #0F172A 25%, #1A202C 50%, #0F172A 75%, #0A0F1F 100%)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 198, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 198, 255, 0.6)' },
        },
        'fadeInUp': {
          'from': { opacity: '0', transform: 'translate3d(0, 30px, 0)' },
          'to': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'slideInLeft': {
          'from': { opacity: '0', transform: 'translate3d(-50px, 0, 0)' },
          'to': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'slideInRight': {
          'from': { opacity: '0', transform: 'translate3d(50px, 0, 0)' },
          'to': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'scaleIn': {
          'from': { opacity: '0', transform: 'scale(0.9)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
      },
    }
  },
  plugins: []
}

export default config

