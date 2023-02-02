import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta.js'

export const navbarZh: NavbarConfig = [
  {
    text: '指南',
    link: '/zh/guide/',
  },
  {
    text: '前端学习',
    children: [
      {
        text: '学习之路',
        children: [
          '/zh/study/explain.md'
        ],
      },
      {
        text: 'MarkDown',
        children: [
          '/zh/study/MarkDown/basic.md',
          '/zh/study/MarkDown/MarkdownExtend.md'
        ],
      },
      {
        text: 'JavaScript',
        children: [
          '/zh/study/JavaScript/explain.md'
        ],
      }
    ],
  },
  {
    text: '后端学习',
    children: [
      {
        text: '学习之路',
        children: [
          '/zh/backEndStudy/explain.md'
        ],
      },
      {
        text: '中间件',
        children: [
          '/zh/backEndStudy/middleware/kafka.md',
        ],
      },
    ],
  },
  {
    text: '工作记录',
    children: [
      {
        text: '日常问题',
        children: [
          '/zh/work/explain.md'
        ],
      }
    ]
  },
  {
    text: '参考',
    children: [
      {
        text: 'VuePress',
        children: [
          '/zh/reference/cli.md',
          '/zh/reference/config.md',
          '/zh/reference/frontmatter.md',
          '/zh/reference/components.md',
          '/zh/reference/plugin-api.md',
          '/zh/reference/theme-api.md',
          '/zh/reference/client-api.md',
          '/zh/reference/node-api.md',
        ],
      },
      {
        text: '打包工具',
        children: [
          '/zh/reference/bundler/vite.md',
          '/zh/reference/bundler/webpack.md',
        ],
      },
      {
        text: '默认主题',
        children: [
          '/zh/reference/default-theme/config.md',
          '/zh/reference/default-theme/frontmatter.md',
          '/zh/reference/default-theme/components.md',
          '/zh/reference/default-theme/markdown.md',
          '/zh/reference/default-theme/styles.md',
          '/zh/reference/default-theme/extending.md',
        ],
      },
    ],
  },
  {
    text: '工具',
    link: '/zh/util/',
  },
  {
    text: `更新日志`,
    link:'zh/advanced/cookbook/',
  },
]
