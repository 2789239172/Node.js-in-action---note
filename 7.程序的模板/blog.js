const fs = require('fs')
const ejs = require('ejs')
const http = require('http')

const template = fs.readFileSync('./blog.ejs', 'utf-8')

// 读取和解析博客文章文本的函数
function getEntries() {
  // 从文件中读取博客文章的数据 
  let entriesRaw = fs.readFileSync('./entries.text', 'utf-8')
  entriesRaw = entriesRaw.split('--')
  
  let entries = entriesRaw.map(entryRaw => {
    const entry = {}
    // 将文本按行分解
    const lines = entryRaw.split(/[\n|\r]/)
    lines.map(line => {
      if (line.indexOf('title: ') === 0) {
        entry.title = line.replace('title: ', '')
      } else if (line.indexOf('data: ') === 0) {
        entry.data = line.replace('data: ', '')
      }else {
        entry.body = entry.body || ''
        entry.body += line
      }
    })
    return entry
  })

  return entries
}

const entries = getEntries()

const server = http.createServer((req, res) => {
  const output = blogPage(entries)
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(output)
})

server.listen(8000)

