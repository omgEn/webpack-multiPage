const { SyncHook } = require('tapable')
let {} = require('tapable')

class Lesson {
  constructor(){
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  // 注册监听函数
  tap(){
    this.hooks.arch.tap('node',function(name){
      console.log('node,',name);
    });
    this.hooks.arch.tap('react',function(name){
      console.log('react,',name);
    })
  }
  start(){
    this.hooks.arch.call('33')
  }
}

let l = new Lesson()
l.tap()
l.start()