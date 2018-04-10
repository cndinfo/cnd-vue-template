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

module.exports = app

