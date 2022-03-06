###

```js
npm init
npm i webpack webpack-cli -D
// 用插件用模板生成html并自动把js文件引入进来
npm i html-webpack-plugin -D
npm i @babel/core @babel/preset-env babel-loader webpack-dev-server -D
npm i clean-webpack-plugin -D
npm i copy-webpack-plugin@6 -D
npm i webpack-dev-middleware -D
npm i css-loader@3 style-loader@2 -D
npm i bootstrap
npm i webpack-merge -D
npm i happypack

npm run build -- --config webpack.dev.js
npm run build -- --config webpack.prod.js
npx webpack --config webpack.base.js
"build": "webpack --config webpack.config.js",

npm add webpack@4 webpack-cli html-webpack-plugin @babel/core babel-loader @babel/preset-env @babel/preset-react -D

npm i react react-dom


npx webpack // 直接打包命令
```

安装 code run 插件
// tree-shaking 把没用到的代码 自动删除掉
