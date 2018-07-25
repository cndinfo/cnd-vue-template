const router = require('express').Router()
const qs = require('querystring')
const request = require('request')
const config = require('./config')[process.env.NODE_ENV]

function getToken(code) {
  const reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?'
  const params = {
    appid: config.appId,
    secret: config.appSecret,
    code: code,
    grant_type: 'authorization_code'
  }

  const options = {
    method: 'get',
    url: reqUrl + qs.stringify(params)
  }
  // console.log(options.url)
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (res) {
        resolve(body)
      } else {
        reject(err)
      }
    })
  })
}

router.get('/wxSilentAuth', function(req, res) {
  // 获取用户信息之后最终的跳转链接
  const reqUrl = config.domain + '/#/wxAuth?'
  const params = {
    code: req.query.code,
    state: req.query.state
  }
  getToken(params.code)
    .then(function(data) {
      const openid = JSON.parse(data)['openid']
      // console.log(openid)
      res.redirect(reqUrl + qs.stringify({ openid: openid, redirectUrl: req.query.redirectUrl }))
    })
})

module.exports = router
