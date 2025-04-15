import { DefaultTheme } from "vitepress";

export const search:
  | { provider: "local"; options?: DefaultTheme.LocalSearchOptions | undefined }
  | { provider: "algolia"; options: DefaultTheme.AlgoliaSearchOptions } = {
  /**
   * 本地搜索配置
   */
  provider: "local",
  options: {
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        noResultsText: "无法找到相关结果",
        resetButtonTitle: "清除查询条件",
        displayDetails: "显示详情列表",
        footer: {
          selectText: "选择",
          navigateText: "切换",
          closeText: "关闭",
        },
      },
    },
  },
};

/**
 * algolia智能搜索配置
 * {
  provider: 'algolia',
  options: {
    appId: 'APKQSTOGXM',
    apiKey: 'c450ceb2a11b4d174b646bb2d4c68475',
    indexName: 'geek-rabbit-notes',
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
    // locales: {
    //   root: {
    //     placeholder: '搜索文档',
    //     translations: {
    //       button: {
    //         buttonText: '搜索文档',
    //         buttonAriaLabel: '搜索文档'
    //       },
    //       modal: {
    //         searchBox: {
    //           resetButtonTitle: '清除查询条件',
    //           resetButtonAriaLabel: '清除查询条件',
    //           cancelButtonText: '取消',
    //           cancelButtonAriaLabel: '取消'
    //         },
    //         startScreen: {
    //           recentSearchesTitle: '搜索历史',
    //           noRecentSearchesText: '没有搜索历史',
    //           saveRecentSearchButtonTitle: '保存至搜索历史',
    //           removeRecentSearchButtonTitle: '从搜索历史中移除',
    //           favoriteSearchesTitle: '收藏',
    //           removeFavoriteSearchButtonTitle: '从收藏中移除'
    //         },
    //         errorScreen: {
    //           titleText: '无法获取结果',
    //           helpText: '你可能需要检查你的网络连接'
    //         },
    //         footer: {
    //           selectText: '选择',
    //           navigateText: '切换',
    //           closeText: '关闭',
    //           searchByText: '搜索提供者'
    //         },
    //         noResultsScreen: {
    //           noResultsText: '无法找到相关结果',
    //           suggestedQueryText: '你可以尝试查询',
    //           reportMissingResultsText: '你认为该查询应该有结果？',
    //           reportMissingResultsLinkText: '点击反馈'
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
*/
