const tips = require('../index')
const should = require('should')

// 定义税和小费比率
const tax = 0.12
const tip = 0.15

// 定义要测试的账单项 
const prices = [10, 20]

const pricesWithTipAndTax = tips.addPercentageToEach(prices, tip + tax)
// 定义税和小费的增加额
pricesWithTipAndTax[0].should.equal(12.7)
pricesWithTipAndTax[1].should.equal(25.4)

const totalAmount = tips.sum(pricesWithTipAndTax).toFixed(2)
// 测试账单总额
totalAmount.should.equal('38.10')

const totalAmountAsCurrency = tips.dollarFormat(totalAmount)
totalAmountAsCurrency.should.equal('$38.10')

const tipAsPercent = tips.percentFormat(tip)
tipAsPercent.should.equal('15%')
