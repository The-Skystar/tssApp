<template>
  <div>
    <mt-header title="绑定邮箱">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="updUser">保存</mt-button>
    </mt-header>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" class="usernick" @blur.native.capture="checkEmail" :state="emailstate"></mt-field>
    <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="code">
      <mt-button size="small" @click="sendCode">{{btntext}}</mt-button>
    </mt-field>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'email',
    data(){
      return{
        emailstate:'',
        email:'',
        btntext:'发送验证码',
        code:'',
        time:60
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
          this.$axios.post(this.$store.state.url+"/tss/validate",this.qs.stringify(params)).then(function (res) {
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
          this.$axios.post(this.$store.state.url+"/tss/sendEmail",this.qs.stringify(param)).then(function (res) {
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
      updUser(){
        let self = this;
        let params = {
          "email":this.email,
          "userId":JSON.parse(this.$store.state.currentUser).userId,
          "ver":this.code,
        };
        let headers = {
          headers:{
            "token":sessionStorage.getItem("token"),
            "userId":JSON.parse(this.$store.state.currentUser).userId
          }
        }
        this.$axios.post(this.$store.state.url+"/tss/updUser",this.qs.stringify(params),headers).then(function (res) {
          if (res.data.code==118){
            localStorage.setItem("user",JSON.stringify(res.data.data));
            self.$store.dispatch('setUser',JSON.stringify(res.data.data));
            self.$router.push("/user");
          }else {
            Toast({
              message:res.data.msg,
              position:'middle',
              duration:1000
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
