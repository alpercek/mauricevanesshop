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
      aotfdb: ["AOTFDB"],
      aotf: ["AOTF"],
      cooperbt: ["COOPERBT"],
      cooperbtmid: ["COOPERBTMID"],
      garamond: ["GARAMOND"],
      garamondit: ["GARAMONDIT"],
      platform: ["PLATFORM"],
      metrik: ["METRIKMID"],
      cooperbtbold: ["COOPERBTBOLD"],
      venus: ["VENUS"],
      maru: ["MARU"],
      marudemi: ["MARUDEMI"],
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
}
