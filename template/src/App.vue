<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
  import { wxShareMixin, wxInitMixin, wxBrowserOnlyMixin } from '@/wechat'
  export default {
    name: 'app',
    mixins: [wxShareMixin, wxInitMixin, wxBrowserOnlyMixin]
  }
</script>

<style lang="scss">
#app {
  font-family: PingFang SC, -apple-system, BlinkMacSystemFont, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
