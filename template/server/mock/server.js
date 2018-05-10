const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = '5000'

// use db file generated from mock.js
const db = require('./db.js')
const router = jsonServer.router(db)

server.use(middlewares)

// 重写路由，把请求 URL 转成 json-server 支持的格式
server.use(jsonServer.rewriter({
  // 搜索用户列表
  '/api?methodName=searchCustomerList&searchValue=:searchValue': '/customerList?q=:searchValue'
}))

server.use(router)

// 返回自定义格式数据，列表查询就放在 result 中，非列表查询就直接返回 data
router.render = (req, res) => {
  if (req.originalUrl.indexOf('pageSize') > -1) {
    res.jsonp({
      data: { result: res.locals.data },
      errorCode: '200',
      message: '请求数据成功'
    })
  } else if (res.locals.data.length === 1) {
    res.jsonp({
      data: res.locals.data[0],
      errorCode: '200',
      message: '请求数据成功'
    })
  } else {
    res.jsonp({
      data: res.locals.data,
      errorCode: '200',
      message: '请求数据成功'
    })
  }
}

server.listen(port, () => {
  console.log('JSON Server is running at: http://localhost: ' + port)
})
