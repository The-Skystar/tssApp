<template>
  <div id="app">
    <div class="content-div">
      <!--<transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">-->
      <router-view/>
      <!--</transition>-->
    </div>
    <!--<footer-bar class="footer"></footer-bar>-->
  </div>
</template>

<script>
  // import Footer from './components/Footbar'
  export default {
    name: 'app',
    // components: {
    //   'footer-bar': Footer
    // },
    computed: {},
    created () {
      var self = this;
      let currentUser = localStorage.getItem("user");
      if (currentUser!=null){
        let user = JSON.parse(currentUser);
        let params = {
          "token":localStorage.getItem("token")
        }
        this.$axios.post("/tss/autoLogin",this.qs.stringify(params)).then(function (res) {
          if (res.data.code==100){
            localStorage.setItem("user",JSON.stringify(res.data.data));
            localStorage.setItem("token",res.data.msg);
            sessionStorage.setItem("token",res.data.msg);
            self.$store.dispatch('setUser',JSON.stringify(res.data.data));
            self.$store.dispatch("updLogin",true);
          }
        })
      };

    },

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 60px;
    margin-top: 0px;
  }
  .content-div {
    margin-bottom: 55px;
  }
</style>

