// node写法
// 相对路径转换成绝对路径
let path = require('path');
// console.log(path.resolve(__dirname,'build'),path.join(__dirname,'build'))
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 将css文件抽离出来，支持按需加载
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 最小化压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
// 这里不需要安装也能识别class
// npm install --save-dev @babel/plugin-proposal-class-properties

// 插入到head的first child
const insertAtTop = function (element) {
  var parent = document.querySelector('head');
  // eslint-disable-next-line no-underscore-dangle
  var lastInsertedElement = window._lastElementInsertedByStyleLoader;

  if (!lastInsertedElement) {
    parent.insertBefore(element, parent.firstChild);
  } else if (lastInsertedElement.nextSibling) {
    parent.insertBefore(element, lastInsertedElement.nextSibling);
  } else {
    parent.appendChild(element);
  }

  // eslint-disable-next-line no-underscore-dangle
  window._lastElementInsertedByStyleLoader = element;
};

module.exports = {
  // 优化项
  optimization: {
    minimizer: [
      // options should NOT have additional properties???
      // new UglifyJsPlugin({ cache: true, paraller: true, sourceMap: true }),
      new UglifyJsPlugin(),
      new OptimizeCssAssetsPlugin(),
    ],
  },

  // production development
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    // 必须是绝对路径   __dirname:表示当前目录
    path: path.resolve(__dirname, 'public'),
    // 入口分块(entry chunk)」的文件名模板
    // 公共路径，请求会自动加上前缀
    // publicPath: 'https://www.npmjs.com/',
  },
  // 开发服务器的配置
  devServer: {
    port: 3001,
    // progress: true,
    // contentBase: path.join(__dirname, 'public'),
    // 自动打开
    // open: true,
    // 会 gzip(压缩) public目录下
    compress: true,
  },
  // []:放置所有的webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // 压缩
      minify: {
        // 删除引号
        removeAttributeQuotes: true,
        // 压缩成一行
        // collapseWhitespace: true
      },
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    // 配置全局变量
    new webpack.ProvidePlugin({
      // 在每个模块中都注入$
      $: 'jquery',
    }),
  ],
  externals: {
    jquery: '$',
  },
  // 模块
  module: {
    // 规则
    rules: [
      // 搭配expose-loader使用
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$!jquery',
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       // 因为loader默认是从右到左执行，从下到上执行
      //       // 这行代码让先加载它
      //       enforce: 'pre' // previous,
      //       // pre 前面执行的loader，normal 普通loader，内敛loader 后置
      //     }
      //   }
      // },

      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 200 * 1024,
            outputPath: 'img/',
            publichPath: 'img/',
            esModule: false,
            // 图片加前缀
            // publicPath: '',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            // 需要es6转换成es5
            presets: ['@babel/preset-env'],
            plugins: [
              // 属性装饰器
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties'],
              ['@babel/plugin-transform-runtime'],
            ],
          },
        },
      },
      // loader的特点：功能单一
      // loader是有顺序的，默认从右向左执行,从下到上执行
      // loader可写成对象形式||数组形式,

      // css-laoder: 处理css文件,支持import语法
      // style-loader 是把css插入到head的标签中
      {
        test: /.css$/,
        use: [
          // 插入到header头部
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insert: function insertAtTop (element) {
          //       var parent = document.querySelector('head')
          //       // eslint-disable-next-line no-underscore-dangle
          //       var lastInsertedElement =
          //         window._lastElementInsertedByStyleLoader

          //       if (!lastInsertedElement) {
          //         parent.insertBefore(element, parent.firstChild)
          //       } else if (lastInsertedElement.nextSibling) {
          //         parent.insertBefore(element, lastInsertedElement.nextSibling)
          //       } else {
          //         parent.appendChild(element)
          //       }

          //       // eslint-disable-next-line no-underscore-dangle
          //       window._lastElementInsertedByStyleLoader = element
          //     }
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader', // @import语法，解析路径
          'postcss-loader',
        ],
      },
      // less-loader
      {
        test: /.less$/,
        use: [
          // {
          //   loader: 'style-loader' //标签插入到dom中
          // },
          MiniCssExtractPlugin.loader,
          'css-loader', // @import语法，解析路径
          'postcss-loader',
          'less-loader', // 将less->css
        ],
      },
    ],
  },
};