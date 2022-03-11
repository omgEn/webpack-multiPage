let fs = require('fs')
let path = require('path')

class Compiler{
  constructor(config){
    this.config = config
    // 保存入口文件的路径
    this.entryId;
    // 保存所有的模块依赖
    this.modules = {}

    // 入口路径
    this.entry = config.entry
    // 工作路径
    this.root = process.cwd()
  }

  // 获取模块内容
  getSource(){
    let content = fs.readFileSync(modulePath,'utf8')
    return content
  }

  // 构建模块
  buildModule(modulePath,isEntry){
    let source = this.getSource()

    let moduleName = './'+path.relative(this.root,modulePath);
    console.log(source,moduleName);
  }

  // 发射文件
  emitFile(){

  }
  run(){
    // 创建模块的依赖关系
    this.buildModule(path.resolve(this.root,this.entry),true)

    // 发射一个文件，打包后的文件
    this.emitFile()
  }
}

export default Compiler