const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js',
  },
  devServer: {
    port: 3000,
    open: true,
  },
  // 增加映射文件，帮助调试代码--即出错会定位到当前的列与行
  // 1.源码映射，打包会生成一个.map 文件，出错可显示行与列
  // devtool: 'source-map', 
  // 打包不会生成单独的.map文件，出错可显示行与列
  // devtool: 'eval-source-map', 
  // 3.打包会生成.map文件，但出错不会显示行列
  // devtool: 'cheap-module-source-map',
  // 4. 不会生成文件，出错会显示产生行列
  // devtool: 'eval-cheap-module-source-map',
  output: {
    // [name] 代表home与other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  performance: {
    hints: false,
    maxEntrypointSize: 400000
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
      template: './public/index.html',
      filename: 'index.html',
      // 引入各自的js文件，若不加则会把js文件都引入
      chunks: ['home'],
    }),
  ],
};
