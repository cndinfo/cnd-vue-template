<template>
  <div class="hello">
      <h1>{{msg}}</h1>
      <h3>{{accessToken}}</h3>
      <h2>{{userinfo.username}}</h2>
      <img class='emptyGif' :src="emptyGif">
      <button @click="getUserInfo()">获取用户信息</button>
      <button @click="getWechatUserInfo()">获取微信用户信息</button>
      <button @click="login()">登录</button>
      <button @click="getAccessToken()">获取accessToken</button>
  </div>
</template>

<script>
import axios from '@/utils/axios'
import { setToken } from '@/utils/auth'

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
        console.log(res)
        this.userinfo.username = res.data.id
      })
    },
    getWechatUserInfo() {
      axios.get('/wechat/userinfo/LiJiaSen').then((res) => {
        console.log(res.data)
        this.userinfo.username = res.data.name
      })
    },
    getAccessToken() {
      axios.get('/wechat/accessToken/').then((res) => {
        console.log(res)
        this.accessToken = res.data
      })
    },
    login() {
      const account = 'admin'
      const password = '1'
      axios.post('/api/userinfo/login', { account, password }).then((res) => {
        console.log('登录成功', res.data)

        setToken(res.data.token)
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
