const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js',
  },
  // 增加映射文件，帮助调试代码--即出错会定位到当前的列与行
  // 1.源码映射，会单独生成一个sourcemap文件，出错可显示行与列
  devtool: 'source-map',
  // 2.与source-map区别是:打包不会生成单独的.map文件，出错可显示行与列
  // devtool: 'eval-source-map',
  // 3.不会产生列，但是一个单独的映射条件
  // devtool: 'cheap-module-source-map',
  // 4. 不会生成文件，不会产生列
  // devtool: 'eval-cheap-module-source-map',
  output: {
    // [name] 代表home与other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
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
