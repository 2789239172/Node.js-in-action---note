const memdb = require('../index')
const assert = require('assert')
const { beforeEach } = require('mocha')

/*  
 + Mocha挂钩
   - BDD 接口 beforeEach(), afterEach(), before() 和 after() 接受回调
   - 可以用来定义设置和清理逻辑
*/

// 描述 memdb 功能
describe('memdb', () => {

  // 在每个测试用例之前都要清理数据库, 保存测试的无状态性
  beforeEach(() => {
    memdb.clear()
  })

  // 描述.saveSync() 方法功能
  describe('synchronous .saveSync(doc)', () => {
    // 描述期望值
    it('should save the document', () => {
      const pet = { name: 'Tobi' }
      memdb.saveSync(pet)
      const ret = memdb.first({ name: 'Tobi' })
      // 确保找到了pet
      assert(ret == pet)
    })
  })

  describe('.first(obj)', () => {
    // 对first() 的第一个期望
    it('should return the first matching doc', () => {
      const tobi = { name: 'Tobi' }
      const loki = { name: 'Loki' }
      memdb.saveSync(tobi)
      memdb.saveSync(loki)
      let ret = memdb.first({ name: 'Tobi' })
      assert(ret == tobi)
      ret = memdb.first({ name: 'Loki' })
      assert(ret == loki)
    })

    // 对.first() 的第二个期望
    it('should return null when on doc matches', () => {
      const ret = memdb.first({ name: 'Manny' })
      assert(ret == null)
    })
  })

  // 测试异步逻辑: 为定义测试逻辑的函数添加一个参数, 就可以吧Mocha定义为异步
  describe('asyncronous .save(doc)', () => {
    it('should save the document', done => {
      const pet = { name: 'Tobi' }
      // 保存文档
      memdb.save(pet, () => {
        const ret = memdb.first({ name: 'Tobi' })
        // 断言文档正确保存
        assert(ret == pet)
        // 告诉Mocha 这个测试用例做完了
        done()
      })
    })
  })

})


// Mocha也支持TDD和quint 以及exports风格的接口
// module.exports = {
//   'memdb': {
//     '.saveSync(doc)': {
//       'should save the document' : () => {}
//     }
//   }
// }