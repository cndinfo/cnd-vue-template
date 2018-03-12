'use strict'

const express = require('express')
const router = express.Router()
const user = require('../../api/wechat/qy_user')
const token = require('../../api/wechat/qy_accessToken')

router.get('/getUserInfo', user.getUserInfo)

router.get('/getAccessToken', token.getAccessToken)

module.exports = router
