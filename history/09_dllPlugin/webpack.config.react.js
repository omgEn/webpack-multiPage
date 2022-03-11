// 先独立的把react和react-dom打包好，
// 在开发的时候引入 打包好的react，react-dom，打包好后也不会更改

// 把当前文件定义成动态链接库ddl

let path = require('path');
let webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]',
    // libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json'),
    }),
  ],
};
