<template>
  <div class="hello">
      <h1>{{msg}}</h1>
      <img class='emptyGif' :src="emptyGif">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '微信端Vue模板',
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
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
		width: 35%;
    margin: 0 auto; 
	}
</style>
