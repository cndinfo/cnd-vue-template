'use strict'
const request = require('request')
const qs = require('querystring')
const config = require('./config')[process.env.NODE_ENV]
const cache = require('memory-cache')

let accessToken = cache.get(config.JSSDK_ACCESS_TOKEN)

const getAccessToken = function() {
  const queryParams = {
    'grant_type': 'client_credential',
    'appid': config.appId,
    'secret': config.appSecret
  }
  const wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?' + qs.stringify(queryParams)
  const options = {
    method: 'GET',
    url: wxGetAccessTokenBaseUrl
  }
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (res) {
        resolve(JSON.parse(body))
      } else {
        reject(err)
      }
    })
  })
}

const getUserInfoByOpenId = function(token, openid) {
  const queryParams = {
    'access_token': token,
    'openid': openid,
    'lang': 'zh_CN'
  }
  const wxGetTicketBaseUrl = 'https://api.weixin.qq.com/cgi-bin/user/info?' + qs.stringify(queryParams)
  const options = {
    method: 'get',
    url: wxGetTicketBaseUrl
  }
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (res) {
        resolve(JSON.parse(body))
      } else {
        reject(err)
      }
    })
  })
}

const getSubscribe = async function(openid) {
  return new Promise((resolve, reject) => {
    getAccessToken().then((res) => {
      if (res) {
        accessToken = res['access_token']
        getUserInfoByOpenId(accessToken, openid).then(res => {
          // console.log(res)
          // console.log('ticket', res)
          resolve({ subscribe: res['subscribe'] })
        })
      } else {
        reject()
      }
    })
  })
}

module.exports = getSubscribe
