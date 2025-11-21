module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#3B82F6',
          background: '#FFFFFF',
          card: '#F8FAFC',
          text: '#1E293B',
          border: '#E2E8F0',
        },
        dark: {
          primary: '#60A5FA',
          background: '#0F172A',
          card: '#1E293B',
          text: '#F1F5F9',
          border: '#334155',
        }
      },
      fontFamily: {
        'fa': ['Vazirmatn', 'system-ui'],
        'en': ['Inter', 'system-ui'],
      }
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")], 
}