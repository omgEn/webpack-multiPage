#! /user/bin/env node 
// 以上提示需要使用node环境来执行

let path = require('path')

// config 配置文件
let config = require(path.resolve(__dirname))

let Compiler = require('../lib/Compiler.js')
let compiler = new Compiler(config)

// 标识运行编译
compiler.run()