'use strict'
const request = require('request')
const qs = require('querystring')
const config = require('./config')[process.env.NODE_ENV]
const sha1 = require('sha1')
const cache = require('memory-cache')

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

const getJsApiTicket = function(token) {
  const queryParams = {
    'access_token': token,
    'type': 'jsapi'
  }
  const wxGetTicketBaseUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?' + qs.stringify(queryParams)
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

const saveTokenAndTicket = function() {
  let accessToken = cache.get(config.JSSDK_ACCESS_TOKEN)
  let accessTicket = cache.get(config.JSSDK_ACCESS_TICKET)

  if (!accessToken || !accessTicket) {
    return new Promise((resolve, reject) => {
      getAccessToken().then((res) => {
        if (res) {
          // console.log('token', res)
          accessToken = res['access_token']
          cache.put(config.JSSDK_ACCESS_TOKEN, accessToken, 1000 * 7000)
          getJsApiTicket(accessToken).then(res => {
            accessTicket = res['ticket']
            // console.log('ticket', res)
            cache.put(config.JSSDK_ACCESS_TICKET, accessTicket, 1000 * 7000)
            resolve({ accessToken, accessTicket })
          })
        } else {
          reject()
        }
      })
    })
  } else {
    return { accessToken, accessTicket }
  }
}

const createSignature = function(ticket, clientUrl) {
  const noncestr = Math.random().toString(36).substr(2, 15)
  const timestamp = parseInt(new Date().getTime() / 1000) + ''

  // 排序之后加密生成签名
  const sortData = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + decodeURIComponent(clientUrl)
  const signature = sha1(sortData)
  // console.log(sortData)
  return [signature, timestamp, noncestr]
}

// 生成前端使用的签名
const getJsSdkSignature = async function(clientUrl) {
  let accessTicket = cache.get(config.JSSDK_ACCESS_TICKET)

  if (!accessTicket) {
    console.log('no ticket')
    return new Promise((resolve, reject) => {
      saveTokenAndTicket().then(res => {
        if (res) {
          // console.log(res)
          accessTicket = res.accessTicket
          resolve(createSignature(accessTicket, clientUrl))
        } else {
          reject()
        }
      })
    })
  } else {
    console.log('has ticket')
    return createSignature(accessTicket, clientUrl)
  }
}

module.exports = getJsSdkSignature
