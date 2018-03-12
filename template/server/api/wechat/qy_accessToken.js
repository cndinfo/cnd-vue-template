'use strict'

const request = require('request')
const config = require('../../config')
const qs = require('querystring')
const cache = require('memory-cache')

/**
 * 访问企业微信API获取Access_Token
 */
const getAccessTokenRequest = () => {
  const queryParams = {
    'corpid': config.QY_CORPID,
    'corpsecret': config.QY_CORPSECRET
  }
  const wxGetAccessTokenBaseUrl = config.QY_API_DOMAIN + config.QY_API_URL.ACCESS_TOKEN + qs.stringify(queryParams)
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

/**
 * 从缓存中获取Access_Token，如果没有获取到则调用getAccessTokenRequest
 */
const getAccessToken = async(req, res) => {
  let accessToken = cache.get(config.QY_ACCESS_TOKEN)
  console.log('从缓存获取accessToken==' + accessToken)
  if (!accessToken) {
    const res = await getAccessTokenRequest()
    accessToken = res['access_token']
    console.log('从微信获取accessToken==' + accessToken)

    cache.put(config.QY_ACCESS_TOKEN, accessToken, 1000 * 7000)
  }
  try {
    return accessToken
  } catch (error) {
    console.log(error)
  }
}

/**
 * 从缓存中获取Access_Token，如果没有获取到则调用getAccessTokenRequest
 */
const getAccessTokenApi = async(req, res) => {
  const accessToken = await getAccessToken()

  return res.send(accessToken)
}

module.exports = { getAccessToken, getAccessTokenApi }
