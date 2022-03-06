const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // 多入口
  entry: {
    home: './src/index.js',
    other: './src/other.js',
  },
  output: {
    // [name] 代表home与other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
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
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['home', 'other'],
    }),
  ],
};
