import { loginByAccount, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    username: '',
    account: '',
    userId: getUser(),
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    loginByAccount({ commit }, userInfo) {
      const account = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        loginByAccount(account, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          commit('SET_USERID', data.userId)
          setToken(data.token)
          setUser(data.userId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('state.userId ' + state.userId)
        getUserInfo(state.userId).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }

          const data = response.data
          commit('SET_USERID', data.id)
          setUser(data.id)
          // TODO 临时
          commit('SET_USERNAME', data.id)
          commit('SET_ROLES', data.roleUsers)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_USERID', '')
          // TODO 临时
          commit('SET_USERNAME', '')
          commit('SET_TOKEN', '')
          commit('SET_ACCOUNT', '')
          commit('SET_ROLES', [])
          console.log('logout')
          removeUser()
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

  }
}

export default user