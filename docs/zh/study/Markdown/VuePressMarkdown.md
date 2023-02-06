# VuePress Markdown扩展

## Emoji :tada:

你可以在你的Markdown内容中输入`:EMOJICODE:`来添加Emoji表情。

前往[emoji-cheat-sheet]()查看所有可用的Emoji表情和对应代码。

```
表情显示 :tada: !
```

渲染效果如下：

表情显示 :tada: !

::: tip
Emoji扩展由markdown-it-emoji()支持。
:::

## 在Markdown中使用Vue

介绍Vue在Markdown中一些基本用法。

**模板语法**

我们知道：

* Markdown中允许使用HTML。
* Vue 模板语法是和HTML兼容的。

这意味着，Markdown中允许直接使用[Vue模板语法](https://cn.vuejs.org/guide/essentials/template-syntax.html)。

```md
一加一等于： {{ 1+1 }}

<span v-for="i in 3"> span: {{ i }} </span>
```

渲染效果如下：

一加一等于： {{ 1+1 }}

<span v-for="i in 3"> span: {{ i }} </span>

**组件**

你可以在Markdown中直接使用VUe组件。

```
这是默认主题内置的`<Badge />`组件 <Badge text="演示" />
```

 渲染效果如下：

 这是默认主题内置的`<Badge />`组件 <Badge text="演示" />

::: tip
前往[VuePress内置组件](./https://v2.vuepress.vuejs.org/zh/reference/components.html)查看所有组件。

前往[VuePress默认主题 > 内置组件](https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html)查看默认主题中的所有内置组件。
:::

::: warning
**非标准的HTML标签**
非标准的HTML标签不会被Vue模板编译器识别成原生HTML标签。相反，Vue会尝试将这些标签解析为Vue组件，而显然这些组件通常是不存在的。例如：

* 以废弃的HTML标签，比如`<center>`和`<font>`等。
* [MathML标签](https://developer.mozilla.org/zh-CN/docs/Web/MathML)，它们可能会被一些markdown-it的LateX插件用到。
:::

如果你无论如何都要使用这些标签的话，可以尝试下面两种方法之一：

* 添加一个`v-pre`指令来跳过这个元素和他的子元素的编译过程。注意所有的模板语法也都会失效。
* 设置[app.config.compilerOptions.isCustomElement](https://vuejs.org/api/application.html#app-config-compileroptions)来告诉Vue模板编译器不要尝试作为组件来解析它们。
  * 对于 @bundler-webpack ，设置 [vue.compilerOptions](https://v2.vuepress.vuejs.org/zh/reference/bundler/webpack.html#vue)。
  * 对于 @bundler-vite ，设置 [vuePluginOptions.template.compilerOptions](https://v2.vuepress.vuejs.org/zh/reference/bundler/vite.html#vuepluginoptions)。