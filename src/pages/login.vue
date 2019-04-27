<template>
  <div id="login">
    <mt-header title="登录">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">忘记密码？</mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">密码登录</mt-tab-item>
      <mt-tab-item id="2">验证码登录</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div id="pwdLogin">
          <mt-field placeholder="请输入用户名/邮箱/手机号" v-model="user"></mt-field><br>
          <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field><br>
          <mt-button size="large" @click="pwdLogin">登录</mt-button><br>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div id="verLogin">
          <mt-field placeholder="请输入邮箱" type="email" v-model="email"></mt-field><br>
          <mt-field placeholder="请输入验证码" type="number" v-model="code">
          <mt-button @click="sendCode">{{btntext}}</mt-button>
          </mt-field><br>
          <mt-button size="large" @click="codeLogin">登录</mt-button>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'login',
    data(){
      return{
        user: '',
        password: '',
        email: '',
        code: '',
        selected: '1',
        btntext:'发送验证码',
        time:60
      }
    },
    methods:{
      pwdLogin(){
        var self = this;
        let params = {
          "str":this.user,
          "pwd":this.password,
        }
        this.$axios.post("/tss/pwdLogin",this.qs.stringify(params)).then(function (res) {
          if (res.data.code!=100){
            console.log(res);
            Toast({
              message:res.data.msg,
              position:'middle',
              duration:1000
            })
          }else {
            localStorage.setItem("user",JSON.stringify(res.data.data));
            localStorage.setItem("token",res.data.msg);
            sessionStorage.setItem("token",res.data.msg);
            self.$store.dispatch('setUser',JSON.stringify(res.data.data));
            self.$store.dispatch("updLogin",true);
            self.$router.push("/my");
          }
        })
      },
      codeLogin(){
        var self = this;
        let params = {
          "email":this.email,
          "ver":this.code,
        }
        this.$axios.post("/tss/emailLogin",this.qs.stringify(params)).then(function (res) {
          if (res.data.code!=100){
            console.log(res);
            Toast({
              message:res.data.msg,
              position:'middle',
              duration:1000
            })
          }else {
            localStorage.setItem("user",JSON.stringify(res.data.data));
            localStorage.setItem("token",res.data.msg);
            sessionStorage.setItem("token",res.data.msg);
            self.$store.dispatch('setUser',JSON.stringify(res.data.data));
            self.$store.dispatch("updLogin",true);
            self.$router.push("/my");
          }
        })
      },
      timer() {
        if (this.time > 0) {
          this.time--;
          this.btntext=this.time+"s后重新获取";
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.btntext="获取验证码";
          this.disabled=false;
        }
      },
      sendCode(){
        if (this.email.length==0) {
          Toast({
            message: '亲，输入邮箱',
            position: 'middle',
            duration: 1000
          })
        }else {
          let self = this;
          let param = {"email":this.email};
          this.$axios.post("/tss/sendEmail",this.qs.stringify(param)).then(function (res) {
            if (res.data.code==113){
              self.timer();
            }else {
              Toast({
                message: '发送失败,请稍后重试',
                position: 'middle',
                duration: 1000
              })
            }
          })
        }
      },
    }
  }
</script>

<style>
  #login{

  }
</style>
