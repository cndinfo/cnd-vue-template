'use strict'
const baseWeChatConf = require('./wechat.base.conf')
const qyWeChatConf = require('./wechat.qiye.conf')
const merge = require('webpack-merge')

module.exports = merge(baseWeChatConf, qyWeChatConf, {
  // 企业微信配置 START
  QY_CORPID: 'ww8bddc2217282ed2d',
  QY_CORPSECRET: 'zbtKjvCZ0apgZPpiSyA1ZQzzOjEProzSWVGANw1TGR8',
  QY_AGENT_ID: '1000002',
  QY_ACCESS_TOKEN: 'qy_access_token'
  // 企业微信配置 END
})
