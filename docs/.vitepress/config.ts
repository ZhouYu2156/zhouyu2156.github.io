import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'
import tailwindcss from '@tailwindcss/vite'
import { DefaultTheme, defineConfig } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from 'vitepress-plugin-group-icons'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectGroupIconTabLabels } from './plugins/collectGroupIconLabels'
import { resolveDirectories } from './plugins/resolveDirectories'

/** 需要做映射的导航菜单 */
const navMap = {
  首页: '🏡 首页',
  博客: '📚 博客',
  技术: '🛠️ 技术',
  登录: '🔒 登录',
  简历: '📝 简历',
  产品: '🚀 产品'
}

// 获取项目 src 目录
const vitepressDir = path.dirname(fileURLToPath(import.meta.url))

const srcDir = path.resolve(vitepressDir, '../src')

/** 供 group-icons 生产构建：避免 virtual:group-icons.css 首次 load 时 matches 仍为空 */
const groupIconDefaultLabels = collectGroupIconTabLabels(srcDir)

let { nav, sidebar, rewrites } = resolveDirectories(srcDir)

nav = [{ text: '首页', link: '/' } as DefaultTheme.NavItem]
  .concat(nav as unknown as DefaultTheme.NavItem[])
  .map((item) => ({
    text: navMap[item?.['text'] as keyof typeof navMap],
    link: item?.['link'] as keyof typeof navMap
  }))

