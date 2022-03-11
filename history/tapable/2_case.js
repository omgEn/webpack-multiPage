// 钩子是同步的
class SyncHook {
  tasks = []
  constructor(args){
    // args=>['name']
  }
  tap(name,task){
    this.tasks.push(task)
  }
  call(...args){
    // 当前函数的返回值
    let ret;
    // 当前要先执行的第一个
    let index = 0;
    do{
      ret = this.tasks[index++](...args)
    }while(ret===undefined&&index<this.tasks.length){
    
    }

  }
}

let hook = new SyncHook()
hook.tap('react',function(name){
  console.log('react',name);
  return '停止向下执行'
})
hook.tap('node',function(name){
  console.log('node',name);
})
hook.call('33')