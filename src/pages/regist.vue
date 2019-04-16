<template>
  <div id="regist">
    <mt-header title="注册账号">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div>
      <mt-field label="昵称" placeholder="请输入昵称" v-model="usernick" class="usernick"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" class="usernick"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="code">
        <mt-button size="small">发送验证码</mt-button>
      </mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
      <mt-field label="确认密码" placeholder="请确认密码" type="password" v-model="repwd"></mt-field>
      <mt-button size="large">注册</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'regist',
    data(){
      return{
        usernick: '',
        email: '',
        pwd: '',
        repwd: '',
        code: '',
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
