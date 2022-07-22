<template>
  <span>ID</span> <input type="textarea" v-model="id" /> <span>PW</span>
  <input type="password" v-model="pw" />
  <button @click="loginBtn()">로그인</button>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      id: "",
      pw: "",
    };
  },
  methods: {
    loginBtn() {
        var loginData = {
          id : this.id,
          pw : this.pw
        }
        // console.log("postlogin");
        axios.post('api/auth/postlogin', loginData)
        .then((result) => {
          if(result.data == 'err') {
            console.log("fail")
            alert('login fail')
          } else {
            localStorage.setItem("userid", this.id);
            localStorage.setItem("userpw", this.pw);
            localStorage.setItem("username", result.data[0].USER_NAME)
            console.log(result.data[0].USER_NAME)
            if(result.data[0].USER_AUTH == 1) localStorage.setItem("admin", true)
            else localStorage.setItem("admin",false)
            this.$router.push({name:'BoardList'})
          }
        })
      },
  },
};
</script>

<style>
</style>