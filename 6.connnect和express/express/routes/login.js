const User = require("../models/user")

exports.form = (req, res) => {
  console.log(251)
  res.render('login', {
    title: 'Login'
  })
}

exports.submit = (req, res) => {
  const data = req.body.user
  // 检查凭证
  User.authenticate(data.name, data.pass, (err, user) => {
    if (err) return next(err)
    if (user) {
      req.session.uid = user.id
      res.redirect('/')
    } else {
      res.error('Sorry! invalid Credentials.')
      res.redirect('back')
    }
  })
}

exports.logout = (req, res) => {
  // 销毁session
  req.session.destroy(err => {
    if(err) throw err
    res.redirect('/')
  })
}