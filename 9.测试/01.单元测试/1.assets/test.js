const assert = require('assert')
const Todo = require('./index')
const todo = new Todo()
let testsCompleted = 0


// 测试代办事项程序的删除功能
function deleteTest() {
  todo.add('Delete Me')

  // 断言数据添加成功
  // 测试 0 参数和 1 参数之间的严格相等性
  assert.strictEqual(todo.length, 1, '1 item should exist1 ')

  todo.deleteAll()

  // 断言数据删除成功
  assert.strictEqual(todo.length, 0, 'No items should exist')

  // 记录测试已完成
  testsCompleted++
}

// 测试代办事项程序的添加功能
function addTest() {
  todo.deleteAll()
  todo.add('Added')
  // 断言有事项存在
  assert.notStrictEqual(todo.length, 0, '1 item should exist')
  testsCompleted++
}

// 测试异步值是否为true
function doAsyncTest(cb) {
  todo.doAsync(value => {
    // 测试值是否为true
    assert.ok(value, 'Callback should be passed true')
    testsCompleted++
    cb()
  })
}

// 检查缺少参数时 add 是否会抛出错误, 正则表示要在错误消息中查找文本requires 
function throwsTest() {
  // 没有参数的todo.add 调用
  assert.throws(todo.add, /requires/)
  testsCompleted++
}

// 运行测试并报告测试完成的数量
deleteTest()
addTest()
throwsTest()
doAsyncTest(() => {
  console.log(`Completed ${testsCompleted} tests`)
})
