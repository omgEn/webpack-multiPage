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

  devServer: {
    // (3) 有服务器，让服务端与前端代码在一个端口
    // (2)用于前端模拟数据
    // onBeforeSetupMiddleware: function (devServer) {
    //   if (!devServer) {
    //     throw new Error('webpack-dev-server is not defined');
    //   }
    //   devServer.app.get('/api/user', function (req, res) {
    //     res.json({ custom: 'response' });
    //   });
    // },
    // (1)重写， 把请求代理到express服务器上
    // proxy: {
    //   // 配置代理
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     // 如果不希望传递/api，则需要重写路径：
    //     // pathRewrite: { '^/api': '' },
    //   },
    // },
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
    }),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: './dist' }),
    new CopyPlugin({
      patterns: [{ from: './doc', to: 'doc' }],
    }),
    // 声明版权信息
    new webpack.BannerPlugin('make 2019 by zzz'),
  ],
};
