/* 
  # Should.js 
    + 是个断言库, 类似于BDD风格表示断言, 
    + 设计初衷是搭配其他测试框架一起用
*/


exports.addPercentageToEach = (prices, percentage) => {
  // 按百分比加大数组元素中的数值
  return prices.map(total => {
    total = parseFloat(total)
    return total + (total * percentage)
  })
}

exports.sum = prices => {
  // 计算数组中所有值的和
  return prices.reduce((currentSum, currentValue) => {
    return parseFloat(currentSum) + parseFloat(currentValue)
  })
}

exports.percentFormat = percentage => {
  // 将要显示的值变成百分比格式
  return parseFloat(percentage) * 100 + '%'
}

exports.dollarFormat = number => {
  // 将要显示的值变成美元格式
  return `$${parseFloat(number).toFixed(2)}`
}
