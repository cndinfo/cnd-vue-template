const fs = require('fs')
const WXPay = require('weixin-pay')
const config = require('./config')[process.env.NODE_ENV]

const wxpay = WXPay({
  appid: config.appId,
  mch_id: config.mch_id,
  partner_key: config.partner_key,
  pfx: fs.readFileSync(config.certDir)
})

module.exports.wxpay = (req, res) => {
  const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]

  function preciseNumber(number) {
    return (parseFloat(number).toPrecision(15).replace(/\.0+/, ''))
  }

  wxpay.getBrandWCPayRequestParams({
    openid: req.body.openid,
    body: req.body.body, // 商品描述
    detail: req.body.detail, // 商品详情
    out_trade_no: req.body.out_trade_no, // 订单号（自己生成的，支付成功微信会返回）
    total_fee: preciseNumber(req.body.total_fee * 100), // 支付金额（单位是分，前端默认是元）
    spbill_create_ip: ip, // 用户端 IP
    notify_url: config.domain + '/wxPayCallback' // 回调地址
  }, (err, result) => {
    if (err) console.log(err)
    res.json({
      status: 1,
      data: result
    })
  })
}
