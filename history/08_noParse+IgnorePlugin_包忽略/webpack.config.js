let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    // 不需要去解析jquery中的依赖关系
    // 若知道这个包没有依赖项，就可不去解析
    // 快了300ms
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        // 快了2000ms
        exclude: /node_modules/,
        include: path.resolve('src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // moment的语言包不被引入，减小包的面积
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
