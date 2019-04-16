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
import foot from '../components/foot'
import Price from '../pages/price'
import Query from '../pages/query'

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
    }

  ]
})
