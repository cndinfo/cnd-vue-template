'use strict'

const express = require('express')
const router = express.Router()
const user = require('../../api/wechat/api/qy_user')

router.post('/get', user.getUserInfo)

module.exports = router
