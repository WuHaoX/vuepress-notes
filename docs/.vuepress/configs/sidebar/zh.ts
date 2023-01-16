import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/guide/': [
    {
      text: '指南',
      children: [
        '/zh/guide/README.md',
        '/zh/guide/getting-started.md',
        '/zh/guide/configuration.md',
        '/zh/guide/page.md',
        '/zh/guide/markdown.md',
        '/zh/guide/assets.md',
        '/zh/guide/i18n.md',
        '/zh/guide/deployment.md',
        '/zh/guide/theme.md',
        '/zh/guide/plugin.md',
        '/zh/guide/bundler.md',
        '/zh/guide/migration.md',
      ],
    },
  ],
  '/zh/util/': [
    {
      text: '工具',
      children: [
        '/zh/util/README.md',
        '/zh/util/Coding.md',
        '/zh/util/nvm.md',
      ],
    },
  ],
  '/zh/advanced/': [
    {
      text: '深入',
      children: [
        '/zh/advanced/architecture.md',
        '/zh/advanced/plugin.md',
        '/zh/advanced/theme.md',
      ],
    },
    {
      text: 'Cookbook',
      children: [
        '/zh/advanced/cookbook/README.md',
        '/zh/advanced/cookbook/usage-of-client-config.md',
        '/zh/advanced/cookbook/adding-extra-pages.md',
        '/zh/advanced/cookbook/making-a-theme-extendable.md',
        '/zh/advanced/cookbook/passing-data-to-client-code.md',
        '/zh/advanced/cookbook/markdown-and-vue-sfc.md',
      ],
    },
  ],
  '/zh/study/': [
    {
      text: '路线介绍',
      collapsible: true,
      children: [
        '/zh/study/explain.md'
      ],
    },
    {
      text: 'MarkDown语法',
      collapsible: true,
      children: [
        '/zh/study/MarkDown/basic.md',
        '/zh/study/MarkDown/title.md',
        '/zh/study/MarkDown/paragraph.md',
        '/zh/study/MarkDown/lineFeed.md',
        '/zh/study/MarkDown/emphasize.md',
        '/zh/study/MarkDown/reference.md',
        '/zh/study/MarkDown/list.md',
        '/zh/study/MarkDown/code.md',
        '/zh/study/MarkDown/lineBetween.md',
        '/zh/study/MarkDown/link.md',
        '/zh/study/MarkDown/image.md',
        '/zh/study/MarkDown/ESC.md',
        '/zh/study/MarkDown/HTML.md',
        '/zh/study/MarkDown/MarkdownExtend.md',
        '/zh/study/MarkDown/table.md',
        '/zh/study/MarkDown/includeCode.md',
        '/zh/study/MarkDown/footnote.md',
        '/zh/study/MarkDown/titleNumber.md',
        '/zh/study/MarkDown/DeleteLine.md',
        '/zh/study/MarkDown/VuePressMarkdown.md',
      ]
    },
    {
      text: 'JavaScript',
      collapsible: true,
      children: [
        '/zh/study/JavaScript/explain.md',
      ]
    }
  ],
  '/zh/reference/': [
    {
      text: 'VuePress 参考',
      collapsible: true,
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
      text: '打包工具参考',
      collapsible: true,
      children: [
        '/zh/reference/bundler/vite.md',
        '/zh/reference/bundler/webpack.md',
      ],
    },
    {
      text: '默认主题参考',
      collapsible: true,
      children: [
        '/zh/reference/default-theme/config.md',
        '/zh/reference/default-theme/frontmatter.md',
        '/zh/reference/default-theme/components.md',
        '/zh/reference/default-theme/markdown.md',
        '/zh/reference/default-theme/styles.md',
        '/zh/reference/default-theme/extending.md',
      ],
    },
    {
      text: '官方插件参考',
      collapsible: true,
      children: [
        {
          text: '常用功能',
          children: [
            '/zh/reference/plugin/back-to-top.md',
            '/zh/reference/plugin/container.md',
            '/zh/reference/plugin/external-link-icon.md',
            '/zh/reference/plugin/google-analytics.md',
            '/zh/reference/plugin/medium-zoom.md',
            '/zh/reference/plugin/nprogress.md',
            '/zh/reference/plugin/register-components.md',
          ],
        },
        {
          text: '内容搜索',
          children: [
            '/zh/reference/plugin/docsearch.md',
            '/zh/reference/plugin/search.md',
          ],
        },
        {
          text: 'PWA',
          children: [
            '/zh/reference/plugin/pwa.md',
            '/zh/reference/plugin/pwa-popup.md',
          ],
        },
        {
          text: '语法高亮',
          children: [
            '/zh/reference/plugin/prismjs.md',
            '/zh/reference/plugin/shiki.md',
          ],
        },
        {
          text: '主题开发',
          children: [
            '/zh/reference/plugin/active-header-links.md',
            '/zh/reference/plugin/git.md',
            '/zh/reference/plugin/palette.md',
            '/zh/reference/plugin/theme-data.md',
            '/zh/reference/plugin/toc.md',
          ],
        },
      ],
    },
  ],
}
