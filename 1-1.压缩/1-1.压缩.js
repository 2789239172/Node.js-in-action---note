const fs = require('fs')
const zlib = require('zlib')
const gzip = zlib.createGzip()
const outStream = fs.createWriteStream('output.js.gzip')

// 读取文件流
fs.createReadStream('./a.js')
// 管道通往gzip
.pipe(gzip)
// 管道通往流输出
.pipe(outStream)