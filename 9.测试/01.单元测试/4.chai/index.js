/* 
  # Chai
    + 流行的断言库, 有三个接口: should, expect, assert 
    + should 和 expect 接口是人们尝试 Chai 的主要原因
        - 它们提供了更像BDD风格的API
*/

const chai = require('chai')
// 选择断言接口
const assert = chai.assert
const foo = 'bar'
const tea = {flavors: ['chai', 'earl grey', 'pg tips']}

assert.typeOf(foo, 'string')
assert.equal(foo, 'bar')
assert.lengthOf(foo, 3)

assert.property(tea, 'flavors')
assert.lengthOf(tea.flavors, 3)

//  expect
const chai = require('chai')
const expect = chai.expect
const foo = 'bar'
expect(foo).to.be.a('string')
expect(foo).to.equal('bar')

// should 换了种风格: 给对象添加属性, 这样就不用把断言放在expect调用里了
const chai = require('chai')
chai.should()
const foo = 'bar'
foo.should.be.a('string')
foo.should.equal('bar')

// 要用哪个接口取决于项目...

