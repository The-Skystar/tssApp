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
          <mt-field placeholder="请输入用户名/邮箱/手机号" v-model="user" state="success"></mt-field><br>
          <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field><br>
          <mt-button size="large">登录</mt-button><br>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div id="verLogin">
          <mt-field placeholder="请输入邮箱" type="email" v-model="email"></mt-field><br>
          <mt-field placeholder="请输入验证码" type="number" v-model="code">
          <mt-button>发送验证码</mt-button>
          </mt-field><br>
          <mt-button size="large">登录</mt-button>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return{
        user: '',
        password: '',
        email: '',
        code: '',
        selected: '1'
      }
    },

  }
</script>

<style>
  #login{

  }
</style>
