const apiKit = require('../../api/unieap')
const router = require('express').Router()

/**
 * 获取用户信息
 */
router.get('/get/:userId', function(req, res) {
  const boId = 'aucapi_AucCustomerRestBO_bo'
  const methodName = 'getUserInfo'
  const params = req.params.userId
  const account = params
  const parameters = [{
    String: {
      account
    }
  }]

  apiKit(boId, methodName, parameters).then((response) => {
    res.send(response)
  })
})

/**
 * 登录
 */
router.post('/login', function(req, res) {
  const boId = 'aucapi_AucCustomerRestBO_bo'
  const methodName = 'login'
  const parameters = [{
    String: {
      'openId': req.body.openId,
      'username': req.body.username,
      'password': req.body.password
    }
  }]
  apiKit(boId, methodName, parameters).then((response) => {
    res.send(response)
  })
})

module.exports = router
