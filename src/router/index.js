import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import Tool from '../pages/tool'
import My from '../pages/my'
import Login from '../pages/login'
import Regist from '../pages/regist'
import UserInfo from '../pages/userInfo'
import UpdPwd from '../pages/updPwd'
import Validate from '../pages/validate'
import Addres from '../pages/addresses'
import AddAddres from '../pages/addAddress'
import SelectAddress from '../components/selectAddress'
import Price from '../pages/price'
import Query from '../pages/query'
import nick from '../pages/nick'
import realname from '../pages/realname'
import phone from '../pages/phone'
import tel from '../pages/tel'
import email from '../pages/email'
import validateInfo from '../pages/validateInfo'
import remark from '../pages/remark'
import priceResult from '../pages/priceResult'
import QRcode from '../pages/QrCode'

Vue.use(Router)

export default new Router({
  model:history,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/tool',
      name: 'Tool',
      component: Tool
    }, {
      path: '/my',
      name: 'My',
      component: My
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },{
      path: '/user',
      name: 'UserInfo',
      component: UserInfo
    },{
      path: '/updPwd',
      name: 'UpdPwd',
      component: UpdPwd
    },{
      path: '/validate',
      name: 'Validate',
      component: Validate
    },{
      path: '/addres',
      name: 'Addres',
      component: Addres
    },{
      path: '/addAddres',
      name: 'AddAddres',
      component: AddAddres
    },{
      path: '/selectAddress',
      name: 'SelectAddress',
      component: SelectAddress
    },{
      path: '/query',
      name: 'Query',
      component: Query
    },{
      path: '/price',
      name: 'price',
      component: Price
    },{
      path: '/nick',
      name: 'nick',
      component: nick
    },{
      path: '/realname',
      name: 'realname',
      component: realname
    },{
      path: '/phone',
      name: 'phone',
      component: phone
    },{
      path: '/tel',
      name: 'tel',
      component: tel
    },{
      path: '/email',
      name: 'email',
      component: email
    },{
      path: '/validateInfo',
      name: 'validateInfo',
      component: validateInfo
    },{
      path: '/remark',
      name: 'remark',
      component: remark
    },{
      path: '/priceResult',
      name: 'priceResult',
      component: priceResult
    },{
      path: '/QRcode',
      name: 'QRcode',
      component: QRcode
    }

  ]
})
