var crypto = require('crypto')

exports.secretToken = crypto.randomBytes(64).toString('hex')
const TOKEN_EXPIRATION = 6000
const TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 1000

exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION
exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC
const cache = require('memory-cache')
// 开发环境暂时不开启redis
const redisClient = require('./redis').redisClient

exports.setToken = (token) => {
  if (process.env.NODE_ENV === 'production') {
    redisClient.set(token, '', TOKEN_EXPIRATION_SEC)
  } else {
    if (token != null) {
      cache.put(token, token, TOKEN_EXPIRATION_SEC)
    }
  }
}

// Middleware for token verification
exports.verifyToken = (req, res, next) => {
  var token = getToken(req.headers)

  if (process.env.NODE_ENV === 'production') {
    redisClient.get(token, function(err, reply) {
      if (err) {
        console.log(err)
        return res.send(500)
      }

      if (reply) {
        res.send(401)
      } else {
        next()
      }
    })
  } else {
    if (cache.get(token)) {
      next()
    } else {
      return res.sendStatus(401)
    }
  }
}

var getToken = (headers) => {
  if (headers && headers.authorization) {
    var authorization = headers.authorization
    var part = authorization.split(' ')

    if (part.length === 2) {
      var token = part[1]

      return token
    } else {
      return null
    }
  } else {
    return null
  }
}
