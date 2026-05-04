// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Filings from './components/Filings.vue'
import HomeSponsors from './components/HomeSponsors.vue'
import JktButton from './components/JktButton.vue'
import Sponsors from './components/Sponsors.vue'
import DefaultLayout from './layouts/Default.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: DefaultLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('JktButton', JktButton)
    app.component('Filings', Filings)
    app.component('HomeSponsors', HomeSponsors)
    app.component('Sponsors', Sponsors)
  },
} satisfies Theme
