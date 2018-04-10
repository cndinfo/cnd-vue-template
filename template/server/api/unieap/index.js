const request = require('request')
const config = require('../../config')
const apiUrl = config[process.env.NODE_ENV].eap.url
const eap_username = config[process.env.NODE_ENV].eap.eap_username
const eap_password = config[process.env.NODE_ENV].eap.eap_password

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
        resolve(JSON.parse(body))
      } else {
        console.log('输出错误：', err)
        reject(err)
      }
    })
  })
}

module.exports = apiKit
