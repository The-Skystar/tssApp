<!--<template>-->
  <!--<div id="tab-bar">-->
    <!--<mt-tabbar v-model="selected" v-show="isShow" fixed class="border-1px-top">-->
      <!--<mt-tab-item id="main">-->
        <!--<img :src="img1" slot="icon">寄快递-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="tool">-->
        <!--<img :src="img3" slot="icon">查快递-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="my">-->
        <!--<img :src="img5" slot="icon">我的-->
      <!--</mt-tab-item>-->
    <!--</mt-tabbar>-->
  <!--</div>-->
<!--</template>-->
<!--<style>-->
<!--</style>-->
<!--<script>-->
  <!--export default {-->
    <!--data(){-->
      <!--return {-->
        <!--selected: 'main',-->
        <!--img1: "static/home_selected.png",-->
        <!--img3: "static/tool.png",-->
        <!--img5: "static/user.png"-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
      <!--isShow: function () {-->
        <!--return true;-->
      <!--}-->
    <!--},-->
    <!--watch: {-->
      <!--// selected:function (val,oldVal) {-->
      <!--//   switch (val) {-->
      <!--//     case 'main':-->
      <!--//       this.$router.push('/');-->
      <!--//       this.img1 = "static/home_selected.png";-->
      <!--//     break;-->
      <!--//     case 'tool':-->
      <!--//       this.$router.push('/tool');-->
      <!--//       this.img1 = "static/tool_selected.png";-->
      <!--//       break;-->
      <!--//     case 'my':-->
      <!--//       this.$router.push('/my');-->
      <!--//       this.img1 = "static/user_selected.png";-->
      <!--//       break;-->
      <!--//   }-->
      <!--// }-->
      <!--selected: {-->
        <!--handler(){-->
          <!--if (this.selected == "main") {-->
            <!--this.$router.push('/index');-->
            <!--this.img1 = "static/home_selected.png";-->
          <!--} else {-->
            <!--this.img1 = "static/home.png"-->
          <!--}-->
          <!--if (this.selected == "tool") {-->
            <!--this.$router.push('/tool');-->
            <!--this.img3 = 'static/tool_selected.png'-->
          <!--} else {-->
            <!--this.img3 = 'static/tool.png'-->
          <!--}-->
          <!--if (this.selected == "my") {-->
            <!--this.$router.push('/my'),-->
            <!--this.img5 = "static/user_selected.png";-->
          <!--} else {-->
            <!--this.img5 = "static/user.png";-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->


我的手机 2019/4/15 9:59:11
<template>
  <mt-tabbar v-model="message" fixed>
    <mt-tab-item id="MainPage">
      <img slot="icon" :src="this.atabs[0]">
      首页
    </mt-tab-item>
    <mt-tab-item id="OrderList">
      <img slot="icon" v-bind:src="this.atabs[1]">
      订单
    </mt-tab-item>
    <mt-tab-item id="UserCenter">
      <img slot="icon" v-bind:src="this.atabs[2]">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>


<script>
  export default {
    data(){
      return{
        //选中的tabbar值message为外面页面传入的值selected
        message:this.selected,
        //这里使用的icon图标为图片，所以需要加图片改变的传入，若使用阿里图标，则不用加
        atabs:this.tabs,
      }
    },
    props:{
      selected: String,
      tabs:Array,
    },
    watch: {
      message: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定去向
        switch(val){
          case 'MainPage':
            this.$router.push('/');
            break;
          case 'OrderList':
            this.$router.push('/tool');
            break;
          case 'UserCenter':
            this.$router.push('/my');
            break;
        }
      }
    },
  }
</script>
