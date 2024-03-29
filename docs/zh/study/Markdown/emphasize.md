# 强调语法
将文本设置为粗体或者斜体来强调此处文本的重要性。
## 粗体
要加粗文本，请在需要加粗的文本前后添加两个星号（ ** ）或下划线（ __ ）。
|   Markdown语法   |                   HTML                   | 预览效果                      |
|:----------------:|:----------------------------------------:|-------------------------------|
| 被\*\*加粗\*\*的文本 | 被&lt;strong&gt;加粗&lt;/strong&gt;的文本 | 被<strong>加粗</strong>的文本 |
| 被 \_\_加粗\_\_ 的文本 | 被&lt;strong&gt;加粗&lt;/strong&gt;的文本 | 被<strong>加粗</strong>的文本 |
## 加粗需要注意的地方
Markdown应用程序在如何处理文章中间的下划线并不一致。上面两种加粗方式有细微的差距，**如果是只斜体文本内的某个部分请使用一个星号（ \*\*），中间不要带空格。笔者推荐使用（ ** ）来加粗文字**
| :heavy_check_mark:正确的做法 |  :x:错误的做法 |
|:----------------------------:|:--------------:|
| 被 \_\_加粗\_\_ 文本             | 被__加粗__文本 |
## 斜体
要用斜体显示文本，请在需要使用斜体的文本前后添加一个星号（ * ）或下划线（ _ ）。
|   Markdown语法   |                   HTML                   | 预览效果                      |
|:----------------:|:----------------------------------------:|-------------------------------|
| 需要\*斜体\*的文本 | 需要&lt;em&gt;斜体&lt;/em&gt;的文本 | 需要<em>斜体</em>的文本 |
| 需要 \_斜体\_ 的文本 | 需要&lt;em&gt;斜体&lt;/em&gt;的文本 | 需要<em>斜体</em>的文本 |
## 斜体需要注意的地方
Markdown应用程序在如何处理文章中间的下划线并不一致。上面两种斜体方式有细微的差距，**如果是只斜体文本内的某个部分请使用一个星号（ \* ），中间不要带空格。笔者推荐使用（ * ）来加粗文字**
| :heavy_check_mark:正确的做法 |  :x:错误的做法 |
|:---------------------------:|:-------------:|
| 需要 \_斜体\_ 文本             | 需要_斜体_文本 |
## 粗体和斜体
当文本需要同时使用到加粗和斜体时，请在文本的前后各添加三个星号（ \*\*\* ）或下划线（ ___ ）。**如果是只加粗和斜体文本内的某个部分请使用三个星号（ \*\*\* ），中间不要带空格。**
|           Markdown语法           |                                 HTML                                 | 预览效果                                     |
|:--------------------------------:|:--------------------------------------------------------------------:|----------------------------------------------|
|  被\*\*\*加粗和斜体\*\*\*的文本  | 被&lt;strong&gt;&lt;em&gt;加粗和斜体&lt;/em&gt;&lt;/strong&gt;的文本 | 被<strong><em>加粗和斜体</em></strong>的文本 |
| 被 \_\_\_加粗和斜体\_\_\_ 的文本 | 被&lt;strong&gt;&lt;em&gt;加粗和斜体&lt;/em&gt;&lt;/strong&gt;的文本 | 被<strong><em>加粗和斜体</em></strong>的文本 |
|  被\*\*\_加粗和斜体\*\*\_的文本  | 被&lt;strong&gt;&lt;em&gt;加粗和斜体&lt;/em&gt;&lt;/strong&gt;的文本 | 被<strong><em>加粗和斜体</em></strong>的文本 |
| 被 \_\_\*加粗和斜体\_\_\* 的文本 | 被&lt;strong&gt;&lt;em&gt;加粗和斜体&lt;/em&gt;&lt;/strong&gt;的文本 | 被<strong><em>加粗和斜体</em></strong>的文本 |