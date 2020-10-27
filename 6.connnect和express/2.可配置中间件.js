const connect = require('connect')

// 利用闭包缓存配置参数
function logger(format) {
  const regexp = /:(\w+)/g

  return function createLogger(req, res, next) {
    const str = format.replace(regexp, (match, property) => {
      return req[property]
    })
    console.log(str)
    next()
  }
}

function hello(req, res,) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
}

connect()
  .use(logger(':method :url'))
  .use(hello)
  .listen(3000)