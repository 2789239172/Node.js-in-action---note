/* 
  # Sinon.js
    + 除了断言库, 测试时还经常要用到探测器, 存根和模拟对象
    + 写单元测试是为了把系统中的各个组成部分隔离开 单独测试
        - 当测试图片缩放的代码时, 如果不想读写真正的图片文件, 这种情况下就需要创建文件系统功能的 *存根* 
        - 我们可以用存根代替尚未准备好的依赖项, 有助于实现真正的TDD 
*/
const fs = require('fs')
class Database {
  constructor(filename) {
    this.filename = filename
    this.data = {}
  }

  save(cb) {
    fs.writeFile(this.filename, JSON.stringify(this.data), cb)
  }

  insert(key, value) {
    this.data[key] = value
  }
}

module.exports = Database