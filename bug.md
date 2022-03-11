#### asset size limit: The following asset(s) exceed the recommended size limit (244 KiB). This can impact web performance.
错误原因，资源(asset)和入口起点超过指定文件限制
````
performance: {
  // 创建超过250kb资源时不提示错误
  hints: false,
  maxEntrypointSize: 400000
}
````js


"postinstall": "patch-package"
// "patch-package": "^6.4.7",