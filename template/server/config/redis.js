var redis = require('redis')
const config = require('./index')
var redisClient = redis.createClient(config[process.env.NODE_ENV].redis.port, config[process.env.NODE_ENV].redis.host)

redisClient.on('error', function(err) {
  console.log('Error ', err)
})

redisClient.on('connect', function() {
  console.log('Redis is ready')
})

exports.redis = redis
exports.redisClient = redisClient
