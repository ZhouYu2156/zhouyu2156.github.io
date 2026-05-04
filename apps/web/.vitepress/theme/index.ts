// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Filings from './components/Filings.vue'
import JktButton from './components/JktButton.vue'
import DefaultLayout from './layouts/Default.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: DefaultLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('JktButton', JktButton)
    app.component('Filings', Filings)
  },
} satisfies Theme
