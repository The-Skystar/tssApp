<template>
  <div>
    <mt-header title="时效价格">
      <router-link to="/price" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <ul>
      <li v-for="item in price">
        <div id="img">
          <img :src="item.logo" style="width: 40px;height: 40px" alt="">
        </div>
        <div id="content">
          <div id="top">
            <p>{{item.companyName}}</p>
          </div>
          <div id="bottom">
            <p>预计{{item.avgTime}}天送达&nbsp;&nbsp;&nbsp;&nbsp;{{item.totalPrice==null?'暂无价格':item.totalPrice+'元'}}</p>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: 'priceResult',
    data(){
      return{
        price:null,
      }
    },
    created () {
      this.price = JSON.parse(this.$store.state.priceResult)
    }
  }
</script>

<style scoped>
  ul{
    padding: 0;
    margin: 8px 0px;
  }
  li{
    width: 100%;
    height: 60px;
    margin-left: 5px;
    list-style: none;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 10px;
    background-color: white;
    display: flex;
  }
  #img{
    display: flex;
    width: 20%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  #content{
    width: 80%;
    height: 100%;
  }
  #top,#bottom{
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
  }
</style>
