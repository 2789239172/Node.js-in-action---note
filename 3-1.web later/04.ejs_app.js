const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Article = require('./SQLite').Article
app.set('port',process.env.PORT || 3000)

app.use(bodyParser.json()) //支持编码为 JSON 的请求消息体
app.use(bodyParser.urlencoded({extended: true})) //支持编码为表单的请求消息体

// express.static 可以给浏览器发送客户端 javascript, 图片和css文件
app.use( //加载 Bootstrap css, 
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
)

app.get('/articles', (req, res, next) => { // 获取所有文章
  Article.all((err, articles) => {
    if(err) return next(err)
    res.format({
      html: () => {
        console.log(articles)
        res.render('articles.ejs', {articles: articles})
      },
      json:() => {
        res.send(articles)
      }
    })
  })
})

app.get('/articles/:id', (req, res, next) => { // 获取指定文章
  const id = req.params.id
  Article.find(id, (err, article) => {
    if(err) return next(err)
    res.send(article)
  })
})

app.post('/articles', (req, res, next) => { // 创建一篇文章
  const article = {title: req.body.title}
  Article.create(article, (err) => {
    if(err) return next(err)
    res.send('ok')
  })
})

app.delete('/articles/:id', (req, res, next) => { // 删除指定文章
  const id = req.params.id
  Article.delete(id, (err) => {
    if(err) return next(err)
    res.send({message: 'deleted'})
  })
})

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'))
})

module.exports = app