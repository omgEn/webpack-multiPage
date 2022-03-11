let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

// happypack 实现多线程打包
let Happypack = require('happypack');

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
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: 'Happypack/loader?id=js',
      },
      {
        test: /\.css$/,
        use: 'Happypack/loader?id=css',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Happypack({
      id: 'css',
      use: ['style-loader', 'css-loader'],
    }),
    new Happypack({
      id: 'js',
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      ],
    }),
    // moment的语言包不被引入，减小包的面积
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
