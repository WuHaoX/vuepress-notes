# Markdown扩展
John Gruber的原始设计文档中概述的[基本语法](./basic.md)主要是为了应对大多数情况下的日常所需元素，但对于某些人来说还不够，这就是扩展语法的用武之地。

一些个人和组织开始通过添加其它元素（例如表，代码块，语法突出显示，URL自动链接和脚注）来扩展基本语法。可以通过使用基于基本Markdown语法的轻量级标记语言，或通过向兼容的Markdown处理器添加扩展来启用这些元素。

## 扩展语法可用性
并非所有的Markdown应用都支持扩展语法元素。你需要检查你的应用程序所使用的轻量级标记语言是否支持你要使用的扩展语法元素。如果没有，那么仍然有可能在Markdown处理器中添加扩展。

## 轻量标记语言
有几种轻量级标记语言是Markdown的超集。他们包含Gruber写的Markdown基本语法，并通过添加其它元素（例如表，代码块，语法突出显示，URL自动链接和脚注）在此基础上构建。许多最受欢迎的Markdown应用程序使用以下轻量级标记语言之一：

- [markdown-it](https://github.com/markdown-it/markdown-it)

- [CommonMark](https://commonmark.org/)

- [GitHub Flavored Markdown(GFM)](https://github.github.com/gfm/)

- [Markdown Extra](https://michelf.ca/projects/php-markdown/extra/)

- [MultiMarkdown](https://fletcherpenney.net/multimarkdown/)

- [R Markdown](https://rmarkdown.rstudio.com/)

VuePress会使用[markdown-it](https://github.com/markdown-it/markdown-it)来解析Markdown内容，因此可以借助于markdown-it插件来实现[语法扩展](./vueMarkdown.md)。

[markdown-it](https://github.com/markdown-it/markdown-it)遵循[CommonMark](https://spec.commonmark.org/)规范添加语法扩展，你也可以添加新规则，或则替换现有的规则。

## Markdown处理器
有许多[Markdown处理器](https://github.com/markdown/markdown.github.com/wiki/Implementations)可用。它们中的许多允许你扩展语法元素。查看你所使用处理器的文档以获取更多信息。