const express = require('express')
const compression = require('compression')

const app = express()
app.use(compression())

bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const loginInterceptor = require('./interceptor/loginInterceptor')
app.all('/*',loginInterceptor)

const user = require('./router/user')
app.use('/user',user)

module.exports = app

