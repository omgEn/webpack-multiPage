// webpack自带express
const express = require('express');
const app = express();
const webpack = require('webpack');
// 中间件
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);
app.use(middleware(compiler));

// 1.使用express

app.get('/api/user', function (req, res) {
  // res.send('Hello World');
  res.json({ name: 'test1' });
  // res.send({ name: 'test3' });
});

// 2.使用middleware

app.listen(3000);

//
