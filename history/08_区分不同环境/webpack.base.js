// 公共的

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    // [name] 代表home与other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  // 解析第三方包 common
  resolve: {
    modules: [path.resolve('node_modules')],
    // 拓展后缀名
    extensions: ['.js', '.css', '.json'],
  },
  plugins: [
    // 自定义变量---定义环境变量
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production'),
      FLAG: 'true',
      EXPORESSION: '1+1',
    }),
    // 用插件用模板生成html并自动把js文件引入进来
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: './dist' }),

    // 声明版权信息
    new webpack.BannerPlugin('make 2019 by zzz'),
  ],
};
