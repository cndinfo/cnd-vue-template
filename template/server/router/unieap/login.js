const apiKit = require('../../api/unieap')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const secret = require('../../config/secret')

/**
 * 登录
 */
router.post('/login', function(req, res) {
  const boId = 'restcore_UserInfoCore_bo'
  const methodName = 'login'
  console.log(req.query)
  console.log(req.body)
  const parameters = [{
    String: {
      'account': req.body.account,
      'password': req.body.password
    }
  }]

  apiKit(boId, methodName, parameters).then((response) => {
    console.log(response)
    if (response.errorCode === '200') {
      var authToken = jwt.sign({ username: req.body.account }, secret.secretToken)

      secret.setToken(authToken)
      res.status(200).send({ userId: response.data.id, token: authToken })
    } else {
      res.send({ errorCode: response.resultCode, message: response.message })
    }
  })
})

module.exports = router
