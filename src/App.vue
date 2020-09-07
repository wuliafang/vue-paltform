<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Login from '@/views/login/index'
export default {
  name: 'App',
  data() {
    return {}
  },
  components: 
  {
    // Login
  },
  methods: {
    tranfor() {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 800px;
}
</style>
