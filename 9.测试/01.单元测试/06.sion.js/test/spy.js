/* 
  探测器: 有时我们只是想看看某个方法是否被调用了, 探测器最适合这个
    + 借助它的API 可以将某个方法替换成能够进行断言的东西, 
    + 用 Sinon 的方法替身spy 模拟db.js 中的fs.writeFile
*/

const sinon = require('sinon')
const Database = require('./db')
const fs = require('fs')
const database = new Database('./sample.json')

// 替换 fs 方法
const fsWriteFileSpy = sinon.spy(fs, 'writeFile')
const saveDone = sinon.spy()

database.insert('name', 'Charles Dickens')
database.save(saveDone)

//  断言 writeFile 只调用一次
sinon.assert.calledOnce(fsWriteFileSpy)

// 恢复原来的方法
fs.writeFile.restore()

