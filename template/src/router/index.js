import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

const Demo = () => import('@/components/HelloWorld')

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: Demo
    },
    {
      // 服务端微信静默授权之后跳转到此URL，存入 openid
      path: '/wxAuth',
      redirect: to => {
        store.commit('GET_OPEN_ID', to.query.openid)
        const redirect = to.query.redirectUrl.split('#/')[1]
        return { path: `/${redirect}`, query: null }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const redirectUrl = location.href
  const openid = store.state.wechat.openid
  const isWeixinBrowser = /micromessenger/.test(navigator.userAgent.toLowerCase())

  // 判断是否有微信授权（主要针对游客）
  if (openid || !isWeixinBrowser) {
    // 已经授权过或者不是微信浏览器（测试）
    next()
  } else {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize' +
      '?appid=' + wxConfig.appId +
      '&redirect_uri=' + encodeURIComponent(wxConfig.domain + '/wxSilentAuth?' + qs.stringify({ redirectUrl })) +
      '&response_type=' + 'code' +
      '&scope=' + 'snsapi_base' +
      '&state=' + 'auction' +
      '#wechat_redirect'
  }
})

export default router
