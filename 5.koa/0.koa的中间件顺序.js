const koa = require('koa')
const app = new koa()

app.use(async function (ctx, next) {
  const start = new Date
  await  next()
  const ms = new Date - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

app.listen(3000)