const router = require('express').Router()
const xmlparser = require('express-xml-bodyparser')

router.post('/wxPayCallback', xmlparser({ trim: false, explicitArray: false }), function(req, res) {
  const msg = req.body
  const myResponse = '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>'
  console.log('callback message:')
  console.log(msg)
  console.log(msg.xml.out_trade_no)
  // 回应微信，防止微信一直发起请求
  res.send(myResponse)
})

module.exports = router
