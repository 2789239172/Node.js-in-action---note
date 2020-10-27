const auth = require('basic-auth')
// const express = require('express')
const User = require('../models/user')
const Entry = require('../models/entry')

exports.auth = (req, res, next) => {
  // 获取存在于请求头中的Authorization
  const { name, pass } = auth(req)

  User.authenticate(name, pass, (err, user) => {
    if (user) req.remoteUser = user
    next(err)
  })
}

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err)
    if (!user.id) return res.sendStatus(404)
    res.json(user)
  })
}

exports.entries = (req, res, next) => {
  const page = req.page
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) return next(err)

    //1. 实现内容协商, http通过accept请求头域提供了内容协商机制, 
    // res.format({
    //   'application/json': () => {
    // res.send(entries)
    //   },

    //   'application/xml': () => {
    //     res.write('<entries>\n')
    //     entries.forEach(entry => {
    //       res.write(`
    //         <entry>
    //           <title>${entry.title}</title>
    //           <body>${entry.body}</body>
    //           <username>${entry.username}</username>
    //         </entry>
    //       `)
    //     }) 
    //     res.end('</entries>')
    //   }
    // })

    //2. res.format() 还可以将拓展名映射到相关联的MIME类型上
    // 比如可以用 json 和 xml 代替 application/json 和 application/xml
    // res.format({
    //   json: () => {
    //     ...
    //   },
    //   xml: () => {
    //     ...
    //   }
    // })

    //使用ejs生成 XMl
    // xml: () => {
    //   res.render('entries/xml', {entries})
    // }

    res.json(entries)
  })
}