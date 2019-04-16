<template>
  <div id="updPwd">
    <mt-header title="修改密码">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-field placeholder="请输入原密码" type="password" v-model="oldPwd"></mt-field><br>
    <mt-field placeholder="请输入新密码" type="password" v-model="newPwd"></mt-field><br>
    <mt-field placeholder="请确认新密码" type="password" v-model="rePwd"></mt-field><br>
    <mt-button size="large">修改</mt-button>
  </div>
</template>

<script>
  export default {
    name: 'updPwd',
    data(){
      return{
        oldPwd: '',
        newPwd: '',
        rePwd: '',
      }
    }
  }
</script>

<style scoped>

</style>
