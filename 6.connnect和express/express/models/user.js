const redis = require('redis')
const bcrypt = require('bcrypt')
const db = redis.createClient()

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key]
    }
  }

  save(cb) {
    if (this.id) {
      this.update(cb)
    } else {

      // 创建唯一ID
      db.incr('user:ids', (err, id) => {
        if (err) return cb(err)

        // 设定id以便保存
        this.id = id

        // 密码hash
        this.hashPassword(err => {
          if (err) return cb(err)
          // 保存用户属性
          this.update(cb)
        })
      })
    }
  }

  update(cb) {
    const id = this.id

    // 用名称索引用户id
    db.set(`user:id:${this.name}`, id, err => {
      if (err) return cb(err)

      // 用redis存储当前类属性 
      db.hmset(`user:${id}`, this, err => {
        cb(err)
      })
    })
  }

  hashPassword(cb) {
    // 生成12个又字符的盐
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err)
      // 设定盐以便保存
      this.salt = salt
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if (err) return cb(err)
        // 设定hash以便保存
        this.pass = hash
        cb()
      })
    })
  }

  static getByName(name, cb) {
    User.getId(name, (err, id) => {
      if (err) return cb(err)
      // console.log(id)
      User.get(id, cb)
    })
  }

  static getId(name, cb) {
    db.get(`user:id:${name}`, cb)
  }

  static get(id, cb) {
    db.hgetall(`user:${id}`, (err, user) => {
      if (err) return cb(err)
      cb(null, new User(user))
    })
  }

  // 用户名密码验证
  static authenticate(name, pass, cb) {
    User.getByName(name, (err, user) => {
      if (err) return cb(err)
      
      // 用户不存在
      if (!user.id) return cb()

      // 对登录密码哈希比对
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if(err) return cb(err)
        // 发现匹配
        if (hash === user.pass) return cb(null, user)
        // 密码无效
        cb()
      })
    })
  }

  // 去掉敏感的用户数据, 如果有.toJSON, JSON.stringify就会用它返回的json数据
  toJSON() {
    return {
      id: this.id,
      name: this.name
    }
  }
}

// const user = new User({name: 'Example', pass: 'test'})

// user.save(err => {
//   if (err) {
//     console.log(err)
//   }

//   // % 格式说明, %s 字符串, %d 数字
//   console.log('user id %d', user.id)
// })
// User.getByName('Example', (err, res) => {
//   console.log(err)
//   console.log(res)
// })

module.exports = User