const User = require('../models/user')

exports.form = (req, res) => {
  res.render('register', { title: 'register' })
}

exports.submit = (req, res, next) => {
  const data = req.body.user
  // 检查用户名是否唯一 
  User.getByName(data.name, (err, user) => {
    // 顺延传递数据库连接错误和其他错误
    if (err) return next(err)

    //  用户名已经被占用
    if (user.id) {
      console.log('占用用户名')
      res.error('Username already taken !!')
      res.redirect('back')
    } else {
      console.log('新用户名')
      // 创建用户
      user = new User({
        name: data.name,
        pass: data.pass
      })

      // 保存信息
      user.save(err => {
        if (err) return next(err)
        // 为认证保存 uid
        req.session.uid = user.id
        res.redirect('/')
      })
    }

  })

}