import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as  mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
//const store = new Vuex.Store({
  //定义状态
  state:{
    currentUser:null,   //当前用户
    isLogin:false,   //判断当前用户是否已经登录
    isAuthen:false,
    validateInfo:null,
    isSendCourier:false,
    sender:null,
    receiver:null,
    recipient:'',
    addrStatus:{sender:false,receiver: false},
    remark:'',
    userAddress:{addressInfo:null,addressSelected:null},
    pay:'',
    priceResult:null,
    url:'http://10.156.85.170:8088'
    // url:'/api'
  },
  getters,
  mutations,
  actions
});

//export default store

