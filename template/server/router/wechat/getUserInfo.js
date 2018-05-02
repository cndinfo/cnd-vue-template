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

function getUserInfo(AccessToken, openId) {
  const reqUrl = 'https://api.weixin.qq.com/sns/userinfo?'
  const params = {
    access_token: AccessToken,
    openid: openId,
    lang: 'zh_CN'
  }

  const options = {
    method: 'get',
    url: reqUrl + qs.stringify(params)
  }

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

// 前端将 redirect_uri 设置为 http://domain/register_redirect，
// 微信获取用户同意后为跳转到 redirect_uri，
// 后端路由通过 redirect_uri 进行下一步操作，获取用户信息
router.get('/register_redirect', function(req, res) {
  // 获取用户信息之后最终的跳转链接
  const reqUrl = config.domain + config.auth_redirect
  const params = {
    code: req.query.code,
    state: req.query.state
  }
  getToken(params.code)
    .then(function(data) {
      // console.log(data)
      return JSON.parse(data)
    })
    .then(function(data) {
      getUserInfo(data['access_token'], data['openid'])
        .then(_ => {
          // console.log(_)
          // console.log(JSON.parse(_)['openid'])
          // console.log(JSON.parse(_)['nickname'])
          // console.log(JSON.parse(_)['headimgurl'])
          const openid = JSON.parse(_)['openid']
          const nickname = JSON.parse(_)['nickname']
          const headimgurl = JSON.parse(_)['headimgurl']
          res.redirect(reqUrl + qs.stringify({ openid: openid, nickname: nickname, headimgurl: headimgurl }))
        })
    })
})

module.exports = router
