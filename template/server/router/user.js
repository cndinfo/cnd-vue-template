'use strict'

const express = require('express')
var router = express.Router();

const user = require('../wechat/api/user')

router.post('/get',user.getUserInfo)
module.exports = router