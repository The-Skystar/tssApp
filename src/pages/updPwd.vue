<template>
  <div id="updPwd">
    <mt-header title="修改密码">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">原密码修改</mt-tab-item>
      <mt-tab-item id="2">验证码修改</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-field placeholder="请输入原密码" type="password" v-model="oldPwd"></mt-field>
        <mt-field placeholder="请输入新密码" type="password" v-model="newPwd"></mt-field>
        <mt-field placeholder="请确认新密码" type="password" v-model="rePwd"></mt-field><br>
        <mt-button size="large" @click="updPwd">修改</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-field placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
        <mt-field placeholder="请输入验证码" type="number" v-model="code">
          <mt-button @click="sendCode">{{btntext}}</mt-button>
        </mt-field>
        <mt-field placeholder="请输入新密码" type="password" v-model="newPwd"></mt-field>
        <mt-field placeholder="请确认新密码" type="password" v-model="rePwd"></mt-field><br>
        <mt-button size="large" @click="updPwdByCode">修改</mt-button>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'updPwd',
    data(){
      return{
        oldPwd: '',
        newPwd: '',
        rePwd: '',
        selected: '1',
        btntext:'发送验证码',
        email:'',
        code:'',
        time:60,
      }
    },
    methods:{
      updPwd(){
        let user = JSON.parse(this.$store.state.currentUser);
        if (user!=null){
          if (this.pwd==this.repwd){
            let params = {
              "id":user.userId,
              "oldPwd":this.oldPwd,
              "newPwd":this.newPwd,
            };
            let headers = {
              headers:{
                "token":sessionStorage.getItem("token"),
                "userId":JSON.parse(this.$store.state.currentUser).userId
              }
            };
            let self = this;
            this.$axios.post(this.$store.state.url+"/tss/updPwd",self.qs.stringify(params),headers).then(function (res) {
              if (res.data.code==120) {
                let params ={
                  "str":user.userId,
                  "pwd":self.newPwd,
                }
                self.$axios.get(this.$store.state.url+"/tss/exit?userId="+user.userId).then(function (res) {
                  if (res.data.code==102) {
                    self.$axios.post(this.$store.state.url+"/tss/pwdLogin",self.qs.stringify(params)).then(function (res) {
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
                      message:'请注销后重新登录',
                      position:'middle',
                      duration:1000
                    });
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
        } else {
          this.$router.push("/loin");
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
      updPwdByCode(){
        let user = JSON.parse(this.$store.state.currentUser);
        if (user!=null){
          if (this.pwd==this.repwd){
            let params = {
              "id":user.userId,
              "newPwd":this.newPwd,
              "email":this.email,
              "ver":this.code,
            };
            let headers = {
              headers:{
                "token":sessionStorage.getItem("token"),
                "userId":JSON.parse(this.$store.state.currentUser).userId
              }
            };
            let self = this;
            this.$axios.post(this.$store.state.url+"/tss/updPwd",self.qs.stringify(params),headers).then(function (res) {
              if (res.data.code==120) {
                let params ={
                  "str":user.userId,
                  "pwd":self.newPwd,
                }
                self.$axios.get(this.$store.state.url+"/tss/exit?userId="+user.userId).then(function (res) {
                  if (res.data.code==102) {
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
                      message:'请注销后重新登录',
                      position:'middle',
                      duration:1000
                    });
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
        } else {
          this.$router.push("/loin");
        }
      }
    }
  }
</script>

<style scoped>

</style>
