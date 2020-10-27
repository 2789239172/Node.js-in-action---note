const { debug } = require("console");

// http://www.ruanyifeng.com/blog/2018/03/node-debugger.html
global.x = 5;
console.log(x)
setTimeout(() => {
  console.log('world');
});

console.log('hello');