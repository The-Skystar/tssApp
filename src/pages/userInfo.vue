<template>
    <div id="userInfo">
      <mt-header title="编辑资料">
        <router-link to="/my" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <mt-cell title="头像" is-link :to="nick">
        <img src="../assets/img/avatar.jpg" class="avatar">
      </mt-cell>
      <mt-cell title="昵称" is-link :to="nick" value="123"></mt-cell>
      <mt-cell title="真实姓名" is-link :to="nick" value="123"></mt-cell>
      <mt-cell title="性别" is-link :to="nick" value="123"></mt-cell>
      <mt-cell title="手机号" is-link :to="nick" value="123"></mt-cell>
      <mt-cell title="家庭电话" is-link :to="nick" value="123"></mt-cell>
      <mt-cell title="邮箱" is-link :to="nick" value="123"></mt-cell>

    </div>
</template>

<script>
  export default {
    name: 'userInfo',
    data(){
      return{
        nick: '/my',
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  #userInfo{
    text-align: left;
  }
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

</style>
