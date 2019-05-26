<template>
    <div>
      <mt-header title="设置真实姓名">
        <router-link to="/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="updUser">保存</mt-button>
      </mt-header>
      <mt-field placeholder="真实姓名" v-model="realname"></mt-field>
      <span>请输入你的真实姓名，务必确保是与身份证姓名一致的合法姓名，否则无法实名认证！</span>
    </div>
</template>

<script>
  export default {
    name: 'realname',
    data(){
      return{
        realname:'',
      }
    },
    methods:{
      updUser(){
        let self = this;
        let params = {
          "realname":this.realname,
          "userId":JSON.parse(this.$store.state.currentUser).userId
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
              message:'设置实名失败',
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
