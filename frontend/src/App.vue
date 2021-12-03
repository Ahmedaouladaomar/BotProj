<template>
  <div id="login">
    <router-view name="Login"></router-view>
    <router-view name="Overview"></router-view>
  </div>
  
</template>
<script>
import store from './store'
export default {
  name : 'login',
  mounted(){
  store.commit('setUser', null)
  store.commit('setToken', null)
  }
 }

    
  
</script>


<style lang="css" scoped>
#login{
  background-color: #f6faff;
  height: 100vh;
}
</style>