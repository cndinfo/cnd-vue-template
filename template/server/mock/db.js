const Mock = require('mockjs')
// const Random = Mock.Random

const mockData = Mock.mock({
  'userList|10': [{
    'userId|+1': 1,
    username: '@cname',
    'userGender|1': [1, 0],
    userMobile: /^1(0|3|4|5|7|8)[0-9]\d{8}$/
  }]
})

module.exports = mockData
