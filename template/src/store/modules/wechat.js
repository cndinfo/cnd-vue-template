import { getStore, setStore } from '@/utils/localstorage'

const wechat = {
  state: {
    openid: getStore('openid')
  },

  mutations: {
    GET_OPEN_ID: (state, payload) => {
      state.openid = payload
      setStore('openid', payload)
    }
  }
}

export default wechat
