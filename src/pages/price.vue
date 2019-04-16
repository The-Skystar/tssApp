<template>
  <div>
    <mt-header title="时效价格">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div id="sender">
      <div id="sendword">
        <p class="word">寄</p>
      </div>
      <div id="senddis">
        <div class="addAddress"  @click="openSend()">
          <input type="text" placeholder="省市区县、镇等" class="txtmangth" disabled="disabled" v-model="sendAddress">
        </div>
        <div class="loca"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
      </div>
    </div>
    <div id="receiver">
      <div id="receiveword">
        <p class="word" style="background-color: limegreen">收</p>
      </div>
      <div id="receivedis">
        <div class="addAddress"  @click="openReceive()">
          <input type="text" placeholder="省市区县、镇等" class="txtmangth" disabled="disabled" v-model="receiveAddress">
        </div>
        <div class="loca"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
      </div>
    </div>
    <mt-cell title="重量" align="left">
      <button class="mybtn" :class="goodsweight===1?'btndisabled':''" @click="reduceWeight">-</button>
      <span class="spanword">{{goodsweight}}&nbsp;kg</span>
      <button class="mybtn" @click="addWeight">+</button>
    </mt-cell>
    <section class="address" :class="{toggHeight:istoggHeight}">
      <section class="title">
        <div class="area" @click="provinceSelected()" :class="[oneac ? 'accolor' : '']">{{Province?Province:'请选择'}}</div>
        <div class="area" @click="citySelected()" :class="[twoac ? 'accolor':'']" v-show="twoshow">{{City?City:'请选择'}}</div>
        <div class="area" @click="districtSelected()" :class="threeac ? 'accolor':''" v-show="threeshow">{{District?District:'请选择'}}</div>
        <div class="area" @click="streetSelected()" :class="fourac ? 'accolor':''" v-show="fourshow">{{Street?Street:'请选择'}}</div>
        <div class="determine" v-show="showDeter" @click="determine()">确定</div>
      </section>
      <ul v-show="showProvince" class="proJuli">
        <li class="addList" v-for="(v,k) in ProvinceList" @click="getProvinceId(v.code, v.name, k)" :key="v.code"  :class="{active : v.selected}"><span>{{v.name}}</span></li>
      </ul>
      <ul v-show="showCity" class="citJuli">
        <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.code, v.name, k)"  :key="v.code"  :class="{active : v.selected}"><span>{{v.name}}</span></li>
      </ul>
      <ul v-show="showDistrict" class="disJuli">
        <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.code, v.name, k)" :key="v.code" :class="{active : v.selected}"><span>{{v.name}}</span></li>
      </ul>
      <ul v-show="showStreet" class="strJuli">
        <li class="addList" v-for="(v,k) in showStreetList" @click="getStreetId(v.code, v.name, k)" :key="v.code" :class="{active : v.selected}"><span>{{v.name}}</span></li>
      </ul>
    </section>
    <!-- 收货地址三级联动选项 end-->
    <div class="layout" :class="{layoutBg:islayout}" @click="closeAdd()"></div>
    <div id="notice">
      <div @click="openDate">
        <mt-cell title="上门时间" is-link align="left">
          <span>{{noticetime}}</span>
        </mt-cell>
      </div>
      <mt-popup position="bottom" v-model="timeVisible" style="width: 100%">
        <p class="timeTitle">寄件时间</p>
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
    <mt-button size="large" type="primary">查询</mt-button>
  </div>

</template>

