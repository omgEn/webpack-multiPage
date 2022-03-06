const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// 1.cleanWebpackPlugin -- 清除webpack
// 2.CopyWebpackPlugin --
// 3.bannerPlugin 内置
module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js',
  },
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
      filename: 'other.html',
    }),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: './dist' }),
    new CopyPlugin({
      patterns: [{ from: './doc', to: 'doc' }],
    }),
    // 声明版权信息
    new webpack.BannerPlugin('make 2019 by zzz'),
  ],
};
