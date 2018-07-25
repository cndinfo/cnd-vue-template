import Vue from 'vue'
import Vuex from 'vuex'
import wechat from './modules/wechat'

// 每次修改 state 时，在控制台打印一条 logger
import createLogger from 'vuex/dist/logger'
// 非生产环境下开启 debug 调试
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export const store = new Vuex.Store({
  // 开发时开启严格模式，检测 state 修改是否通过 vuex
  strict: debug,
  // 启用插件
  plugins: debug ? [createLogger()] : [],
  modules: {
    wechat
  }
})

export default store
