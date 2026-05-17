import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
// 导入 twoslash 的样式
import '@shikijs/vitepress-twoslash/style.css'

// 显示代码块的图标需要引入这个css文件
import 'virtual:group-icons.css'

// 导入自定义的样式
import './styles.css'

// 导入自定义的组件
import Layout from './Layout.vue'
import BibleCollection from './components/BibleCollection.vue'
import ClassicsCollection from './components/ClassicsCollection.vue'
import Clock from './components/Clock.vue'
import Login from './components/Login.vue'
import Music from './components/Music.vue'
import PoetryCollection from './components/PoetryCollection.vue'
import References from './components/References.vue'
import Resume from './components/Resume.vue'
import Sponsors from './components/Sponsors.vue'
import UtilityTools from './components/UtilityTools.vue'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // ...
    app.use(TwoslashFloatingVue)
    app.component('Login', Login)
    app.component('Sponsors', Sponsors)
    app.component('Resume', Resume)
    app.component('Music', Music)
    app.component('UtilityTools', UtilityTools)
    app.component('Clock', Clock)
    app.component('BibleCollection', BibleCollection)
    app.component('ClassicsCollection', ClassicsCollection)
    app.component('PoetryCollection', PoetryCollection)
    app.component('References', References)
  }
} satisfies Theme
