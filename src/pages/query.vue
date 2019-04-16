<template>
  <div>
    <mt-header title="快递查询">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div id="search">
      <input type="text" placeholder="请输入快递单号" v-model="orderCode">
      <button>识别</button>
      <button @click="queryOrder">查询</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'query',
    data(){
      return{
        orderCode:'',
      }
    },
    methods:{
      queryOrder(){
        let data={
          com:'yuantong',
          nu:this.orderCode
        }
        this.$axios.get('http://127.0.0.1:8081/query?com=yuantong&nu='+this.orderCode,this.qs.stringify(data)).then(function (res) {
          console.log(res.data);
        })
      }
    },
    watch:{

    }
  }
</script>

<style scoped>
  #search{
    width: 100%;
    height: 30px;
    display: flex;
    margin-top: 2px;
    border: 1px solid dodgerblue;
  }
  #search input{
    display: inline-flex;
    width: 70%;
    outline: none;
    border: none;
  }
  #search button{
    display: inline-flex;
    width: 15%;
    justify-content: center;
    align-items: center;
    outline: none;
    border-left: 1px solid dodgerblue;
    border-bottom: 0;
    border-top: 0;
    border-right: 0;
  }
</style>
