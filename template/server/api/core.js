const request = require('request')
var config = require('./config')
const apiUrl = process.env.NODE_ENV === 'development' ? config.dev.apiUrl : config.pro.apiUrl
const eap_username = process.env.NODE_ENV === 'development' ? config.dev.eap_username : config.pro.eap_username
const eap_password = process.env.NODE_ENV === 'development' ? config.dev.eap_password : config.pro.eap_password

const apiKit = (boId, methodName, params) => {
  params = JSON.stringify(params) + ''

  const data = {
    'eap_username': eap_username,
    'eap_password': eap_password,
    'methodName': methodName,
    'boId': boId,
    'returnType': 'json',
    'parameters': params
  }
  console.log('请求api data属性：', data)
  const options = {
    form: data
  }
  return new Promise((resolve, reject) => {
    request.post(apiUrl, options, function(err, res, body) {
      if (res) {
        resolve(body)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = apiKit
