module.exports = {
  development: {
    JSSDK_ACCESS_TOKEN: 'access_token',
    JSSDK_ACCESS_TICKET: 'access_ticket',
    appId: '', // 公众号 appid
    appSecret: '', // 公众号 appsecret
    domain: 'http://mydomain.com',
    auth_redirect: '/#/sign-up?', // 网页授权之后的回调URL（默认授权之后跳转到登录界面）
    certDir: './server/router/wechat/apiclient_cert.p12', // 商户证书路径
    mch_id: '', // 商户 ID
    partner_key: '' // 商户 API 密钥
  },
  testing: {
    JSSDK_ACCESS_TOKEN: 'access_token',
    JSSDK_ACCESS_TICKET: 'access_ticket',
    appId: '',
    appSecret: '',
    domain: 'http://mydomain.com',
    auth_redirect: '/#/sign-up?',
    certDir: './server/router/wechat/apiclient_cert_test.p12',
    mch_id: '',
    partner_key: ''
  },
  production: {
    JSSDK_ACCESS_TOKEN: 'access_token',
    JSSDK_ACCESS_TICKET: 'access_ticket',
    appId: '',
    appSecret: '',
    domain: 'http://mydomain.com',
    auth_redirect: '/#/sign-up?',
    certDir: './server/router/wechat/apiclient_cert.p12',
    mch_id: '',
    partner_key: ''
  }
}
