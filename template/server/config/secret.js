var crypto = require('crypto')

exports.secretToken = crypto.randomBytes(64).toString('hex')
const TOKEN_EXPIRATION = 7000
const TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 1000

exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION
exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC
const cache = require('memory-cache')

exports.setToken = (token) => {
  if (token != null) {
    cache.put(token, token, TOKEN_EXPIRATION_SEC)
  }
}

// Middleware for token verification
exports.verifyToken = (req, res, next) => {
  var token = getToken(req)
  if (cache.get(token)) {
    next()
  } else {
    res.sendStatus(401)
  }
}

var getToken = (req) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization
    var part = authorization.split(' ')

    if (part.length === 2) {
      token = part[1]

      return token
    } else {
      return null
    }
  } else if (token) {
    return token
  }
}
