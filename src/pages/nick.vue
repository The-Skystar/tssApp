<template>
    <div>
      <mt-header title="设置昵称">
        <router-link to="/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="updUser">保存</mt-button>
      </mt-header>
      <mt-field placeholder="昵称" v-model="nick"></mt-field>
      <span>昵称严禁包含暴力、色情等违法信息，可由数字、字母、下划线组成，最大长度不可超过20位</span>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'nick',
    data(){
      return{
        nick:'',
      }
    },
    methods:{
      updUser(){
        let self = this;
        let params = {
          "userNick":this.nick,
          "userId":JSON.parse(this.$store.state.currentUser).userId
        };
        let headers = {
          headers:{
            "token":sessionStorage.getItem("token"),
            "userId":JSON.parse(this.$store.state.currentUser).userId
          }
        }
        this.$axios.post("/tss/updUser",this.qs.stringify(params),headers).then(function (res) {
          if (res.data.code==118){
            localStorage.setItem("user",JSON.stringify(res.data.data));
            self.$store.dispatch('setUser',JSON.stringify(res.data.data));
            self.$router.push("/user");
          }else {
            Toast({
              message:'设置昵称失败',
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
