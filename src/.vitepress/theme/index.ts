// https://vitepress.dev/guide/custom-theme
import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import References from './components/References.vue'
import Layout from './Layout.vue'

import Image from './components/Image.vue'

// 导入Element Plus组件
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus'

// 导入Element Plus图标
import { ArrowDown } from '@element-plus/icons-vue'

// 导入样式文件 - 注意顺序很重要
// 首先导入基础CSS
import './style.css'
// 然后导入主题CSS
import './styles/themes.css'
// 添加用于主题过渡的View Transitions样式
import './styles/theme-transitions.css'
// Element Plus主题样式覆盖
import './styles/element-overrides.css'

export default {
  extends: DefaultTheme,
  // 扩展默认的Layout，而不是替换它
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 手动注册Element Plus组件
    app.component('ElDropdown', ElDropdown)
    app.component('ElDropdownMenu', ElDropdownMenu)
    app.component('ElDropdownItem', ElDropdownItem)
    app.component('ElIcon', ElIcon)

    // 注册Element Plus图标
    app.component('ArrowDown', ArrowDown)

    // 注册全局组件
    app.component('References', References)
    app.component('Image', Image)
  },
} satisfies Theme
