- -D 是开发依赖，上线时候不需要
- code runner 插件
- npm i webpack webpack-cli -D
- npx webpack 打包
  会找 bin->webpack.cmd->
  webpack->bin->webpack.js
  webpack-cli->解析 webpack.config.js
  - npx webpack --config 文件名 指定文件名打包
- code runner 插件
- npm i webpack-dev-server -D
  npx webpack-dev-server
- npm i html-webpack-plugin -D
- npm i css-loader style-loader -D
- npm i less less-loader -D
  less-loader 调用 less 进行转换
- npm i mini-css-extract-plugin -D 抽离 css 插件
- npm i postcss-loader autoprefixer -D 添加 css 前缀

* npm i uglifyjs-webpack-plugin -D 压缩 js
* npm install babel-loader @babel/core @babel/preset-env -D
  将 es6,7 转换为 es5
* npm install --save-dev @babel/plugin-proposal-decorators 识别装饰器
* npm install --save-dev @babel/plugin-transform-runtime
  识别 es7 语法 \*gen()
  - npm install --save @babel/runtime
* npm install --save @babel/polyfill
  高级语法识别，比如 Array.includes
* npm i eslint eslint-loader -D
<!-- * npm i expose-loader -D -->
* npm i jquery -D
* npm i file-loader -D
  默认在内部生成一张图片到 build 目录下，把生成的图片的名字返回回来
* npm i url-loader -D
  做一个限制，当图片小于多少 k 的时候，用 base64 转换，否则用 file-loader 产生真实的图片
  base64 不会去加载 http 请求
* npm i html-withimg-loader -D
  可解析 html 的图片

## 官网

- https://babeljs.io/
-

## webpacl 可以进行 0 配置

- webpack：打包工具->输出后的结果(js 模块)
- 打包(支持我们的 js 的模块化)

## 配置文件

webpack.config.js

- npx webpack --config 文件名
- npm run build -- --config webpack.config.js
  -- 表示参数
- webpack-dev-server 开发服务 内存中的打包

## 设置全局变量

- expose-loader 暴露到 window 上
- providePlugin 给每个人提供一个$

* 引入 cdn 不打包的方式

## webpack 打包图片

- 在 js 中创建图片引入
- 在 css 中引入 background
- <img src>

## 快捷键

- ctrl+d 依次选中
- ctrl+shift+L 选中全部

## 报错

- localhost/:1 Refused to apply style from 'http://localhost:3001/index.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
  不支持 css,需要合适的 loader 将 css 文件转换

- Module parse failed: Unexpected token (1:5)
  You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
  缺乏该个加载器

- 每次改为配置文件需要重启，内容文件会自动更新

- ERROR in ./src/index.css
  Module build failed (from ./node_modules/style-loader/dist/cjs.js):
  TypeError: this.getOptions is not a function
  at Object.loader (E:\code\demo\node_modules\style-loader\dist\index.js:19:24)
  @ ./src/index.js 5:10-32
  将 style-loader 降级到@2.0

- ValidationError: Invalid options object. Style Loader has been initialized using an options object that does not match the API schema.
  API 有变更，上官网查找

- [webpack-cli] TypeError: Invalid value used in weak set
  at WeakSet.add (<anonymous>)
  at MiniCssExtractPlugin.apply
  将 mini-css-extract-plugin 降版本

- PostCSS plugin autoprefixer requires PostCSS 8.
  PostCSS plugin postcss-discard-comments requires PostCSS 8.
  将 autoprefixer 降到 8.0 版本
  npm i postcss@8 -D

* ] Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.

- configuration.optimization should be an object.

* UglifyJs Plugin Invalid Options
  options should NOT have additional properties
  选项不应该有额外的属性

## 问题

- -D 与-S 的区别
