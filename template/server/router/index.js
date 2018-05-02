const express = require('express')
const compression = require('compression')
const secret = require('../config/secret')
var jwt = require('express-jwt')

const app = express()
app.use(compression())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var morgan = require('morgan')

app.use(morgan('dev'))

const login = require('./unieap/login')
app.use('/api/userinfo', login)

/**
 * 注册API路由，为统一管理，建议加上api前缀
*/
const userinfo = require('./unieap/userinfo')
app.use('/api/userinfo', jwt({ secret: secret.secretToken }), secret.verifyToken, userinfo)

// 微信网页授权
const getUserInfo = require('./wechat/getUserInfo')
app.use(getUserInfo)

// 微信网页静默授权
const getOpenId = require('./wechat/getOpenId')
app.use(getOpenId)

// 生成微信支付 API
const wxpay = require('./wechat/wxPay')
app.post('/api/wxpay', wxpay.wxpay)

// 微信支付回调
const wxPayCallback = require('./wechat/wxPayCallback')
app.use(wxPayCallback)

// 微信 SDK 验证
const getJsSdkSignature = require('./wechat/getJsSdkSignature')
app.post('/api/wxSignature', function(req, res) {
  const clientUrl = req.body.url
  getJsSdkSignature(clientUrl).then(signature => {
    res.send(signature)
  })
})

// 微信用户是否关注公众号
const getSubscribe = require('./wechat/getSubscribe')
app.post('/api/wxSubscribe', function(req, res) {
  const openid = req.body.openid
  getSubscribe(openid).then(subscribe => {
    res.send(subscribe)
  })
})

module.exports = app
