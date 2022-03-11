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
    this.tasks.forEach((task) => task(...args));
  }
}

let hook = new SyncHook()
hook.tap('react',function(name){
  console.log('react',name);
})
hook.tap('node',function(name){
  console.log('node',name);
})
hook.call('33')