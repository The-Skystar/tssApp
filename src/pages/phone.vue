<template>
    <div>
      <mt-header title="绑定手机号">
        <router-link to="/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="updUser">保存</mt-button>
      </mt-header>
      <mt-field placeholder="手机号" v-model="phone"></mt-field>
      <span>请确认为11位长度有效手机号</span>
    </div>
</template>

<script>
  export default {
    name: 'phone',
    data(){
      return{
        phone:'',
      }
    },
    methods:{
      updUser(){
        let self = this;
        let params = {
          "phone":this.phone,
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
