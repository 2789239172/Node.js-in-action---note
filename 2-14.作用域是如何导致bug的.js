
function asyncFunction(callback) {
  setTimeout(callback, 200)
}
let color = 'blue'
  //  1. 输出green
  // asyncFunction(() => console.log(`the color is ${color}`))

  // 2. 输出blue
  ; ((color) => {
    asyncFunction(() => console.log(`the color is ${color}`))
  })(color)
color = 'green'


