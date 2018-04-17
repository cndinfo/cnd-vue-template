'use strict'
const baseWeChatConf = require('./wechat.base.conf')
const qyWeChatConf = require('./wechat.qiye.conf')
const merge = require('webpack-merge')

module.exports = merge(baseWeChatConf, qyWeChatConf, {
  QY_CORPID: 'ww8bddc2217282ed2d',
  QY_CORPSECRET: 'zbtKjvCZ0apgZPpiSyA1ZQzzOjEProzSWVGANw1TGR8',
  QY_AGENT_ID: '1000002',
  QY_ACCESS_TOKEN: 'qy_access_token',
  development: {
    eap: {
      url: 'http://122.112.237.248:8080/framework/ws/rest/',
      eap_username: 'admin',
      eap_password: '1'
    },
    mongodb: {
      url: 'mongodb://dev:cndappdev@mongodb:27017/JFGF'
    },
    redis: {
      host: '192.168.33.10',
      port: 16379
    }
  },
  testing: {
    eap: {
      url: 'http://',
      eap_username: 'admin',
      eap_password: '1'
    },
    mongodb: {
      url: 'mongodb://dev:cndappdev@mongodb:27017/JFGF'
    },
    redis: {
      host: 'redis',
      port: 16379
    }
  },
  production: {
    eap: {
      url: 'http://122.112.237.248:8080/framework/ws/rest/',
      eap_username: 'admin',
      eap_password: '1'
    },
    mongodb: {
      url: 'mongodb://dev:cndappdev@mongodb:27017/JFGF'
    },
    redis: {
      host: 'redis',
      port: 16379
    }
  }
})