export default defineConfig({
  title: '极客兔',
  titleTemplate: ':title 💖 极客兔',
  lang: 'zh-CN',
  description: '用心创作优质内容',
  metaChunk: true,
  srcDir: 'src',
  outDir: 'geektu',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  /** 与 resolveDirectories 侧栏一致：磁盘路径可带 `01.` 排序前缀，对外 URL 无此前缀 */
  rewrites,

  vite: {
    /** 显示代码块的图标；`defaultLabels` 修复生产构建时虚拟 CSS 早于 md transform 被缓存导致无图标 */
    plugins: [
      groupIconVitePlugin({ defaultLabels: groupIconDefaultLabels }),
      tailwindcss()
    ],
    server: {
      port: 5174
    }
  },

  markdown: {
    math: true,
    config(md) {
      md.use(groupIconMdPlugin)
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详情'
    },
    lineNumbers: true,
    theme: {
      light: 'one-light',
      dark: 'github-dark'
    },
    codeCopyButtonTitle: '复制代码',
    codeTransformers: [
      transformerTwoslash({ typesCache: createFileSystemTypesCache() })
    ],
    // Explicitly load these languages for types hightlighting
    languages: ['js', 'jsx', 'ts', 'tsx']
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }]
  ],
  themeConfig: {
    /** 主题文本显示配置 */
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    logo: {
      src: '/favicon.png',
      alt: '极客兔',
      style: 'width: 36px; height: 36px;'
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',

    skipToContentLabel: '跳转到内容',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZhouYu2156/' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/431828034' },
      { icon: 'twitter', link: 'https://x.com/LiveStar514741' }
    ],
    nav /*[
      { text: '🏡 首页', link: '/' },
      { text: '📚 博客', link: '/博客/' }
    ]*/,
    sidebar /*{
      '/博客/': [
        {
          text: '写作',
          collapsed: false,
          items: [{ text: '成长思考', link: '/博客/写作/成长思考' }]
        }
      ]
    }*/,
    outline: {
      label: '页面导航',
      level: [2, 4]
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    editLink: {
      pattern: 'https://github.com/ZhouYu2156/',
      text: '在 GitHub 上编辑此页面'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    notFound: {
      title: '页面未找到',
      quote:
        '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },
    search: { options: searchOptions() },
    footer: {
      message: '用心创造世界，用技术改变未来。',
      copyright: 'Copyright © 2026 极客兔'
    }
  }
  /*async transformPageData(pageData, { siteConfig }) {
    const root = siteConfig.root
    const srcDir = siteConfig.srcDir
    const absPath = path.resolve(root, srcDir, pageData.relativePath)

    const st = fs.statSync(absPath)
    const createdAt = new Date(st.birthtimeMs).toLocaleString()
    return {
      frontmatter: {
        ...pageData.frontmatter,
        ...(createdAt && !pageData.frontmatter.createdAt ? { createdAt } : {})
      }
    }
  }*/
})

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    translations: {
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索'
      },
      modal: {
        searchBox: {
          clearButtonTitle: '清除',
          clearButtonAriaLabel: '清除查询',
          closeButtonText: '关闭',
          closeButtonAriaLabel: '关闭',
          placeholderText: '搜索文档或向 AI 提问',
          placeholderTextAskAi: '再问一个问题...',
          placeholderTextAskAiStreaming: '正在回答...',
          searchInputLabel: '搜索',
          backToKeywordSearchButtonText: '返回关键词搜索',
          backToKeywordSearchButtonAriaLabel: '返回关键词搜索',
          newConversationPlaceholder: '提问',
          conversationHistoryTitle: '我的对话历史',
          startNewConversationText: '开始新的对话',
          viewConversationHistoryText: '对话历史',
          threadDepthErrorPlaceholder: '对话已达上限'
        },
        newConversation: {
          newConversationTitle: '我今天能帮你什么？',
          newConversationDescription:
            '我会搜索你的文档，快速帮你找到设置指南、功能细节和故障排除提示。'
        },
        footer: {
          selectText: '选择',
          submitQuestionText: '提交问题',
          selectKeyAriaLabel: '回车键',
          navigateText: '导航',
          navigateUpKeyAriaLabel: '向上箭头',
          navigateDownKeyAriaLabel: '向下箭头',
          closeText: '关闭',
          backToSearchText: '返回搜索',
          closeKeyAriaLabel: 'Esc 键',
          poweredByText: '由…提供支持'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查网络连接。'
        },
        startScreen: {
          recentSearchesTitle: '最近',
          noRecentSearchesText: '暂无最近搜索',
          saveRecentSearchButtonTitle: '保存此搜索',
          removeRecentSearchButtonTitle: '从历史记录中移除此搜索',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除此搜索',
          recentConversationsTitle: '最近对话',
          removeRecentConversationButtonTitle: '从历史记录中移除此对话'
        },
        noResultsScreen: {
          noResultsText: '未找到相关结果',
          suggestedQueryText: '尝试搜索',
          reportMissingResultsText: '认为此查询应该有结果？',
          reportMissingResultsLinkText: '告诉我们。'
        },
        resultsScreen: {
          askAiPlaceholder: '询问 AI：',
          noResultsAskAiPlaceholder: '文档里没找到？让 Ask AI 帮忙：'
        },
        askAiScreen: {
          disclaimerText: '回答由 AI 生成，可能会出错。请核实。',
          relatedSourcesText: '相关来源',
          thinkingText: '思考中...',
          copyButtonText: '复制',
          copyButtonCopiedText: '已复制！',
          copyButtonTitle: '复制',
          likeButtonTitle: '喜欢',
          dislikeButtonTitle: '不喜欢',
          thanksForFeedbackText: '感谢你的反馈！',
          preToolCallText: '搜索中...',
          duringToolCallText: '搜索中...',
          afterToolCallText: '已搜索',
          stoppedStreamingText: '你已停止此回复',
          errorTitleText: '聊天错误',
          threadDepthExceededMessage: '为保持回答准确，此对话已关闭。',
          startNewConversationButtonText: '开始新的对话'
        }
      }
    },
    askAi: {
      sidePanel: {
        button: {
          translations: {
            buttonText: '询问 AI',
            buttonAriaLabel: '询问 AI'
          }
        },
        panel: {
          translations: {
            header: {
              title: '询问 AI',
              conversationHistoryTitle: '我的对话历史',
              newConversationText: '开始新的对话',
              viewConversationHistoryText: '对话历史'
            },
            promptForm: {
              promptPlaceholderText: '提问',
              promptAnsweringText: '正在回答...',
              promptAskAnotherQuestionText: '再问一个问题',
              promptDisclaimerText: '回答由 AI 生成，可能会出错。',
              promptLabelText: '按回车发送，Shift+回车换行。',
              promptAriaLabelText: '问题输入'
            },
            conversationScreen: {
              preToolCallText: '搜索中...',
              searchingText: '搜索中...',
              toolCallResultText: '已搜索',
              conversationDisclaimer: '回答由 AI 生成，可能会出错。请核实。',
              reasoningText: '推理中...',
              thinkingText: '思考中...',
              relatedSourcesText: '相关来源',
              stoppedStreamingText: '你已停止此回复',
              copyButtonText: '复制',
              copyButtonCopiedText: '已复制！',
              likeButtonTitle: '喜欢',
              dislikeButtonTitle: '不喜欢',
              thanksForFeedbackText: '感谢你的反馈！',
              errorTitleText: '聊天错误'
            },
            newConversationScreen: {
              titleText: '我今天能帮你什么？',
              introductionText:
                '我会搜索你的文档，快速帮你找到设置指南、功能细节和故障排除提示。'
            },
            logo: {
              poweredByText: '由…提供支持'
            }
          }
        }
      }
    }
  }
}
