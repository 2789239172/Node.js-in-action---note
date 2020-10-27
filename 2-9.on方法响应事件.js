const net = require('net')
const server = net.createServer(socket => {
  socket.on('data', data => {
    socket.write('\n'+data)
  })
})
server.listen(8888)