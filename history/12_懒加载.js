let button = document.createElement('button')
button.innerHTML = 'button'

// 懒加载
button.addEventListener('click',function(){
  console.log('button');
  // jsonp实现动态加载文件
  import ('./source.js').then((res)=>{
    console.log(res)
  })
})

document.body.appendChild(button)