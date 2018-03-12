<template>
  <div class="hello">
      <h1>{{msg}}</h1>
      <h3>{{accessToken}}</h3>
      <h2>{{userinfo.username}}</h2>
      <img class='emptyGif' :src="emptyGif">
      <button @click="getUserInfo()">获取用户信息</button>
      <button @click="login()">登录</button>
      <button @click="getAccessToken()">获取accessToken</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '微信端Vue模板',
      userinfo: {
        username: ''
      },
      accessToken: '',
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  methods: {
    getUserInfo() {
      const account = 'admin'
      axios.get('/api/userinfo/get/' + account).then((res) => {
        this.userinfo.username = res.data.data.account
      })
    },
    getAccessToken() {
      axios.get('/wechat/getAccessToken/').then((res) => {
        console.log(res)
        this.accessToken = res.data
      })
    },
    login() {
      const openId = ''
      const username = 'admin'
      const password = 'DtxqK2d9WA'
      axios.post('/api/userinfo/login', { openId, username, password }).then((res) => {
        console.log('登录成功')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>

  h1, h2 {
    font-weight: normal;
  }
  h1 {
    color: #42b983;
  }
  .hello {
    height: 100%;
  }
	.emptyGif {
		display: block;
		width: 25%;
    margin: 0 auto; 
	}
</style>
