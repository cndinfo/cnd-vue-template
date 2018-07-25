module.exports = {
  development: {
    name: 'cnd', // 项目名称
    appId: '', // 公众号 app id
    domain: 'http://mydomain.com', // 项目域名
    mch_id: '', // 微信商户号
    wxShareTitle: '', // 微信分享默认标题
    wxShareDesc: '', // 微信分享默认说明
    wxShareLink: location.href, // 微信分享链接（默认当前链接）
    wxShareImg: '' // 微信分享默认缩略图
  },
  testing: {
    name: '',
    appId: '',
    domain: '',
    mch_id: '',
    wxShareTitle: '',
    wxShareDesc: '',
    wxShareLink: location.href,
    wxShareImg: ''
  },
  production: {
    name: '',
    appId: '',
    domain: '',
    mch_id: '',
    wxShareTitle: '',
    wxShareDesc: '',
    wxShareLink: location.href,
    wxShareImg: ''
  }
}
