<template>
  <div>
    　　<transition :name="transitionName">
    　　　　<router-view class="child-view"></router-view><--组件中内容-->
    　　</transition>
    　　<!--footer-->
    　　<ul class="footer horizontal-list clear" v-if="footerShow"><--底部导航-->
    　　　　<li><router-link :to="{name:'index'}"><img src="" alt="" v-if="active!=1"><img src="" alt="" v-else>首页</router-link></li>
    　　　　<li><router-link :to="{name:'tool'}"><img class="img" src="" alt="" v-if="active!=2"><img class="img" src="" alt="" v-else>淘特价</router-link></li>
    　　　　<li @click="goCollection()"><img class="img" src="" alt="" v-if="active!=3"><img class="img" src="" alt="" v-else>收藏夹</li>
    　　　　<li><router-link :to="{name:'my'}"><img src="" alt="" v-if="active!=4"><img src="" alt="" v-else>我的</router-link></li>
    　　</ul>
    　　</div>
</template>
<script>
  export default {
    data () {
      return {
        //相关数据
        transitionName: 'slide-left',
        footerShow:true,
        active:1,
        isLogin:''
      }
    },
    //在路由更新之前判断下一个路由跳转来展示页面的显示与隐藏
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack;
      if(to.path!='/'&&to.path!='/tool'&&to.path!='/my'&&to.path!='/'){
        this.footerShow = false
        this.resize(to.path)
      }else{
        this.footerShow = true
        this.resize(to.path)
      }
      if(to.path == '/'){
        this.active = 1;
      }else if(to.path == '/tool'){
        this.active = 2;
      }else if(to.path == '/my'){
        this.active = 3;
      }else if(to.path == '/'){
        this.active = 4;
      }
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next();

    },
    //用过mounted的钩子函数来判断active
    mounted(){
      let route = this.$route.path;
      if(route == '/'){
        this.active = 1;
      }else if(route == '/tool'){
        this.active = 2;
      }else if(route == '/my'){
        this.active = 3;
      }else if(route == '/'){
        this.active = 4;
      }
      if(route!='/'&&route!='/tool'&&route!='/my'&&route!='/'){
        this.footerShow = false
      }else{
        this.footerShow = true
      }
      this.resize( route)
    },
    methods:{
      //当页面因为搜索框使页面窗口变小时动态的隐藏掉底部导航
      resize(router){
        let that=this;
        let status=(router=='/'||router=='/tool'||router=='/my'||router=='/')
        if(status){
          that.footerShow=true;
          window.addEventListener('resize',that.reverse,false)
        }else{
          that.footerShow=false;
          window.removeEventListener('resize',that.reverse,false)
        }
      },
      reverse(){
        this.footerShow=!this.footerShow
      },
      goCollection(){
        this.isLogin = localStorage.getItem('token')
        if(this.isLogin){
          this.$router.push({name:'cart'})
        }else{
          this.$router.push({path:'/login',query:{'backUrl':'/user'}})
        }
      }
    }

  }
</script>
<style >
  .child-view {
    position: absolute;
    width:100%;
    transition: all .4s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(150px, 0);
    transform: translate(150px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-150px, 0);
    transform: translate(-150px, 0);
  }
  .header {
    position:absolute;
    height:44px;
    background:#0058f1;
    width:100%
  }
</style>
