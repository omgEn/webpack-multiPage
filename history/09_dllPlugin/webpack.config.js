let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3000,
    open: true,
  },
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
    // html中引入react 可以写死
    // 引用react插件
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json'),
    }),
    // 将_dll_react.js文件自动引入到html中，
    // 若直接在html中引入 _dll_react.js，会提示文件不存在
    // 可引入多个文件包
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist', '_dll_react.js'),
    }),
    // moment的语言包不被引入，减小包的面积
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
