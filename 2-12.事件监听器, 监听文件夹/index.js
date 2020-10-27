const fs = require('fs')
const Watcher = require('./Watcher')
const watchDir = './watcher'
const processedDir = './processed'
const fw = new Watcher(watchDir, processedDir)

fw.on('process', file => {
  const watchFile = `${watchDir}/${file}`
  const processedFile = `${processedDir}/${file.toLowerCase()}`
  console.log(watchFile)
  console.log(processedFile)
  fs.rename(watchFile, processedFile, err=> {
    if(err) throw err
  })
})

fw.start()