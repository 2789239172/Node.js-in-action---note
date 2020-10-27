const http = require('http')
const fs = require('fs')

http.createServer((req, res) => { //创建http服务器并用回调定义响应逻辑
  if (req.url == '/') {
    fs.readFile('./title.json', (err, data) => { // 读取 JSON 文件并用回调定义如何处理其中的内容
      if (err) { //出错, 输出错误日志, 并给客户端返回 "serve Error"
        console.error(err)
        res.end('Server Error')
      } else {
        const title = JSON.parse(data.toString()) // JSON 文本中解析数据
        fs.readFile('./template.html', (err, data) => { // 读取HTML 模板, 并在加载完成后使用回调
          if (err) {
            console.error(err)
            res.end('Server Error')
          } else {
            const temp = data.toString()
            const html = temp.replace('%', title.join('<li></li>')) //组装html 页面
            res.writeHead(200, {'Content-type': 'text/html'})
            res.end(html) //jianghtml发送给用户
          }
        })
      }
    })
  }
})
  .listen(8000, '127.0.0.1', () => {
    console.log('listen: 127.0.0.1:8000')
  })