import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '极客兔',
  titleTemplate: ':title 💖 极客兔',
  description: '用心创作优质内容',
  srcDir: 'src',
  outDir: 'company',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细内容',
    },
  },
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    /** 主题文本显示配置 */
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '浅色模式',
    darkModeSwitchTitle: '深色模式',

    logo: {
      src: '/favicon.png',
      alt: '极客兔',
      style: 'width: 48px; height: 48px;',
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新时间',

    outline: {
      level: [2, 4],
      label: '本页导航',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '官方首页', link: '/' },
      { text: '所有产品', link: '/products/' },
      { text: '技术文档', link: '/docs/' },
      { text: '作者履历', link: '/author/' },
      { text: '个人博客', link: '/blogs/' },
      { text: '天涯社区', link: '/community/' },
      { text: '登录', link: '/login/' },
    ],

    sidebar: [
      {
        text: '博客',
        link: '/blogs/',
        items: [{ text: '理性认知', link: '/blogs/理性认知' }],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ZhouYu2156',
      },
      {
        icon: 'bilibili',
        link: 'https://space.bilibili.com/431828034',
      },
    ],
    editLink: {
      text: '在 Github 上编辑此页',
      pattern: 'https://github.com/ZhouYu2156/jiketu/edit/main/apps/web/src/:path',
    },

    notFound: {
      title: '找不到页面',
      quote: '但如果你不改变方向，继续寻找，你最终可能会到达你正在前进的方向。—《The Little Prince》',
      linkLabel: '回到首页',
      linkText: '回到首页',
    },

    footer: {
      message: `<p style="display: flex; justify-content: center; gap: 10px;">
            <span style="display: flex; align-items: center; gap: 5px;">
              <img src="/filings/police.png" alt="湘公网安备查询" style="width: 16px; height: 16px;" />
              <a href="https://beian.miit.gov.cn/" target="_blank">
              湘公网安备43112402000148号
              </a>
            </span>      
            <span style="display: flex; align-items: center; gap: 5px;">
              <img src="/filings/icp.png" alt="湘备案号查询" style="width: 16px; height: 16px;" />
              <a href="https://beian.miit.gov.cn/" target="_blank">
              湘ICP备2024064075号-1
              </a>
            </span>
          </p>`,
      copyright: 'Copyright © 2026 极客兔',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
