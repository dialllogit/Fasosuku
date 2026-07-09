import { defineConfig } from 'tailwindcss/defaultConfig'

export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#64748b'
      }
    }
  },
  plugins: []
})
