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
    computed: {}
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

