<template>
  <div id="my">
    <div id="header">
      <div id="header-left">
        <img src="../assets/img/avatar.jpg" class="avatar">
      </div>
      <div id="header-right">
        <p class="name" v-show="loginStatus^false">{{username}}</p>
        <p class="phone" v-show="loginStatus^false">
          {{phone}}
        </p>
        <p class="loginRegist" v-show="loginStatus^true"><a href="#/login" @click="toLogin">登录</a>/<a href="#/regist" @click="toRegist">注册</a></p>
      </div>

    </div>
    <div id="service">
      <p class="service-title">个人服务</p>
      <hr>
      <table>
        <tr>
          <td @click="toUserInfo">
            <img src="../../static/editor.png" class="icon">
            <p>个人信息</p>
          </td>
          <td @click="toUpdPwd">
            <img src="../../static/editor.png" class="icon">
            <p>修改密码</p>
          </td>
          <td @click="toValidate">
            <img src="../../static/editor.png" class="icon">
            <p>实名认证</p>
          </td>
        </tr>
        <tr>
          <td @click="toAddress">
            <img src="../../static/editor.png" class="icon">
            <p>地址管理</p>
          </td>
          <td>
            <img src="../../static/editor.png" class="icon">
            <p>上课签到</p>
          </td>
          <!--<td @click="exitLogin">-->
            <!--<img src="../../static/editor.png" class="icon">-->
            <!--<p>客服服务</p>-->
          <!--</td>-->
        </tr>
      </table>
    </div>
    <div id="kd">
      <p class="service-title">快递服务</p>
      <hr>
      <table>
        <tr>
          <td @click="toPrice">
            <img src="../../static/editor.png" class="icon">
            <p>时效价格</p>
          </td>
          <td @click="toQuery">
            <img src="../../static/editor.png" class="icon">
            <p>物流查询</p>
          </td>
          <td>

          </td>
        </tr>

      </table>
    </div>
    <footer-bar :selected="selected" :tabs="tabs"></footer-bar>
  </div>
</template>

<script>
  import footbar from '../components/Footbar'
  export default {
    name: 'my',
    components:{
      'footer-bar': footbar,
    },
    data () {
      return {
        loginStatus:this.$store.state.isLogin,
        selected:'UserCenter',
        tabs: [require("../assets/img/home.png"),require("../assets/img/tool.png"), require("../assets/img/user_selected.png")],
        username:'',
        phone:'',
      }
    },
    created () { // 页面创建生命周期函数
      this.initWebSocket();
      this.loginState();
    },
    mounted(){
    },
    destroyed: function () { // 离开页面生命周期函数
      this.websocketclose()
    },
    methods: {
      initWebSocket: function () {
        // ws等同http，wss等同https,其中ip为后端应用主机，port为后端启动所占用的端口
        this.websock = new WebSocket('ws://127.0.0.1:8082/websocket/999')
        this.websock.onopen = this.websocketonopen
        this.websock.onerror = this.websocketonerror
        this.websock.onmessage = this.websocketonmessage
        this.websock.onclose = this.websocketclose
      },
      websocketonopen: function () {
        console.log('WebSocket连接成功')
      },
      websocketonerror: function (e) {
        console.log('WebSocket连接发生错误')
      },
      websocketonmessage: function (e) {
        // var da = JSON.parse(e.data)
        console.log(e.data)
        this.message = e.data
      },
      websocketclose: function (e) {
        console.log('connection closed (' + e.code + ')')
      },
      toLogin:function () {
        this.$router.push('/login')
      },
      toRegist:function () {
        this.$router.push('/regist')
      },
      toUserInfo:function () {
        this.goto("/user");
      },
      toUpdPwd:function () {
        this.goto("/updPwd");
      },
      toValidate:function () {
        if (localStorage.getItem("validate")!=null){
          this.$router.push("/validateInfo");
        } else {
          this.goto('/validate');
        }
      },
      toAddress:function () {
        this.goto('/addres');
      },
      toPrice:function () {
        this.$router.push('/price')
      },
      toQuery:function () {
        this.$router.push('/query')
      },
      loginState(){
        let user = JSON.parse(this.$store.state.currentUser);
        this.username=user.userNick;
        if (user.phone==null){
          this.phone='未绑定手机号'
        } else {
          let jmPhone = user.phone.substr(0,3)+"****"+user.phone.slice(-4);
          this.phone=jmPhone;
        }
      },
      goto(url){
        let user = JSON.parse(this.$store.state.currentUser);
        if (user==null){
          this.$router.push("/login");
        }else {
          this.$router.push(url)
        }
      }
    }
  }
</script>

<style scoped>
  #header{
    height: 150px;
  }
  #header-right{
    float: left;
    margin-top: 40px;
    width: 70%;
    height: 100px;

  }
  #header-left{
    float: left;
    margin-top: 40px;
    width: 30%;
    height: 100px;
    text-align: center;
  }
  .avatar{
    width: 80px;
    height: 80px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }
  .name{
    display: block;
    /*font-family: 楷体;*/
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 1%;
    margin-bottom: 0px;
    text-align: left;
  }
  .phone{
    /*font-family: 楷体;*/
    display: block;
    height: 25px;
    margin-top: 0px;
    margin-left: 2%;
    text-align: left;
    line-height: 25px;
    border-radius: 12px;
    color: dimgrey;
  }
  #service{
    width: 90%;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 15px;
    background-color: rgb(255,255,255);
  }
  #kd{
    width: 90%;
    height: 125px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    padding-top: 15px;
    background-color: rgb(255,255,255);
  }
  hr{
    height: 1px;
    border: none;
    margin: 0px;
    background-color: lightgray;
  }
  .service-title{
    height: 16px;
    /*font-family: 楷体;*/
    font-size: 18px;
    margin-left: 5%;
    margin-top: 0px;
    margin-bottom: 15px;
    text-align: left;
    background-color: rgb(255,255,255);
  }
  table{
    width: 98%;
    height: 70%;
    /*margin-left:  auto;*/
    /*margin-right: auto;*/
    margin: 10px auto;
  }
  td{
    width: 30%;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
  }
  .icon{
    width: 30px;
    height: 30px;
  }
  td p{
    margin: 0px;
  }
  .loginRegist{
    height: 100px;
    margin: 0px;
    text-align: left;
    /*font-family: 微软雅黑;*/
    font-size: 24px;
    color: dimgrey;
    line-height: 100px;
  }
  .loginRegist a{
    text-decoration: none;
    color: dimgrey;
    letter-spacing: 5px;
  }
</style>
