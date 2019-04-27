<template>
    <div id="userInfo">
  <mt-header title="编辑资料">
    <router-link to="/my" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <mt-cell title="头像" is-link :to="toavatar">
    <img src="../assets/img/avatar.jpg" class="avatar">
  </mt-cell>
  <mt-cell title="昵称" is-link :to="tonick">
    <span>{{nick}}</span>
  </mt-cell>
  <mt-cell title="真实姓名" is-link :to="torealname">
    <span>{{realname}}</span>
  </mt-cell>
  <div @click="showPopup">
    <mt-cell title="性别" is-link>
      <span>{{sex}}</span>
    </mt-cell>
  </div>
  <mt-popup position="bottom" v-model="popupVisible" style="width: 100%">
    <p class="poptitle">性别</p>
    <ul>
      <li @click="selectMan">男</li>
      <li @click="selectWoman">女</li>
    </ul>
    <div style="width: 100%;height: 5px;background-color: whitesmoke"></div>
    <button class="btn">取消</button>
  </mt-popup>
  <mt-cell title="手机号" is-link :to="tophone">
    <span>{{phone}}</span>
  </mt-cell>
  <mt-cell title="家庭电话" is-link :to="totel">
    <span>{{tel}}</span>
  </mt-cell>
  <mt-cell title="邮箱" is-link :to="toemail">
    <span>{{email}}</span>
  </mt-cell>

</div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'userInfo',
    data(){
      return{
        toavatar: '/my',
        tonick:'/nick',
        torealname:'/realname',
        // tosex:'',
        tophone:'/phone',
        totel:'/tel',
        toemail:'/email',
        nick:'未设置昵称',
        realname:'未设置实名',
        sex:'未设置性别',
        phone:'未绑定手机号',
        tel:'未设置家庭电话',
        email:'未绑定邮箱',
        popupVisible:false,
      }
    },
    created(){
      let user = JSON.parse(this.$store.state.currentUser);
      if (user.userNick!=null)
        this.nick = user.userNick;
      if (user.realname!=null)
        this.realname = user.realname;
      if (user.sex=='1')
        this.sex = '男';
      if (user.sex=='0')
        this.sex = '女';
      if (user.phone!=null)
      this.phone = user.phone;
      if (user.tel!=null)
      this.tel = user.tel;
      if (user.email!=null)
      this.email = user.email;
    },
    methods:{
      showPopup(){
        this.popupVisible=true;
      },
      selectMan(){
        let self = this;
        let params = {
          "sex":'男',
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
            self.sex = '男';
            Toast({
              message:'设置性别成功',
              position:'middle',
              duration:1000
            })
          }else {
            Toast({
              message:'设置性别失败',
              position:'middle',
              duration:1000
            })
          }
        })
        this.popupVisible = false;
      },
      selectWoman(){
        let self = this;
        let params = {
          "sex":'女',
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
            self.sex = '女';
            Toast({
              message:'设置性别成功',
              position:'middle',
              duration:1000
            })
          }else {
            Toast({
              message:'设置性别失败',
              position:'middle',
              duration:1000
            })
          }
        })
        this.popupVisible = false;
      }
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
  .poptitle{
    text-align: center;
    height: 50px;
    border-bottom: 1px solid whitesmoke;
    margin: 0px;
    line-height: 50px;
  }
  ul{
    margin: 0;
  }
  li{
    display: flex;
    list-style: none;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
  }
  .btn{
    width: 100%;
    background-color: white;
    border: 0;
    height: 50px;
    letter-spacing: 5px;
    outline: none;
  }
</style>
