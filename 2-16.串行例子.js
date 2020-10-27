const async = require('async') //node包, 不是核心模块

// 回调
// setTimeout(() => {
//   console.log(1)
//   setTimeout(() => {
//     console.log(2)
//     setTimeout(() => {
//       console.log(3)
//     }, 100)
//   }, 100)
// }, 100)

// 使用 async
async.series([
  callback => {
    setTimeout(() => {
      console.log(1)
      callback()
    }, 100)
  },
  callback => {
    setTimeout(() => {
      console.log(2)
      callback()
    }, 100)
  },
  callback => {
    setTimeout(() => {
      console.log(3)
      callback()
    }, 100)
  },
])