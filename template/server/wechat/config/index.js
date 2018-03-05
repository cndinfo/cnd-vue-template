'use strict'
const baseWeChatConf = require('./wechat.base.conf')
const qyWeChatConf = require('./wechat.qiye.conf')
const merge = require('webpack-merge')

module.exports = merge(baseWeChatConf, qyWeChatConf, {
  // 企业微信配置 START
  QY_CORPID: '',
  QY_CORPSECRET: '',
  QY_AGENT_ID: '',
  QY_ACCESS_TOKEN: 'qy_access_token'
  // 企业微信配置 END
})
