const redis = require('redis')
const db = redis.createClient()

class Entry {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key]
    }
  }

  save(cb) {
    // 将保存的消息转换成 JSON 字符串
    const entryJSON = JSON.stringify(this)

    // 将 JSON 字符串保存到Redis列表中
    db.lpush('entries', entryJSON, err => {
      if (err) return cb(err)
      cb()
    })
  }

  static count(cb) {
    db.lrange('entries', 0, -1, (err, items) => {
      cb(err, items.length)
    })
  }

  static getRange(from, to, cb) {
    // 用来获取消息记录的Redis lrange函数
    db.lrange('entries', from, to, (err, items) => {
      if (err) return cb(err)
      let entries = []
      items.forEach(item => {
        entries.push(JSON.parse(item))
      })
      cb(null, entries)
    })
  }
}

module.exports = Entry
