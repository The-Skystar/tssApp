<template>
  <div id="regist">
    <mt-header title="注册账号">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div>
      <mt-field label="昵称" placeholder="请输入昵称" v-model="usernick" class="usernick"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" class="usernick" @blur.native.capture="checkEmail" :state="emailstate"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="code">
        <mt-button size="small" @click="sendCode">{{btntext}}</mt-button>
      </mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
      <mt-field label="确认密码" placeholder="请确认密码" type="password" v-model="repwd"></mt-field>
      <mt-button size="large" @click="registUser">注册</mt-button>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'regist',
    data(){
      return{
        usernick: '',
        email: '',
        pwd: '',
        repwd: '',
        code: '',
        btntext:'发送验证码',
        time:60,
        emailstate:''
      }
    },
    methods:{
      checkEmail(){
        var self = this;
        let regEmail=new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if(this.email==''){
          this.emailstate = "error";
        }else if(!regEmail.test(this.email)){
          this.emailstate = "error";
        }else {
          let params = {
            "column":"email",
            "value":this.email
          }
          this.$axios.post("/tss/validate",this.qs.stringify(params)).then(function (res) {
            if (res.data.code==112) {
              self.emailstate = "success";
            }else if (res.data.code==111){
              Toast({
                message:'邮箱已被占用',
                position:'middle',
                duration:1000
              });
              self.emailstate='error';
            }
          })
        }
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
      registUser(){
        var self = this;
        if (this.pwd==this.repwd){
          let params = {
            "userNick":this.usernick,
            "email":this.email,
            "ver":this.code,
            "pwd":this.pwd,
          };
          this.$axios.post("/tss/reg",self.qs.stringify(params)).then(function (res) {
            if (res.data.code==109) {
              let params ={
                "str":self.email,
                "pwd":self.pwd,
              }
              self.$axios.post("/tss/pwdLogin",self.qs.stringify(params)).then(function (res) {
                if (res.data.code!=100){
                  Toast({
                    message:'自动登录失败',
                    position:'middle',
                    duration:1000
                  });
                  self.$router.push('/login')
                }else {
                  localStorage.setItem("user",JSON.stringify(res.data.data));
                  localStorage.setItem("token",res.data.msg);
                  sessionStorage.setItem("token",res.data.msg);
                  self.$store.dispatch('setUser',JSON.stringify(res.data.data));
                  self.$store.dispatch("updLogin",true);
                  self.$router.push("/my");
                }
              })
            }else {
              Toast({
                message:res.data.msg,
                position:'middle',
                duration:1000
              })
            }
          })
        } else {
          Toast({
            message: '两次输入密码不一致',
            position: 'middle',
            duration: 1000
          })
        }

      }
    }
  }
</script>

<style scoped>
  .usernick{
    margin-top: 5px;
    font-size: 12px;
  }
</style>
