const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 1.cleanWebpackPlugin -- 清除webpack
// 2.copyWebpackPlugin --
// 3.bannerPlugin 内置
module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  output: {
    // [name] 代表home与other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 热更新
  watch: true,
  // 监控的选项
  watchOptions: {
    // 每秒问1000次
    poll: 1000,
    // 防抖，输入代码，500ms停止以后监控
    aggregateTimeout: 500,
    // 不需要监控
    ignored: /node_modules/,
  },
  plugins: [
    // 用插件用模板生成html并自动把js文件引入进来
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      // 引入各自的js文件，若不加则会把js文件都引入
      chunks: ['home'],
    }),
  ],
};
