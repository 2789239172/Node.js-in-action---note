const fs = require('fs')
const tasks = []
const wordCounts = {}
const filesDir = './text'
let completedTasks = 0

function checkIfComplete() {
  completedTasks++

  // 所有任务完成后, 列出文件每个单词次数
  if (completedTasks === tasks.length) {
    for (let index in wordCounts) {
      console.log(`${index}: ${wordCounts[index]}`)
    }
  }
}

function addWordCount(word) {
  wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1
}

function countWordsInText(text) {
  text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort()
    .forEach(word => addWordCount(word));
}

fs.readdir(filesDir, (err, files) => {
  if (err) throw err

  files.forEach(file => {
    const task = () => {
      const filePath = `${filesDir}/${file}`

      fs.readFile(filePath, (err, text) => {
        if (err) throw err
        countWordsInText(text)
        checkIfComplete()
      })
    }

    tasks.push(task)
  })

  tasks.forEach(task => task())
})