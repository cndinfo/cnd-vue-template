'use strict'

const express = require('express')
const router = express.Router()
const user = require('../../api/wechat/qy_user')
const token = require('../../api/wechat/qy_accessToken')

router.get('/userinfo', user.getUserInfo)

router.get('/accessToken', token.getAccessToken)

module.exports = router
