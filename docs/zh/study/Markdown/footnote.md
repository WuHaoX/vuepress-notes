# 脚注

脚注使你可以添加注释和参考，而不会使文档正文混乱。当你创建脚注时，带有脚注的上标数字会出现在你添加脚注参考的位置。读者可以单击链接以跳至页面底部的脚注内容。

要创建脚注参考，请在方括号（ [^1] ）内添加插入符号和标识符。标识符可以是数字或单词，但不能包含空格或制表符。制表符仅将脚注参考与脚注本身相关联在一起，脚注按顺序编号。

在括号内使用另一个插入符号和数字添加脚注，并用冒号和文本（ [^1]:我的脚注 ）。你不必在文档末尾添加脚注。你可以将它们好在除列表，块引号和表之类的其它元素之外的任何位置。
```
这是一个简单的脚注[^1]，这是一个很长的脚注[^longnote]。

[^1]: 这是第一个脚注。

[^longnote]：这是一个非常非常非常长的脚注。
```

渲染效果如下：

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
