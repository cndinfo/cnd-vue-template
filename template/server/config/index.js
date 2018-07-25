'use strict'
const baseWeChatConf = require('./wechat.base.conf')
const qyWeChatConf = require('./wechat.qiye.conf')
const merge = require('webpack-merge')

module.exports = merge(baseWeChatConf, qyWeChatConf, {
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
