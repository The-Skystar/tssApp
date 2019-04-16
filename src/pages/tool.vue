<template>
  <div id="tool">
    <mt-header title="快递订单"></mt-header>
    <mt-navbar v-model="selectedbar">
      <mt-tab-item id="1">寄件订单</mt-tab-item>
      <mt-tab-item id="2">收件订单</mt-tab-item>
      <mt-tab-item id="3">已签收</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selectedbar">
      <mt-tab-container-item id="1">

      </mt-tab-container-item>
      <mt-tab-container-item id="2">

      </mt-tab-container-item>
      <mt-tab-container-item id="3">

      </mt-tab-container-item>
    </mt-tab-container>

    <footer-bar :selected="selected" :tabs="tabs"></footer-bar>
  </div>
</template>

<script>
  import footer from '../components/Footbar'
  export default {
    name: 'tool',
    components:{
      'footer-bar': footer,
    },
    data(){
      return{
        selected:'OrderList',
        tabs: [require("../assets/img/home.png"),require("../assets/img/tool_selected.png"), require("../assets/img/user.png")],
        selectedbar:'1'
      }
    },
    mounted(){
    },
  }
</script>

<style scoped>
  #index{
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }
</style>
