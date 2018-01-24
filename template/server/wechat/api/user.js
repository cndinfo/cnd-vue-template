const request = require('request')
const config = require('../config')
const qs = require('querystring');
const cache = require('memory-cache');


const getAccessToken = require('./accessToken')

const getUserInfoByToken = (token,userId)=> {
  let queryParams = {
    'access_token': token,
    'userid': userId
  }

  let wxGetUserUrl = config.QY_API_DOMAIN + config.QY_API_URL.GET_USER + qs.stringify(queryParams)
  let options = {
    method: 'GET',
    url: wxGetUserUrl
  }
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (res) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  })

}

const getUserInfo = async (req,res) => {
  let token = await getAccessToken()
  getUserInfoByToken(token,req.body.userId).then(val=>{
    res.send(val)
  })
}

module.exports = { getUserInfo }