// const EventEmitter = require('events').EventEmitter
// const channel = new EventEmitter()
// channel.on('join', () => {
//   console.log('Welcome')
// })
// channel.emit('join')

// 实现简单的发布/订阅系统
const events = require('events')
const net = require('net')

const channel = new events.EventEmitter()
channel.setMaxListeners(2)
channel.clients = {}
channel.subScriptions = {}

channel.on('join', function (id, client) {
  //添加 join 事件的监听器, 保存用户的 client 对象, 以便程序可以将数据发送给用户
  this.clients[id] = client
  this.subScriptions[id] = (senderId, message) => {
    //忽略发出这一广播的用户
    if (id !== senderId) {
      this.clients[id].write(message)
    }
  }

  //添加一个专门针对当前用户的 broadcast 事件监听器
  this.on('broadcast', this.subScriptions[id])
  const welcome = `Welcome! Guests online: ${this.listeners('broadcast').length}`
  client.write(`${welcome}\n`)
})

channel.on('leave', function (id) {
  channel.removeListener('broadcast', this.subScriptions[id])
  channel.emit('broadcast', id, `${id} has left the chatroom.`)
})


const serve = net.createServer(client => {
  const id = `${client.remoteAddress}: ${client.remotePort}`
  //当有用户连倒服务器上时, 发出一个join事件, 指明用户id和client对象
  channel.emit('join', id, client)

  // 监听用户输入
  client.on('data', data => {
    data = data.toString()
    // 向其他用户广播
    channel.emit('broadcast', id, data)
  })

  client.on('close', () => {
    channel.emit('leave', id)
  })
})

serve.listen(8888)