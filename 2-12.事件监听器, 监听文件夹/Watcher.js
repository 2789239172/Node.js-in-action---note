const fs = require('fs')
const events = require('events')

// 扩展 EventEmitter 添加处理文件的方法
class Watcher extends events.EventEmitter {
  constructor(watcherDir, processedDir) {
    super()
    this.watchDir = watcherDir
    this.processedDir = processedDir
  }

  //处理watch 目录中所有的文件
  watch() {
    fs.readdir(this.watchDir, (err, files) => {
      if (err) throw err
      for (let i in files) {
        this.emit('process', files[i])
      }
    })
  }

  //添加开始监控的方法
  start() {
    fs.watchFile(this.watchDir, () => {
      this.watch()
    })
  }
}

module.exports = Watcher