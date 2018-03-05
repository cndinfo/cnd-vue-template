const express = require('express')
const compression = require('compression')

const app = express()
app.use(compression())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * 判断用户访问的连接是否需要登录，如果需要则跳转到登录页面
*/
// const loginInterceptor = require('./interceptor/loginInterceptor')
// app.all('/*', loginInterceptor)

/**
 * 注册和userinfo有关的API路由，为统一管理，建议加上api前缀
*/
const userinfo = require('./router/unieap/userinfo')
app.use('/api/userinfo', userinfo)

const wechat = require('./router/wechat')
app.use('/wechat', wechat)

module.exports = app

