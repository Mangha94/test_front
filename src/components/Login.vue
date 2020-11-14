<template>
  <div class="wrap-login">
    <div class="inner">
      <h1 class="head-tit"><span class="logo">관리자</span></h1>
      <div>
        <input type="text" id="memberID" name="username" v-model="loginData.username"
               @keyup.enter="loginAct(loginData)" placeholder="아이디" autofocus>
        <input type="password" id="loginPw" name="password" v-model="loginData.password" placeholder="비밀번호"
               autocomplete="current-password" @keyup.enter="loginAct(loginData)">
      </div>
      <button class="btn btn-primary btn-login" @click="loginAct(loginData)">로그인</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      loginData : {username : '', password : ''}
    }
  },
  created () {
  },
  methods : {
    ...mapActions("authSt", ["loginAct"])
  }
}
</script>


<style scoped>

</style>