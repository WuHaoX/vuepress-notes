# 图片语法
要添加图像，请使用感叹号（ ！ ），然后在方括号增加替代文本，图片链接放在圆括号里，括号里的链接后可以增加一个可选的图片标题文本。

插入图片Markdown语法代码： `![图片alt](图片链接 "图片title")`。

对应的HTML代码：`<img src="图片链接" alt="图片alt" title="图片title">`

```
![图片加载中](../../../../docs/.vuepress/public/images/hero.png)
```

渲染效果如下：

![图片加载中](../../../../docs/.vuepress/public/images/hero.png)

## 链接图片

给图片增加链接，请将图像的Markdown括在方括号中，然后将链接添加在圆括号中。

```
[![沙漠中的岩石图片](/assets/img/shiprock.jpg "Shiprock")](https://markdown.com.cn)
```

渲染效果如下：

[![图片加载中](../../../../docs/.vuepress/public/images/hero.png "Shiprock")](https://markdown.com.cn)