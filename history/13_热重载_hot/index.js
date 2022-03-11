// 热重载需要在webpack.config.js 的devServer配置hot:true

import str from './source'
console.log(str);
if(module.hot){
  module.hot.accept('./source',()=>{
    console.log('source文件更新了');
  })
}

/**
 * watch: 监视文件更改，在源文件更改时再次编译
 * hot：在源更改后不要重载整个页面，只需重载已更改的部分。
*/