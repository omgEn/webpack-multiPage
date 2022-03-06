// 生产环境
let { merge } = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [],
  },
  plugins: [],
});
