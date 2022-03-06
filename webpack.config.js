let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    other: './src/other.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    open: true,
  },
  // 旧版本是用 splitChunks
  optimization: {
    // 分割代码块---只有多页应用需要，单页应用不需要
    splitChunks: {
      // 缓存组
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
        // 抽离
        vendor: {
          // 优先级
          // priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  module: {
    // 不需要去解析jquery中的依赖关系
    // 若知道这个包没有依赖项，就可不去解析
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    // moment的语言包不被引入，减小包的面积
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