<script>
  import { zmGetProvincesArr,zmGetCitiesArr,zmGetAreaArr,zmGetStreetArr } from '../assets/js/zmRegion'
  export default {
    name: 'price',
    data(){
      return{
        receiveAddress:'',
        sendAddress:"",
        currentSelected:'',
        goodsweight: 1,
        islayout: false,
        istoggHeight: false,
        headerTxt: '添加新地址',
        isBc: false, // 用于控制保存按钮高亮
        toggle: false, // 用于切换默认地址
        showDeter: false,
        oneac: true,
        twoac: false,
        threeac: false,
        fourac: false,
        twoshow: false,
        threeshow: false,
        fourshow:false,
        userAddress: '',
        oneliIndex: '', // 用于高亮子菜单
        twoliIndex: '',
        threeIndex:'',
        titleIndex: Number,
        showProvince: true, // 第一个li默认显示
        showCity: false, // 第二个li默认隐藏
        showDistrict: false, // 第三个li默认隐藏
        showStreet: false,
        showCityList: [],
        showDistrictList: [],
        showStreetList:[],
        province: '',
        city: '',
        district: '',
        street:'',
        GetProvinceId: 2,
        District: '',
        Province: '',
        City: '',
        Street:'',
        // v-for循环判断是否为当前
        selected: true,
        ProvinceList: zmGetProvincesArr() ,// 三级联动城市列表
        value: false,
        noticetime: '',
        timeVisible: false,
        day: 'today',
        onedisable: false,
        twodisable: false,
        threedisable: false,
        fourdisable: false,
        fivedisable: false,
      }
    },
    mounted () {
      document.querySelector('body').style.backgroundColor = '#f5f7fa';
    },
    created () {
      this.inittime();
      if (this.$route.query.data !== undefined) { // 如果是点击编辑地址过来，则执行...当然了，不一定非要用路由传参的方式，你也可以用本地存储，反正能证明你是点击了编辑地址过来就好
        this.showDeter = true
        this.headerTxt = '编辑收货地址'

        let editDate = JSON.parse(this.$route.query.data)
        this.province = editDate.province
        this.city = editDate.city
        this.district = editDate.district
        address.getAddressData({}).then((res) => { // axios请求，目的获取新增地址时，保存的地址ID，用于高亮显示
          if (res.isSuccess === 1) {
            // 初始化页面，如果是编辑地址的话，则
            this.twoshow = true // 控制第二个nav显示
            this.threeshow = true // 给第三个nav显示
            this.Province = editDate.areaDescription.split(' ')[0]
            this.City = editDate.areaDescription.split(' ')[1]
            this.District = editDate.areaDescription.split(' ')[2]
            this.showCityList = this._filter(this.info, 'city', editDate.province) // editDate.province由后台获取的id
            this.showDistrictList = this._filter(this.showCityList, 'district', editDate.city) // editDate.city由后台获取的id
            // 高亮后台返回选中的地址，需要对应id
            this._newArr(this.info, editDate.province)
            this._newArr(this.showCityList, editDate.city)
            this._newArr(this.showDistrictList, editDate.district)
          }
        })
      } else {
        //   address.getAddressData({}).then((res) => {
        //     if (res.isSuccess === 1) {
        //       this.info = res.resData[0].regionalInformation
        //     }
        //   })
      }
    },
    watch:{

    },
    methods:{
      openSend(){
        this.currentSelected = 'sender';
        this.islayout = true
        this.istoggHeight = true
        if (this.$route.query.data !== undefined) {
          this._gotoTop('.proJuli', 0)
        }
      },
      openReceive(){
        this.currentSelected = 'receiver';
        this.islayout = true
        this.istoggHeight = true
        if (this.$route.query.data !== undefined) {
          this._gotoTop('.proJuli', 0)
        }
      },
      openDate(){
        this.timeVisible = true;
      },
      choseAdd: function () { // 选择地址弹层，打开弹层
        this.islayout = true
        this.istoggHeight = true
        if (this.$route.query.data !== undefined) {
          this._gotoTop('.proJuli', 0)
        }
      },
      closeAdd: function () { // 关闭弹层
        this.istoggHeight = false
        this.islayout = false
      },
      determine () {
        this.istoggHeight = false
        this.islayout = false
        // this.showDeter = false
        if (this.currentSelected==='sender')
          this.sendAddress = this.Province + ' ' + this.City + ' ' + this.District + ' ' + this.Street;
        if (this.currentSelected==='receiver')
          this.receiveAddress = this.Province + ' ' + this.City + ' ' + this.District + ' ' + this.Street;
      },
      _newArr (arr, selectid) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id === selectid) {
            this.$set(arr[i], 'selected', true)
          } else if (selectid === -1) {
            this.$set(arr[i], 'selected', false)
          }
        }
        return arr
      },
      _filter (add, name, code) { // 数组，对应数组内容，对应数组id
        let result = []
        for (let i = 0; i < add.length; i++) {
          if (code === add[i].id) {
            // console.log(code, add[i].id)
            result = add[i][name]
          }
        }
        return result
      },
      _gotoTop (info, index) { // 滚动距离 --> 对应class,第几个index
        let proJuliBox = document.querySelector(info)
        let activeBox = document.getElementsByClassName('active')[index]
        let t = activeBox.offsetTop - 67 + 20 // 后面的数据，根据页面情况自己调整
        proJuliBox.scrollTo(0, t)
      },
      getProvinceId: function (code, input, index) { // 点击第一个li
        console.log('code', code, input, index)
        this.titleIndex = Number
        this.province = code
        this.Province = input // 获取选中的省份
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
        this.showStreet = false
        // this.showCityList = this._filter(this.info, 'city', this.province)
        this.showCityList = zmGetCitiesArr(code)
        // 点击选择当前
        // this.info.map(a => { a.selected = false })
        // this.info[index].selected = true
        // console.log(this.info[index].name) // 点击的省份的名字

        this.oneac = false // 给第一个nav去掉高亮
        this.twoac = true // 给第二个nav添加高亮
        this.threeac = false // 去除第三个li的高亮
        this.fourac = false
        this.twoshow = true // 控制第二个nav显示
        // this.City = false // 清除市级和区级nav选项
        // this.District = false // 清除市级和区级nav选项
        this.City = '' // 第二nav置空
        this.threeshow = false // 第三nav隐藏
        this.oneliIndex = index
        this._newArr(this.showCityList, -1) // 清除市级高亮
        this.showDeter = false
      },
      provinceSelected: function () {
        // console.log('点击了第一个nav')
        // this.titleIndex = 1
        // 清除市级和区级列表
        // this.showCityList = true
        // this.showDistrictList = true
        // 清除市级和区级nav选项
        // this.City = false
        // this.District = false
        // 选项页面的切换
        this.showProvince = true
        this.showCity = false
        this.showDistrict = false
        this.showStreet = false
        this.oneac = true // 给第一个nav添加高亮
        this.twoac = false // 给第二个nav去除高亮
        this.threeac = false // 给第三个nav去掉高亮
        this.fourac = false
      },
      getCityId: function (code, input, index) { // 点击第二个li
        // console.log('id', code, input, 'index', index)
        this.titleIndex = Number
        this.city = code
        this.City = input
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
        this.showStreet = false
        this.showDistrictList = zmGetAreaArr(code)
        // 选择当前添加active
        // this.showCityList.map(a => { a.selected = false })
        // this.showCityList[index].selected = true
        this.twoliIndex = index

        this.twoac = false // 给第二个nav去除高亮
        this.threeac = true // 给第三个nav添加高亮
        this.fourac = false
        this.threeshow = true // 给第三个nav显示
        this.District = '' // 第三nav置空
        this._newArr(this.showDistrictList, -1) // 清除区级高亮
        this.showDeter = false
      },
      citySelected: function () {
        // console.log('点击了第二个nav')
        this.titleIndex = 2
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
        this.showStreet = false

        this.oneac = false // 给第一个nav添加高亮
        this.twoac = true // 给第二个nav去除高亮
        this.threeac = false // 给第三个nav去掉高亮
        this.fourac = false
        if (this.$route.query.data !== undefined) {
          this.$nextTick(() => { // 让li标签回到顶部
            this._gotoTop('.citJuli', 1)
          })
        }
      },
      getDistrictId: function (code, input, index) {
        this.titleIndex = Number
        this.district = code
        this.District = input
        this.showProvince = false
        this.showCity = false
        this.showDistrict = false
        this.showStreet = true
        this.showStreetList = zmGetStreetArr(code);
        // 选择当前添加active
        // this.showDistrictList.map(a => { a.selected = false })
        // this.showDistrictList[index].selected = true
        // 选取市区选项之后关闭弹层
        this.threeIndex = index

        this.oneac = false // 给第一个nav去掉高亮
        this.twoac = false // 给第二个nav去除高亮
        this.threeac = false // 给第三个nav添加高亮
        this.fourac = true
        this.fourshow = true // 给第四个nav显示
        this.showDeter = false
      },
      districtSelected: function () { // 第三个选择
        // console.log('点击了第三个nav')
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
        this.showStreet = false

        this.oneac = false // 给第一个nav添加高亮
        this.twoac = false // 给第二个nav去除高亮
        this.threeac = true // 给第三个nav去掉高亮
        this.fourac = false
        if (this.$route.query.data !== undefined) {
          this.$nextTick(() => { // 让li标签回到顶部
            this._gotoTop('.disJuli', 2)
          })
        }
      },
      getStreetId: function (code, input, index) {
        this.titleIndex = Number
        this.street = code
        this.Street = input
        // 选择当前添加active
        // this.showDistrictList.map(a => { a.selected = false })
        // this.showDistrictList[index].selected = true
        // 选取市区选项之后关闭弹层
        this.oneac = false // 给第一个nav去掉高亮
        this.showDeter = true
        this.determine()
      },
      streetSelected: function () { // 第四个选择
        // console.log('点击了第三个nav')
        this.showProvince = false
        this.showCity = false
        this.showDistrict = false
        this.showStreet = true

        this.oneac = false // 给第一个nav添加高亮
        this.twoac = false // 给第二个nav去除高亮
        this.threeac = false // 给第三个nav去掉高亮
        this.fourac = true
        if (this.$route.query.data !== undefined) {
          this.$nextTick(() => { // 让li标签回到顶部
            this._gotoTop('.strJuli', 2)
          })
        }
      },
      isdefault(){
        console.log(this.value);
      },
      addWeight(){
        this.goodsweight += 1;
      },
      reduceWeight(){
        this.goodsweight = this.goodsweight-1;
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
        } else if (this.day==='tomorrow'){
          this.noticetime = "预约 明天 "+hour;
        } else if (this.day==='afterday'){
          this.noticetime = "预约 后天 "+hour;
        }
        this.timeVisible = false;
      },
      inittime(){
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
      }
    },
    beforeDestroy () {
      document.querySelector('body').style.backgroundColor = '#fff'
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
    justify-content: center;
    align-items: center;
  }
  #receiver{
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
  .noaddress p{
    height: 70px;
    margin: 0;
    text-align: left;
    font-size: 16px;
    color: #6d6d72;
    line-height: 70px;
    letter-spacing: 5px;
  }
  input:focus{
    outline: none;
  }
  .addAddress{
    display: flex;
    width: 93%;
  }
  .addAddress input {
    float: left;
    width: 93%;
    padding: 0px;
    border: 0px;
    background: white;
    margin: 0;
    height: 41px;
    margin: 0;
    font-size: 16px;
  }
  #senddis,#receivedis{
    background-color: white;
    overflow: auto;
    height: 41px;
    width: 85%;
    display: flex;
  }
  .loca{
    width: 7%;
    float: left;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ac{color: #000!important;border-bottom: 0.02rem solid #fff!important;}
  .myAddress{
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245,245,245,1);
    color:#333;
  }
  .proJuli,.citJuli,.disJuli,.strJuli{
    margin: 0;
    padding: 0;
  }
  .myAddress .cont{
    border-bottom: 1px solid rgba(245,245,245,0.8);
  }
  .myAddress .cont span{
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
  }
  .myAddress .cont section{
    float:left;
  }
  .myAddress .cont p{
    display: inline-block;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.88rem;
    margin-left: 1rem;
  }
  .myAddress .cont .pic2{
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
  }
  .myAddress .cont p.text{
    margin-left: 0.72rem;
  }
  .address{
    position:absolute;
    bottom:0;
    left:0;
    z-index:121;
    background:#fff;
    width:100%;
    height: 0;
    overflow: hidden;
    transition: height .5s;
  }
  .toggHeight{
    height: 385px;
  }
  .layout{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:120;
    opacity: 0;
    transition: all .5s;
    background:rgb(53, 58, 60);
    visibility: hidden;
  }
  .layoutBg{opacity: .7; visibility: visible;}
  .area{
    float: left;
    display:inline-block;
    font-size:14px;
    height: 24px;
    line-height:24px;
    margin-left:21px;
    color:#262e31;
    margin-top: 15px;
    max-width: calc(100% - 80%);overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
  }
  .addList{
    margin-left: 20px;
    font-size:15px;
    line-height:33px;
    color:#262e31;
  }
  /* 修改的格式 */
  .address ul{
    height: calc(100% - .82rem);
    overflow:auto;
  }
  .address ul li{
    list-style: none;
    text-align: left;
  }
  .address .title .accolor{
    color: #d2a24e;
    border-bottom:0.04rem solid #d2a24e;
  }
  .address ul .active{
    color:#d2a24e;
  }
  .address ul .active span::after{
    content: '';
    background-image: url(../assets/img/gou_img.png);
    width: .4rem;
    height: .2rem;
    background-repeat: no-repeat;
    background-size: .2rem .13rem;
    background-position: left .16rem center;
    display: inline-block;
  }
  .title{
    height: 40px;
    border-bottom: .01rem solid #8a96a3;
  }
  .determine{
    display: inline-block;
    width: .75rem;
    text-align: center;
    float: right;
    height: .82rem;
    line-height: .82rem;
    margin-right: .3rem;
    color: #d2a24e;
    font-size: .28rem;
  }
  .mybtn{
    width: 30px;
    height: 30px;
    margin: 0px 18px;
    border-radius: 50%;
    font-size: 18px;
    background-color: white;
    border: 1px solid dodgerblue;
    color: dodgerblue;
  }
  .mybtn:focus{
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
</style>
