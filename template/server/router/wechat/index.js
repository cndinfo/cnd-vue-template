'use strict'

const express = require('express')
const router = express.Router()
const user = require('../../api/wechat/qy_user')
const token = require('../../api/wechat/qy_accessToken')

router.get('/userinfo/:userId', user.getUserInfo)

router.get('/accessToken', token.getAccessTokenApi)

module.exports = router
