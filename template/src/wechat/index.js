import allConfig from './config'
const config = allConfig[process.env.NODE_ENV]

// 限制只在微信浏览器打开
export const wxBrowserOnlyMixin = {
  data() {
    return {
      isWeixinBrowser: ''
    }
  },
  mounted() {
    const inDev = process.env.NODE_ENV === 'development'
    this.isWeixinBrowser = /micromessenger/.test(navigator.userAgent.toLowerCase())
    if (inDev) {
      this.isWeixinBrowser = true
    } else {
      if (!this.isWeixinBrowser) {
        const opened = window.open('about:blank', '_self')
        opened.opener = null
        opened.close()
        // this.$alert('请用微信浏览器打开').then(() => {
        //   const opened = window.open('about:blank', '_self')
        //   opened.opener = null
        //   opened.close()
        // })
      }
    }
  }
}

export const wxInitMixin = {
  created() {
    // 微信 SDK 认证
    axios.post('/api/wxSignature', { url: encodeURIComponent(location.href.split('#')[0]) }).then(res => {
      const signature = res.data
      wx.config({
        debug: false,
        appId: config.appId,
        timestamp: signature[1],
        nonceStr: signature[2],
        signature: signature[0],
        jsApiList: [
          'onMenuShareAppMessage',
          'chooseWXPay',
          'onMenuShareTimeline',
          'hideMenuItems'
        ]
      })
    })
  }
}

// 获取微信授权
export const wxAuthMixin = {
  methods: {
    userRegister() {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize' +
      '?appid=' + config.appId +
      '&redirect_uri=' + encodeURIComponent(config.domain + '/register_redirect') + // express 接受此地址
      '&response_type=' + 'code' +
      '&scope=' + 'snsapi_userinfo' +
      '&state=' + config.name +
      '#wechat_redirect'
    }
  }
}

/**
 * 初始化微信分享
 */
export const wxShareMixin = {
  created() {
    this.wxShare(config.wxShareTitle,
      config.wxShareDesc,
      this.wxShareLink(),
      config.wxShareImg)
  },
  methods: {
    // 自定义的分享链接(可选)
    wxShareLink() {
      return location.href
    },
    wxShare(title, desc, link, imgUrl) {
      // 加载微信分享方法
      wx.ready(function() {
        console.log(this)
        wx.onMenuShareAppMessage({
          // 分享标题
          title,
          // 分享描述
          desc,
          // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link,
          // 分享图标
          imgUrl,
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户确认分享后执行的回调函数
            console.log('分享成功')
          },
          cancel: function() {
            console.log('取消分享')
          }
        })
        wx.onMenuShareTimeline({
          title,
          desc,
          link,
          imgUrl,
          type: '',
          dataUrl: '',
          success: function() {
            console.log('分享成功')
          },
          cancel: function() {
            console.log('取消分享')
          }
        })
      })
    }
  }
}

/**
 * 自定义微信分享
 */
export const wxCustomShareMixin = {
  methods: {
    customWxShare(title, desc, link, imgUrl) {
      const shareTitle = title || config.wxShareTitle
      const shareDesc = desc || config.wxShareDesc
      const shareLink = link || this.$parent.wxShareLink()
      const shareImgUrl = imgUrl || config.wxShareImg
      // console.log(shareTitle, shareDesc, shareLink, shareImgUrl)
      this.$parent.wxShare(shareTitle, shareDesc, shareLink, shareImgUrl)
    }
  },
  destroyed() {
    this.$parent.wxShare(config.wxShareTitle,
      config.wxShareDesc,
      config.wxShareLink,
      config.wxShareImg)
  }
}

/**
 * 禁用微信分享
 */
export const wxDisableShareMixin = {
  created() {
    wx.ready(function() {
      wx.hideMenuItems({
        menuList: [
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:share:facebook',
          'menuItem:share:QZone',
          'menuItem:copyUrl',
          'menuItem:originPage',
          'menuItem:openWithQQBrowser',
          'menuItem:openWithSafari',
          'menuItem:share:email'
        ]
      })
    })
  }
}

/**
 * 判断是否关注
 */
export const wxSubscribeMixin = {
  created() {
    axios.post('/api/wxSubscribe', { openid: this.$store.state.openid }).then(res => {
      // console.log(res)
      if (res.data) {
        this.$store.commit('getWxSubscribe', res.data.subscribe)
      }
    })
  }
}

/**
 * 微信支付
 */
export const wxPayMixin = {
  data() {
    return {
      wxOrderNo: '',
      wxMchId: config.mch_id
    }
  },
  methods: {
    // 生成订单号
    wxOrder: function() {
      const date = new Date()
      const Y = date.getFullYear()
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      const D = ('00' + date.getDate()).substr(-2)
      const h = ('00' + date.getHours()).substr(-2)
      const m = ('00' + date.getMinutes()).substr(-2)
      const s = ('00' + date.getSeconds()).substr(-2)
      const ms = ('000' + date.getMilliseconds()).substr(-3)
      const subfix = Math.random().toString().substr(2, 6)
      return `${Y}${M}${D}${h}${m}${s}${ms}${subfix}`
    },
    wxPay: function(openid, body, detail, out_trade_no, total_fee, successCallback, cancelCallback) {
      axios.post('/api/wxpay', { openid, body, detail, out_trade_no, total_fee }).then(res => {
        const data = res.data.data
        wx.ready(function() {
          wx.chooseWXPay({
            appId: data.appId,
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(res) {
              if (res.errMsg === 'chooseWXPay:ok') {
                if (successCallback) successCallback()
              } else {
                this.$alert('支付失败')
                window.location.reload()
              }
            },
            cancel() {
              // this.$alert('支付取消');
              console.log('微信支付取消')
              cancelCallback ? cancelCallback() : window.location.reload()
            },
            error(res) {
              this.$alert('支付失败')
              window.location.reload()
            }
          })
        })
      })
    }
  }
}
