// 用 Vows 测试代办事项程序
const vows = require('vows')
const assert = require('assert')
const Todo = require('../index')

vows.describe('Todo').addBatch({ // 批次
  'when adding an item': { // 情境
    topic: () => {                      // 主题
      const todo = new Todo()
      todo.add('Feed my cat')
      return todo
    },
    'it should exist in my todos': (er, todo) => { //誓约
      assert.strictEqual(todo.length, 1)
    }
  }
}).export(module)