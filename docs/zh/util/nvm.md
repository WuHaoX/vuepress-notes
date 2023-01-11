# nvm
nvm全英文：node.js version management,是一个node.js的版本管理工具。由于工作中接触到的项目node.js各个版本会存在不兼容的情况。（例如：node.js 16与node-sass 4.14就会冲突）因此可以通过nvm安装和切换不同的node.js。

解决上诉问题方案：在[npm](https://www.npmjs.com/package/node-sass)中查看node版本与node-sass兼容版本。按住win+R按钮输入cmd回车，打开命令行工具。输入nvm list查看已有node版本，根据查询到的兼容版本下载对应的node版本。利用nvm下载对应版本后，再次利用nvm list查看已有版本，此时已经可以发现新的版本出现了。退出命令行工具，用管理员身份启动命令行工具输入nvm use 对应的版本号，切换到兼容的node环境。

## 下载nvm
可在[github](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating)上查看nvm源码。

下载[nvm-1.1.10-windows](https://github.com/coreybutler/nvm-windows/releases/tag/1.1.10)版本