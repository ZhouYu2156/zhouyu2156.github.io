import { DefaultTheme } from 'vitepress'
import { generateSidebar } from '../../utils'

export const sidebar: DefaultTheme.Sidebar = {
  ...generateSidebar(),
  '/写作/诗词作品/': [
    {
      text: '我的作品',
      items: [
        {
          text: '世经',
          link: '/写作/诗词作品/世经',
        },
        {
          text: '濂湘文言大全',
          link: '/写作/诗词作品/濂湘文言大全',
        },
        {
          text: '濂湘诗词集',
          link: '/写作/诗词作品/濂湘诗词集',
        },
      ],
    },
  ],
}

/*{
  '/web/基础三件套/': [
    {
      text: 'HTML',
      collapsed: true,
      items: [
        {
          text: 'HTML基础',
          link: '/web/基础三件套/html/',
        },
        {
          text: 'HTML进阶',
          link: '/web/基础三件套/html/advanced.md',
        },
      ],
    },
    {
      text: 'CSS',
      collapsed: true,
      items: [
        {
          text: 'CSS基础',
          link: '/web/基础三件套/css/',
        },
        {
          text: 'CSS进阶',
          link: '/web/基础三件套/css/advanced.md',
        },
      ],
    },
    {
      text: 'JavaScript',
      collapsed: true,
      items: [
        {
          text: 'JavaScript基础',
          link: '/web/基础三件套/javascript/',
        },
        {
          text: 'JavaScript进阶',
          link: '/web/基础三件套/javascript/advanced.md',
        },
      ],
    },
  ],
}*/
