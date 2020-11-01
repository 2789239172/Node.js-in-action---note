
/* 
  # assert
     - 测试一个条件, 如果条件未满足, 抛出错误
     - 例: 
        + 一个简单的代办事项程序, 他把事件存在内存中,
           你要断言它做的是你认为它在做的
*/

// 待办事项列表的模型
class Todo {
  constructor() {
    // 定义待办事项数据库
    this.todos = []
  }

  // 添加待办事项
  add(item) {
    if (!item) throw new Error('Todo.prototype.add requires an item')
    this.todos.push(item)
  }

  // 删除所有
  deleteAll() {
    this.todos = []
  }

  get length() {
    // 取得待办事项的数量
    return this.todos.length
  }

  doAsync(cb) {
    // 延迟后的参数: 附加参数，一旦定时器到期，它们会作为参数传递给function 
    setTimeout(cb, 2000, true)
  }
}

module.exports = Todo
