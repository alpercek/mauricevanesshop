module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.vue',
    './slices/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    fontFamily: {
      cooperbt: ["COOPERBT"],
      garamond: ["GARAMOND"],
      platform: ["PLATFORM"],
      metrik: ["METRIKMID"],
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}
