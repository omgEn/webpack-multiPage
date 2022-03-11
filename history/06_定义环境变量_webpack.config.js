const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
console.log(webpack,webpack.DEV);

// 1.cleanWebpackPlugin -- 清除webpack
// 2.CopyWebpackPlugin --
// 3.bannerPlugin 内置
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
  plugins: [
    // 自定义变量---定义环境变量
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production'), // 直接在index.js 中使用DEV即可
      FLAG: 'true',
      EXPORESSION: '1+1',
    }),
    // 用插件用模板生成html并自动把js文件引入进来
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: './dist' }),
    new CopyPlugin({
      patterns: [{ from: './doc', to: 'doc' }],
    }),
    // 声明版权信息
    new webpack.BannerPlugin('make 2022 by zzz'),
  ],
};
