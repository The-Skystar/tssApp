<template>
  <div id="index">
    <mt-header title="寄快递"></mt-header>
    <div id="sender">
      <div id="sendword">
        <p class="word">寄</p>
      </div>
      <div id="sendaddress" v-show="issend^false" @click="editSender">
        <div class="nametel">
          <p class="sendname">{{sendname}}&#8195;{{sendtel}}</p>
        </div>
        <div class="dis">
          <p class="senddis">{{senddis}}</p>
        </div>
        <div class="addr">
          <p class="sendaddress">{{sendaddress}}</p>
        </div>
      </div>
      <div class="noaddress" v-show="issend^true" @click="editSender">
        <p>寄件人信息</p>
      </div>
      <div id="sendico">
        <!--<img src="../../static/data.png" class="ico">-->
        <mt-cell is-link></mt-cell>
      </div>
    </div>
    <div id="receiver">
      <div id="receiveword">
        <p class="word" style="background-color: limegreen">收</p>
      </div>
      <div id="receiveaddress" v-show="isreceive^false" @click="editReceiver">
        <div class="nametel">
          <p class="sendname">{{receivername}}&#8195;{{receivertel}}</p>
        </div>
        <div class="dis">
          <p class="senddis">{{receiverdis}}</p>
        </div>
        <div class="addr">
          <p class="sendaddress">{{receiveraddress}}</p>
        </div>
      </div>
      <div class="noaddress" v-show="isreceive^true" @click="editReceiver">
        <p>寄件人信息</p>
      </div>
      <div id="receiveico">
        <!--<img src="../../static/data.png" class="ico">-->
        <mt-cell is-link></mt-cell>
      </div>
    </div>
    <div @click="openPopup">
      <mt-cell title="物品类型" is-link align="left">
        <span>{{goodstype}}</span>
      </mt-cell>
    </div>
    <mt-popup position="bottom" v-model="popupVisible" style="width: 100%">
      <p class="poptitle">选择物品类型</p>
      <table>
        <tr>
          <td>
            <p :class="goodsseleted==='ry'?'goodstype':''" @click="checkType('日用品','ry')">日用品</p>
          </td>
          <td>
            <p :class="goodsseleted==='sm'?'goodstype':''" @click="checkType('数码产品','sm')">数码产品</p>
          </td>
          <td>
            <p :class="goodsseleted==='yf'?'goodstype':''" @click="checkType('衣服','yf')">衣服</p>
          </td>
        </tr>
        <tr>
          <td>
            <p :class="goodsseleted==='sp'?'goodstype':''" @click="checkType('食品','sp')">食品</p>
          </td>
          <td>
            <p :class="goodsseleted==='wj'?'goodstype':''" @click="checkType('文件','wj')">文件</p>
          </td>
          <td>
            <p :class="goodsseleted==='qt'?'goodstype':''" @click="checkType('其他','qt')">其他</p>
          </td>
        </tr>
      </table>
    </mt-popup>
    <mt-cell title="重量" align="left">
      <button class="btn" :class="goodsweight===1?'btndisabled':''" @click="reduceWeight">-</button>
      <span class="spanword">{{goodsweight}}&nbsp;kg</span>
      <button class="btn" @click="addWeight">+</button>
    </mt-cell>
    <div @click="opennum">
      <mt-cell title="包裹数量" align="left" style="padding-left: 0px" @click="addWeight">
        <span>{{goodsnum}}</span>&nbsp;&nbsp;
        <span>个</span>
      </mt-cell>
    </div>
    <mt-popup v-model="shownum" position="bottom" style="width: 100%">
      <mt-picker :slots="numbers" @change="selectNum"></mt-picker>
    </mt-popup>
    <div id="notice">
      <div @click="openDate">
        <mt-cell title="上门时间" is-link align="left">
          <span>{{noticetime}}</span>
        </mt-cell>
      </div>
      <mt-popup position="bottom" v-model="timeVisible" style="width: 100%">
        <p class="timeTitle">上门时间</p>
        <div id="appTime">
          <div id="appDay">
            <div class="appdaydiv" :class="day==='today'?'appday':''" @click="selectday('today')">今天</div>
            <div class="appdaydiv" :class="day==='tomorrow'?'appday':''" @click="selectday('tomorrow')">明天</div>
            <div class="appdaydiv" :class="day==='afterday'?'appday':''" @click="selectday('afterday')">后天</div>
          </div>
          <div id="appHour">
            <ul id="list">
              <li id="one" :class="onedisable&day==='today'?'disable':'timeli'" @click="selectHour('09:00-11:00','one')">
                09:00&nbsp;-&nbsp;11:00
                <img src="">
              </li >
              <li id="two" :class="twodisable&day==='today'?'disable':'timeli'"  @click="selectHour('11:00-13:00','two')">
                11:00&nbsp;-&nbsp;13:00
                <img src="">
              </li>
              <li id="three" :class="threedisable&day==='today'?'disable':'timeli'"  @click="selectHour('13:00-15:00','three')">
                13:00&nbsp;-&nbsp;15:00
                <img src="">
              </li>
              <li id="four" :class="fourdisable&day==='today'?'disable':'timeli'"  @click="selectHour('15:00-17:00','four')">
                15:00&nbsp;-&nbsp;17:00
                <img src="">
              </li>
              <li id="five" :class="fivedisable&day==='today'?'disable':'timeli'"  @click="selectHour('17:00-19:00','five')">
                17:00&nbsp;-&nbsp;19:00
                <img src="">
              </li>
            </ul>
          </div>
        </div>
      </mt-popup>
    </div>
    <mt-cell is-link to="/remark" title="备注" v-model="remark" align="left"></mt-cell>
    <mt-button size="large" type="primary" @click="createOrder">提交订单</mt-button>
    <footer-bar :selected="selected" :tabs="tabs"></footer-bar>
  </div>
