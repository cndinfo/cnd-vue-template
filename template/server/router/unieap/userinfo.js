const apiKit = require('../../api/unieap')
const router = require('express').Router()
/**
 * 获取用户信息
 */
router.get('/get/:userId', function(req, res) {
  const boId = 'restcore_UserInfoCore_bo'
  const methodName = 'getUserInfo'
  const userId = req.params.userId
  const parameters = [{
    String: {
      userId
    }
  }]

  apiKit(boId, methodName, parameters).then((response) => {
    res.send(response.data)
  })
})
module.exports = router

