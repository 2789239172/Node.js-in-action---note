const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const { nextTick } = require('process')
const configFilename = './rss_feeds.txt'

function checkForRSSFile() {
  // 通过检查文件系统来测试给定的路径是否存在
  // 调用 callback 并带上参数 true 或 false：
  fs.exists(configFilename, exists => {
    if (!exists) return next(new Error(`Missing RSS file: ${configFilename}`))
    next(null, configFilename)
  })
}

// 读取并解析包含预定源URL的文件
function readRSSFile(configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) return next(err)
    // 将预定源 URL 裂变转换成字符串, 然后分隔成一个数组
    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, '')
      .split('\n')

    // 随机选择一个预定源
    const random = Math.floor(Math.random() * feedList.length)
    next(null, feedList[random])
  })
}

// 向选定的预定源发送http请求以获取数据
function downloadRSSFeed(feedUrl) {
  request({ uri: feedUrl }, (err, res, body) => {
    if (err) return next(err)
    if (res.statusCode !== 200) return next(new Error('Abnormal response status code'))
    next(null, body)
  })
}

// 将预定源数据解析到一个条目数组中
function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler()
  const parser = new htmlparser.Parser(handler)
  parser.parseComplete(rss)

  if (!handler.dom.items.length) {
    return next(new Error('No RSS items found'))
  }
  const item = handler.dom.items.shift()
  console.log(item.title)
  console.log(item.link)
}

const tasks = [
  checkForRSSFile,
  readRSSFile,
  downloadRSSFeed,
  parseRSSFeed,
]

function next(err, result) {
  if (err) throw err
  const currentTask = tasks.shift()
  if (currentTask) {
    currentTask(result)
  }
}

next()