</template>

<script>
  import footer from '../components/Footbar'
  import {Toast} from 'mint-ui'
  export default {
    name: 'index',
    components:{
      'footer-bar': footer
    },
    data(){
      return{
        selected:'MainPage',
        tabs: [require("../assets/img/home_selected.png"),require("../assets/img/tool.png"), require("../assets/img/user.png")],
        issend: this.$store.state.addrStatus.sender,
        isreceive: this.$store.state.addrStatus.receiver,
        sendname: this.$store.state.addrStatus.sender?JSON.parse(this.$store.state.sender).contact:'',
        sendtel: this.$store.state.addrStatus.sender?JSON.parse(this.$store.state.sender).phone:'',
        senddis: this.$store.state.addrStatus.sender?JSON.parse(this.$store.state.sender).district:'',
        sendaddress: this.$store.state.addrStatus.sender?JSON.parse(this.$store.state.sender).address:'',
        receivername: this.$store.state.addrStatus.receiver?JSON.parse(this.$store.state.receiver).contact:'',
        receivertel: this.$store.state.addrStatus.receiver?JSON.parse(this.$store.state.receiver).phone:'',
        receiverdis: this.$store.state.addrStatus.receiver?JSON.parse(this.$store.state.receiver).district:'',
        receiveraddress: this.$store.state.addrStatus.receiver?JSON.parse(this.$store.state.receiver).address:'',
        popupVisible: false,
        goodstype: '日用品',
        goodsseleted: 'ry',
        noticetime: '',
        startTime:'',
        endTime:'',
        timeVisible: false,
        day: 'today',
        onedisable: false,
        twodisable: false,
        threedisable: false,
        fourdisable: false,
        fivedisable: false,
        goodsweight:1,
        shownum: false,
        goodsnum:'选填',
        remark:this.$store.state.remark,
        numbers:[
          {
            values:['选填','1','2','3','4','5','6'],
          }
        ],
        isnoctice:'0',
      }
    },
    created(){
        let current = new Date();
        let hour = current.getHours();
        if (hour<9){
          this.onedisable=false;
          this.twodisable=false;
          this.threedisable=false;
          this.fourdisable=false;
          this.fivedisable=false;
        } else if(hour<11){
          this.onedisable=true;
          this.twodisable=false;
          this.threedisable=false;
          this.fourdisable=false;
          this.fivedisable=false;
        } else if(hour<13){
          this.onedisable=true;
          this.twodisable=true;
          this.threedisable=false;
          this.fourdisable=false;
          this.fivedisable=false;
        } else if(hour<15){
          this.onedisable=true;
          this.twodisable=true;
          this.threedisable=true;
          this.fourdisable=false;
          this.fivedisable=false;
        } else if(hour<17){
          this.onedisable=true;
          this.twodisable=true;
          this.threedisable=true;
          this.fourdisable=true;
          this.fivedisable=false;
        } else{
          this.onedisable=true;
          this.twodisable=true;
          this.threedisable=true;
          this.fourdisable=true;
          this.fivedisable=true;
        }
        // this.issend = this.$store.state.addrStatus.sender;
        // this.isreceive = this.$store.state.addrStatus.receiver;
        // this.sendname=this.issend?JSON.parse(this.$store.state.sender).contact:'';
        // this.sendtel=this.issend?JSON.parse(this.$store.state.sender).phone:'';
        // this.senddis=this.issend?JSON.parse(this.$store.state.sender).district:'';
        // this.sendaddress=this.issend?JSON.parse(this.$store.state.sender).address:'';
        // this.receivername=this.isreceive?JSON.parse(this.$store.state.receiver).contact:'';
        // this.receivertel=this.isreceive?JSON.parse(this.$store.state.receiver).phone:'';
        // this.receiverdis=this.isreceive?JSON.parse(this.$store.state.receiver).district:'';
        // this.receiveraddress=this.isreceive?JSON.parse(this.$store.state.receiver).address:'';
    },
    mounted(){


    },
    methods:{
      openPopup(){
        this.popupVisible = true;
      },
      checkType(obj,id){
        this.goodsseleted = id;
        this.goodstype = obj;
        this.popupVisible = false;
      },
      openDate(){
        this.timeVisible = true;
      },
      opennum(){
        this.shownum = true;
      },
      selectday(obj){
        this.day = obj;
      },
      selectHour(hour,id){
        document.getElementById("one").style.color = 'black';
        document.getElementById("two").style.color = 'black';
        document.getElementById("three").style.color = 'black';
        document.getElementById("four").style.color = 'black';
        document.getElementById("five").style.color = 'black';
        document.getElementById(id).style.color = 'blue';
        if (this.day==='today'){
          this.noticetime = "预约 今天 "+hour;
          this.startTime = this.getDay(0,'-')+' '+hour.split("-")[0]+":00";
          this.endTime = this.getDay(0,'-')+' '+hour.split("-")[1]+":00";
        } else if (this.day==='tomorrow'){
          this.noticetime = "预约 明天 "+hour;
          this.startTime = this.getDay(1,'-')+' '+hour.split("-")[0]+":00";
          this.endTime = this.getDay(1,'-')+' '+hour.split("-")[1]+":00";
        } else if (this.day==='afterday'){
          this.noticetime = "预约 后天 "+hour;
          this.startTime = this.getDay(2,'-')+' '+hour.split("-")[0]+":00";
          this.endTime = this.getDay(2,'-')+' '+hour.split("-")[1]+":00";
        }
        this.timeVisible = false;
        this.isnoctice = '1';
      },
      getDay(num,str){
        let day = new Date();
        let nowTime = day.getTime();
        let ms = 24*3600*1000*num;
        day.setTime(parseInt(nowTime+ms));
        let year = day.getFullYear();
        let month = day.getMonth()+1;
        let strDate = day.getDate();
        if (month >= 1 && month <= 9) {
          month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate;
        }
        let result = year + str + month + str + strDate;
        return result;
      },
      addWeight(){
        this.goodsweight += 1;
      },
      reduceWeight(){
        this.goodsweight = this.goodsweight-1;
      },
      selectNum(picker,val){
        this.goodsnum = val[0];
      },
      editSender(){
        this.$store.dispatch('setSendCourier',true);
        this.$store.dispatch('setRecipient','sender');
        this.$router.push("/addres")
      },
      editReceiver(){
        this.$store.dispatch('setSendCourier',true);
        this.$store.dispatch('setRecipient','receiver');
        this.$router.push("/addres")
      },
      createOrder(){
        if (this.$store.state.isLogin) {
          let user = JSON.parse(this.$store.state.currentUser);
          let send = JSON.parse(this.$store.state.sender);
          let receive = JSON.parse(this.$store.state.receiver)
          let sender = {
            "type":'1',
            "name":send.contact,
            "phone":send.phone,
            "postCode":send.postcode,
            "province":send.province,
            "city":send.city,
            "county":send.county,
            "street":send.street,
            "address":send.address
          };
          let receiver = {
            "type":'2',
            "name":receive.contact,
            "phone":receive.phone,
            "postCode":receive.postcode,
            "province":receive.province,
            "city":receive.city,
            "county":receive.county,
            "street":receive.street,
            "address":receive.address
          };
          let goods = {
            "goodsType":this.goodsseleted,
            "numb":Number(this.goodsnum),
            "weight":this.goodsweight,
          };
          let params = {
            "userId": user.userId,
            "isNotice":this.isnoctice,
            "startTime":this.startTime,
            "endTime":this.endTime,
            "remark":this.remark,
            "sender":sender,
            "receiver":receiver,
            "goods":goods,
          }
          let config = {
            headers:{
              "token":sessionStorage.getItem("token"),
              "userId":JSON.parse(this.$store.state.currentUser).userId,
              "Content-Type":"application/json"
            }
          }
          console.log(params)
          let self = this;
          this.$axios.post(this.$store.state.url+"/tss/create",params,config).then(function (res) {
            if (res.data.code===500){
              Toast({
                message:'系统错误',
                position:'middle',
                duration:1500
              })
            }else if(res.data.code===999){
              self.$router.push("/tool")
              Toast({
                message:'下单成功',
                position:'middle',
                duration:1500
              })
            }
            console.log(res.data)
          })
        }else{
          Toast({
            message:'您还没有登录',
            position:'middle',
            duration:1500
          })
          setTimeout(function (){self.$router.push("/login")},1500);
        }
      }
    }
  }
