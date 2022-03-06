let xhr = new XMLHttpRequest();

// webpack-dev-server的服务->3000
// http-proxy

// 直接访问 http://localhost:3000/api/user 会跨域，端口号不同
xhr.open('GET', '/api/user', true);

xhr.onload = function () {
  console.log(xhr.response);
};

xhr.send();
