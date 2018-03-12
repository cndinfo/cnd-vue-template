'use strict'
const baseWeChatConf = require('./wechat.base.conf')
const qyWeChatConf = require('./wechat.qiye.conf')
const merge = require('webpack-merge')

module.exports = merge(baseWeChatConf, qyWeChatConf, {
  QY_CORPID: 'ww8bddc2217282ed2d',
  QY_CORPSECRET: 'zbtKjvCZ0apgZPpiSyA1ZQzzOjEProzSWVGANw1TGR8',
  QY_AGENT_ID: '1000002',
  QY_ACCESS_TOKEN: 'qy_access_token',
  dev: {
    apiUrl: 'http://localhost:8080/framework/ws/rest/',
    eap_username: 'admin',
    eap_password: '1'
  },
  test: {
    apiUrl: 'http://localhost:8080/framework/ws/rest/',
    eap_username: 'admin',
    eap_password: '1'
  },
  pro: {
    apiUrl: 'http://localhost:8080/framework/ws/rest/',
    eap_username: 'admin',
    eap_password: '1'
  }
})
