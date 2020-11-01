/* 
  # Vows
    + Vows的测试代码结构化更强, Vows想让测试更容易理解和维护
    + BDD属于定义测试结构, 
        -                  套件
                             ↓ (包含)
                      一或多个批次
                             ↓ (包含)
                      一或多个情境       
                        (可能包含)
                  主题 ←  ↓  → 一或多个情境
                      一或多个誓约
    + Vows 与 Mocha 一样, 是专门用来做自动化程序测试的,
       - 差别主要体现在风格和并行性上
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