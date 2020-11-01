/* 
  # Mocha
    + 默认BDD风格, 但也可以用在TDD风格的测试中
    + 具有多种特性, 包括全局变量泄漏检测, 和客户端测试 
    + Mocha的测试不是并行执行的, 而是一个接一个的执行
        - 执行的慢, 但写起来容易
        - 一个测试默认不超过2000毫秒, 超过这个时间就会被当做失败的测试, 使用 --timeout 指定更大的数值
*/
const db = []

// 将doc 添加到数据库数组中 
exports.saveSync = doc => {
  db.push(doc)
}

exports.first = obj => {
  return db.filter(doc => {
    //  选择跟obj所有属性相匹配的doc
    for (const key of Object.keys(obj)) {
      if (obj[key] != doc[key]) {
        return false
      }
    }
    return true
  }).shift()
}

exports.clear = () => {
  db.length = 0
}

exports.save = (doc, cb) => {
  db.push(doc)
  if (cb) {
    setTimeout(() => {
      cb()
    })
  }
}