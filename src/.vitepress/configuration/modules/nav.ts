import { DefaultTheme } from 'vitepress'
import { generateNav } from '../../utils'

export const nav: DefaultTheme.NavItem[] = generateNav()

/*[
  {
    text: '👑 首页',
    link: '/',
  },
  {
    text: '💻 Web开发',
    items: [
      {
        text: '基础三件套', // 最大不超过三层嵌套, 第三层items必须是有link的链接项了
        items: [
          {
            text: '📄 HTML',
            link: '/web/基础三件套/html/',
          },
          {
            text: '🎨 CSS',
            link: '/web/基础三件套/css/',
          },
          {
            text: '💻 JavaScript',
            link: '/web/基础三件套/javascript/',
          },
        ],
      },
      {
        text: '前端框架',
        items: [
          {
            text: `<span class="icon"><img src="/icons/vue.png"/>Vue</span>`,
            link: '/web/前端框架/vue/',
          },
          {
            text: '<span class="icon"><img src="/icons/react.png"/>React</span>',
            link: '/web/前端框架/react/',
          },
        ],
      },
      {
        text: '后端框架',
        items: [
          {
            text: '<span class="icon"><img src="/icons/nestjs.png"/>Nestjs</span>',
            link: '/web/后端框架/nestjs/',
          },
          {
            text: '<span class="icon"><img src="/icons/nuxtjs.png"/>Nuxtjs</span>',
            link: '/web/后端框架/nuxt/',
          },
          {
            text: '<span class="icon"><img src="/icons/koa.png"/>Koa</span>',
            link: '/web/后端框架/koa/',
          },
          {
            text: '<span class="icon"><img src="/icons/express.png"/>Express</span>',
            link: '/web/后端框架/express/',
          },
        ],
      },
      {
        text: '数据库',
        items: [
          {
            text: '<span class="icon"><img src="/icons/mysql.png"/>MySQL</span>',
            link: '/web/数据库/mysql/',
          },
          {
            text: '<span class="icon"><img src="/icons/redis.png"/>Redis</span>',
            link: '/web/数据库/redis/',
          },
        ],
      },
    ],
  },
  {
    text: '⚙️ 运维',
    items: [
      {
        text: '服务器',
        items: [
          {
            text: '<span class="icon"><img src="/icons/centos.png"/>CentOS</span>',
            link: '/运维/服务器/centos/',
          },
        ],
      },
      {
        text: '工具',
        items: [
          {
            text: '<span class="icon"><img src="/icons/docker.png"/>Docker</span>',
            link: '/运维/工具/docker/',
          },
          {
            text: '<span class="icon"><img src="/icons/nginx.png"/>Nginx</span>',
            link: '/运维/工具/nginx/',
          },
        ],
      },
    ],
  },
  {
    text: '前沿领域',
    items: [
      {
        text: 'AI',
        items: [
          {
            text: '<span class="icon"><img src="/icons/openai.png"/>开源大模型</span>',
            link: '/前沿领域/AI/开源大模型/',
          },
        ],
      },
    ],
  },
  {
    text: '🔍 资源',
    items: [
      {
        text: '实用工具',
        items: [
          {
            text: '📖 快速文档查阅',
            link: '/资源/实用工具/快速文档查阅/',
          },
        ],
      },
    ],
  },
]*/
