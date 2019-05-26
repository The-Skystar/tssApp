<template>
    <div>
      <mt-header title="绑定家庭电话号">
        <router-link to="/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="updUser">保存</mt-button>
      </mt-header>
      <mt-field placeholder="家庭电话" v-model="tel"></mt-field>
      <span>请确认为有效家庭电话号</span>
    </div>
</template>

<script>
  export default {
    name: 'phone',
    data(){
      return{
        tel:'',
      }
    },
    methods:{
      updUser(){
        let self = this;
        let params = {
          "tel":this.tel,
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
