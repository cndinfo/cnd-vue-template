const request = require('request')
const config = require('../../config')
const qs = require('querystring')

const accessToken = require('./qy_accessToken')

const getUserInfoByToken = (token, userId) => {
  const queryParams = {
    'access_token': token,
    'userid': userId
  }

  const wxGetUserUrl = config.QY_API_DOMAIN + config.QY_API_URL.GET_USER + qs.stringify(queryParams)
  const options = {
    method: 'GET',
    url: wxGetUserUrl
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

const getUserInfo = async (req, res) => {
  const token = await accessToken.getAccessToken(req, res)
  getUserInfoByToken(token, req.params.userId).then(val => {
    res.send(val)
  })
}

module.exports = { getUserInfo }

