import { defineConfig } from 'vitepress'
import { FILINGS, markdown, nav, search, sidebar, socialLinks } from './configuration'
// const nav = generateNav()
// const sidebar = generateSidebar()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 网站语言
  lang: 'zh-CN',
  // 网站标签页的主站标题
  titleTemplate: ':title 💖 极客兔',
  // 网站描述
  description: '一心创作优质内容,你学习路上的笔记好帮手...',
  // 文档目录
  // srcDir: './src',
  // 输出目录
  outDir: '../dist',
  // 网站 head 配置: 做 SEO 优化
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.png',
      },
    ],
  ],
  markdown,
  // 忽略无效链接
  ignoreDeadLinks: true,
  /** 国际化配置 */
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
    },
    /*en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2023 Created By Zhou Yu. MIT License.',
        },
      },
    },*/
  },
  // 网站主题配置
  themeConfig: {
    // 浅色模式标题
    lightModeSwitchTitle: '浅色模式',
    // 深色模式标题
    darkModeSwitchTitle: '深色模式',
    // 网站logo跳转的链接
    logoLink: '/',
    // 网站logo图片
    logo: {
      light: '/rabbit.svg',
      dark: '/rabbit-dark.svg',
    },
    // 导航栏
    nav,
    // 侧边栏
    sidebar,
    // 社交链接
    socialLinks,
    // 搜索配置
    search,
    // 手机端才会显示
    returnToTopLabel: '返回顶部',
    // 最近更新时间
    lastUpdated: {
      text: '最近更新时间',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    /* 编辑链接 */
    editLink: {
      pattern: 'https://github.com/ZhouYu2156/docs',
      text: '在 Github 上编辑此页',
    },
    // 文章大纲
    outline: {
      level: 'deep',
      label: '文 章 导 航',
    },
    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    // 找不到页面
    notFound: {
      title: '找不到页面',
      linkText: '返回首页',
      quote: '如果你不改变方向, 保持寻找, 你可能会到达你想要去的地方！',
    },
    // 首页的页脚
    footer: {
      message: FILINGS,
      copyright: 'Copyright © 2023 Created By Zhou Yu.',
    },
  },
  vite: {
    /*resolve: {
      alias: {
        '@/': fileURLToPath(new URL('./', import.meta.url)),
      },
    },*/
    build: {
      chunkSizeWarningLimit: 1000 * 2,
    },
    server: {
      host: true,
      port: 5176,
      // open: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
})