</script>

<style scoped>
  #sender,#receiver{
    width: 100%;
    height: 70px;
    margin-top: 5px;
    background-color: white;
    display: inline-flex;
  }
  #receiver{
    margin-bottom: 5px;
  }
  #notice{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  #sendword,#receiveword{
    /*border: 1px solid red;*/
    width: 15%;
    height: 100%;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  #sendaddress,#receiveaddress,.noaddress{
    /*border: 1px solid red;*/
    width: 73%;
    height: 100%;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: column;
  }
  #sendico,#receiveico{
    /*border: 1px solid red;*/
    background-color: white;
    width: 12%;
    height: 100%;
    display: inline-flex;
    display: -webkit-inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .word{
    width: 38px;
    height: 38px;
    line-height: 38px;
    background-color: dodgerblue;
    color: white;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    text-align: center;
  }
  .nametel,.dis,.addr{
    display: inline-flex;
    flex-direction: row;
  }
  .sendname,.senddis,.sendaddress{
    margin: 0;
    font-size: 14px;
    padding: 0px;
    color: #6d6d72;
  }
  .ico{
    width: 30px;
    height: 30px;
  }
  .noaddress p{
    height: 70px;
    margin: 0;
    text-align: left;
    font-size: 16px;
    color: #6d6d72;
    line-height: 70px;
    letter-spacing: 5px;
  }
  table{
    width: 100%;
    border-top: 1px solid lightgrey;
  }
  td{
    width: 30%;
  }
  td p{
    width: 90px;
    height: 36px;
    margin: 10px auto;
    line-height: 40px;
    background-color: whitesmoke;
    border-radius: 20px;
    text-align: center;
  }
  .goodstype{
    background-color: lightskyblue;
  }
  .poptitle{
    text-align: center;
  }
  .timeTitle{
    text-align: center;
    height: 50px;
    margin: 0;
    line-height: 50px;
  }
  #appTime{
    width: 100%;
    height: 300px;
    display: flex;
    border-top: 1px solid lightgrey;
  }
  #appDay{
    width: 38%;
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
  }
  #appHour{
    width: 62%;
    display: flex;
  }
  .appdaydiv{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
  }
  .appday{
    background-color: white;
    color: blue;
  }
  ul{
    padding: 0;
    margin: 0;
  }
  .timeli{
    list-style: none;
    width: 222px;
    height: 40px;
    padding: 0;
    margin-left: 10px;
    line-height: 40px;
    letter-spacing: 2px;
    border-bottom: 1px solid lightgrey;
  }
  .disable{
    list-style: none;
    width: 222px;
    height: 40px;
    padding: 0;
    margin-left: 10px;
    line-height: 40px;
    letter-spacing: 2px;
    border-bottom: 1px solid lightgrey;
    pointer-events: none;
    color: darkgrey;
  }
  .selected{
    color: blue;
  }
  li img{
    margin-left: 70px;
  }
  .btn{
    width: 30px;
    height: 30px;
    margin: 0px 12px;
    border-radius: 50%;
    font-size: 18px;
    background-color: white;
    border: 1px solid dodgerblue;
    color: dodgerblue;
  }
  .btn:focus{
    outline: none;
  }
  .spanword{
    color: black;
    letter-spacing: 3px;
  }
  .btndisabled{
    border: 1px solid darkgrey;
    color: darkgrey;
    pointer-events: none;
  }
</style>
