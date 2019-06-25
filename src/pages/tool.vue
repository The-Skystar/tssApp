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
        <div id="sendOrder">
          <ul>
            <li v-for="items in sendOrder">
              <div class="status"><p>裹裹寄件 | {{items.status}}</p><button class="pay" v-if="showPay(items)" @click="pay(items)">付款：{{items.cost}}</button></div>
              <div class="detail">
                <div>
                  <div class="detailTop"><p>{{items.receiver.name}}&nbsp;&nbsp;{{items.receiver.phone}}</p>&nbsp;&nbsp;&nbsp;
                    <span style="color: darkgrey;font-size: 14px">收</span>
                    <!--<mt-button @click="pay">付款</mt-button>-->
                  </div>
                  <div class="detailBot"><p>{{items.receiver.province+items.receiver.city+items.receiver.county+items.receiver.street+items.receiver.address}}</p></div>
                </div>
              </div>
              <div class="orderCode">
                <p>订单号：{{items.orderCode}}</p>
              </div>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div id="recOrder">
          <ul>
            <li v-for="items in receiveOrder">
              <div class="status"><p>裹裹寄件 | 已寄出</p></div>
              <div class="detail">
                <div>
                  <div class="detailTop"><p>{{items.sender.name}}&nbsp;&nbsp;{{items.sender.phone}}</p>&nbsp;&nbsp;&nbsp;<span style="color: darkgrey;font-size: 14px">寄</span></div>
                  <div class="detailBot"><p>{{items.sender.province+items.sender.city+items.sender.county+items.sender.street+items.sender.address}}</p></div>
                </div>
              </div>
              <div class="orderCode">
                <p>订单号：{{items.orderCode}}</p>
              </div>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div id="completed">
          <ul>
            <li v-for="items in completed">
              <div class="status"><p>裹裹寄件 | 已寄出</p></div>
              <div class="detail">
                <div>
                  <div class="detailTop"><p>{{items.receiver.name}}&nbsp;&nbsp;{{items.receiver.phone}}</p>&nbsp;&nbsp;&nbsp;<span style="color: darkgrey;font-size: 14px">收</span></div>
                  <div class="detailBot"><p>{{items.receiver.province+items.receiver.city+items.receiver.county+items.receiver.street+items.receiver.address}}</p></div>
                </div>
              </div>
              <div class="orderCode">
                <p>订单号：{{items.orderCode}}</p>
              </div>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <footer-bar :selected="selected" :tabs="tabs"></footer-bar>
  </div>
</template>

<script>
  import footer from '../components/Footbar'
  import {Toast} from 'mint-ui'
  export default {
    name: 'tool',
    components:{
      'footer-bar': footer,
    },
    data(){
      return{
        selected:'OrderList',
        tabs: [require("../assets/img/home.png"),require("../assets/img/tool_selected.png"), require("../assets/img/user.png")],
        selectedbar:'1',
        sendOrder:[],
        receiveOrder:[],
        completed: [],
      }
    },
    created () { // 页面创建生命周期函数
      this.initWebSocket();
      this.getData()
    },
    mounted(){
    },
    destroyed: function () { // 离开页面生命周期函数
      this.websocketclose()
    },
    methods:{
      pay(items){
        window.location.href = 'http://10.156.85.170:8082/alipay/wap/alipage?subject=快递运费&orderId='+items.orderId+'&cost='+items.cost;

      },
      initWebSocket: function () {
        // ws等同http，wss等同https,其中ip为后端应用主机，port为后端启动所占用的端口
        this.websock = new WebSocket('ws://10.156.85.170:8082/websocket/'+JSON.parse(localStorage.getItem("user")).userId)
        this.websock.onopen = this.websocketonopen
        this.websock.onerror = this.websocketonerror
        this.websock.onmessage = this.websocketonmessage
        this.websock.onclose = this.websocketclose
      },
      websocketonopen: function () {
        console.log('WebSocket连接成功')
      },
      websocketonerror: function (e) {
        console.log('WebSocket连接发生错误')
      },
      websocketonmessage: function (e) {
        console.log(e.data)
      },
      websocketclose: function (e) {
        // console.log('connection closed (' + e.code + ')')
      },
      getData(){
        let config = {
          headers:{
            "token":sessionStorage.getItem("token"),
            "userId":JSON.parse(this.$store.state.currentUser).userId
          }
        }
        let self = this
        this.$axios.get(this.$store.state.url+"/tss/sendOrder?phone="+JSON.parse(this.$store.state.currentUser).userId,config).then(function (res) {
          if (res.data.code===303) {
            self.sendOrder = res.data.data
          }else{
            Toast({
              message:'查询订单失败',
              position:'middle',
              duration:1500
            })
          }
        })
        this.$axios.get(this.$store.state.url+"/tss/recOrder?phone="+JSON.parse(this.$store.state.currentUser).phone,config).then(function (res) {
          if (res.data.code===303) {
            self.receiveOrder = res.data.data
          }else{
            Toast({
              message:'查询订单失败',
              position:'middle',
              duration:1500
            })
          }
        })
        this.$axios.get(this.$store.state.url+"tss/comOrder?phone="+JSON.parse(this.$store.state.currentUser).phone,config).then(function (res) {
          if (res.data.code===303) {
            self.completed = res.data.data
          }else{
            Toast({
              message:'查询订单失败',
              position:'middle',
              duration:1500
            })
          }
        })
      },
      showPay(items){
        if (items.status==='已取件') {
          return true
        }else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  ul{
    margin: 10px;
    padding : 0px;
  }
  li{
    list-style: none;
    width: 100%;
    height: 150px;
    background-color: white;
    border-radius: 10px;
    padding-left: 15px;
    margin-bottom: 10px;
  }

  .status{
    width: 100%;
    height: 35px;
    border-bottom: 1px solid ghostwhite;
    align-items: center;
    display: flex;
  }
  .status p,.orderCode p{
    margin: 0px;
  }
  .detail{
    width: 100%;
    height: 80px;
    border-bottom: 1px solid ghostwhite;
  }
  .orderCode{
    width: 100%;
    height: 35px;
    align-items: center;
    display: flex;
  }
  .detailTop,.detailBot{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .detailTop{
    margin: 0px;
    font-size: 18px;
  }
  .detailBot p{
    font-size: 16px;
    color: darkgrey;
    margin: 0px;

  }
  .pay{
    position: absolute;
    right: 20px;
    border-radius: 5px;
    border: 0px;
  }
</style>
