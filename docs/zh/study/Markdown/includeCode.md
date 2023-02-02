# 围栏代码块

Markdown基本语法允许你通过将行缩进四个空格或一个制表符来创建[代码块](./code.md)。如果发现不方便，请尝试使用受保护的代码块。根据Markdown处理器或编辑器的不同，你将在代码块之前和之后的行上使用三个反引号（```）或三个波浪号（~~~）。

```
{
    "性"："Wu",
    "名"："Hao",
    "age"：18,
}
```

渲染效果如下：

```
{
    "性"："Wu",
    "名"："Hao",
    "age"：18,
}
```
PS:在围栏代码块中使用反引号（ ` ）？请参考[转义字符语法](./ESC.md)。

## 语法高亮

许多Markdown处理器都支持围栏代码块的语法突出显示。使用此功能，可以为编写代码的任何语言添加颜色突出显示。要添加语法突出显示，请在代码块之前的反引号傍边添加一种指定语言。

```md
{
 "性"："Wu",
 "名"："HaoX",
 "age"：18,
}
```

渲染效果如下：

```json
{
 "性"："Wu",
 "名"："HaoX",
 "age"：18,
}
```

## 行高亮

你可以在代码块添加行数范围标记，来为对应代码行进行高亮显示：

```md
    ```json{2,4}
    {
    "性"："Wu",
    "名"："HaoX",
    "age"：18,
    }
    ```
```

渲染效果如下：

```json{2,4}
{
"性"："Wu",
"名"："HaoX",
"age"：18,
}
```

行数范围标记的例子：

* 行数范围： `{5-8}`
* 多个单行： `{5,7,9}`
* 组合： `4,7-11,13,15-30`

PS:
行高亮扩展是由我们内置插件支持的，在该扩展Fork并修改自[markdown-it-highlight-lines](https://github.com/egoist/markdown-it-highlight-lines)。

## 行号

你肯定已经注意到代码块的最左侧会展示行号。这个功能是默认启用的，你可以通过配置来禁用他。

你可以在代码块添加`:line-numbers`/`:no-line-numbers`标记来覆盖配置项目中的设置。

```md
    ```js
    // 行号默认是启用的
    const line1 = 'this is line 1'
    const line2 = 'this is line 2'
    ```

    ```js:no-line-numbers
    // 行号默认是启用的
    const line1 = 'this is line 1'
    const line2 = 'this is line 2'
    ```
```

渲染效果如下：

```js
// 行号默认是启用的
const line1 = 'this is line 1'
const line2 = 'this is line 2'
```

```js:no-line-numbers
// 行号默认是启用的
const line1 = 'this is line 1'
const line2 = 'this is line 2'
```

PS:
行号扩展由VuePress的内置插件支持。

配置参考：[markdown.code.lineNumbers](https://v2.vuepress.vuejs.org/zh/reference/config.html#markdown-code)

## 添加v-pre

由于[模板语法可以在Markdown中使用]()，它也同样在代码块中生效。

为了避免你的代码块被Vue编译，VuePress默认会在你的代码块添加`v-pre`指令。这一默认行为可以在配置中关闭。

你可以在代码块添加`:v-pre`/`:no-v-pre`标记来覆盖配置项中的设置。

PS:
模板语法的字符有可能会被语法高亮器解析，比如”Mustache“语法（双花括号）。因此就像下面的例子一样，在某些语言中`:no-v-pre`可能并不能生效。

如果你无论如何都想在这种语言中使用Vue语法，你可以尝试禁用默认的语法高亮，然后在客户端实现你的自定义代码高亮。

v-pre：跳过该元素及其所有子元素的编译。
示例：

```template
<span v-pre>{{ 这里不会被编译 }}</span>
```

```md
    ```md
    <!-- 默认情况下，这里会被保持原样 -->>
    1 + 2 + 3 = {{ 1 + 2 + 3 }}
    ```

    ```md:no-v-pre
    <!-- 这里会被Vue编译 -->>
    1 + 2 + 3 = {{ 1 + 2 + 3 }}
    ```

    ```js:no-v-pre
    <!-- 由于JS代码高亮，这里不会被正确编译 -->>
    const result = {{ 1 + 2 + 3 }}
    ```
```

渲染效果如下：

```md
<!-- 默认情况下，这里会被保持原样 -->>
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- 这里会被Vue编译 -->>
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```js:no-v-pre
<!-- 由于JS代码高亮，这里不会被正确编译 -->>
const result = {{ 1 + 2 + 3 }}
```

PS:
v-pre扩展是由VurPress的内置[markdown.code.vPre.block](https://v2.vuepress.vuejs.org/zh/reference/config.html#markdown-code)插件支持的。

## 导入代码块

你可以使用以下语法，从文件中导入代码块：

```md
<!-- 最简单的语法 -->>
@[code](./includeCode.md)
```

如果你只想导入这个文件的一部分：

```md
<!-- 仅导入第1行至第10行 -->>
@[code{1-10}](./includeCode.md)
```

实际上，`[]`内的第二部分会被作为代码块标记来处理，因此在上面[行高亮](./includeCode.md#行高亮)语法以下的语法在这里都可以支持的：

```md
<!-- 行高亮 -->
@[code md{1-3,10}](./includeCode.md)
```

下面是一个复杂的例子：

* 导入`../includeCode.md`文件中的第3行至第10行
* 指定语言为`md`
* 对导入代码的第5行进行高亮，即`./includeCode.md`文件的第5行
* 禁用行号

```md
@[code{3-10} md{3}:no-line-number](./includeCode.md)
```

PS
1. `@[code]`中的code不能更改为其它单词。
2. 需要注意的是，路径别名在导入代码语法中不会生效。你可以通过下面的配置来自行处理路径别名：

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@src/, path.resolve(__dirname, 'path/to/src')),
    },
  },
}
```

```md
<!-- 会被解析至 'path/to/src/foo.js' -->
@[code](@src/foo.js)
```

PS:
导入代码扩展是由VuesPress内置[markdown.importCode](https://v2.vuepress.vuejs.org/zh/reference/config.html#markdown-title)插件支持的。