//更改用户状态信息
import {addressInfo, isReceive} from './getters'

export const userStatus=(state, user)=>{
  if (user){
    state.currentUser = user;
    state.isLogin = true
    localStorage.setItem("user",user);
  }else if(user==null){
    //退出的时候清空sessionStorage里的东西
    localStorage.setItem('user',null);
    //  sessionStorage.setItem('userToke','');
    state.currentUser = null;
    //  state.isLogin = false;
  }
}

export const updLoginStatus=(state,login)=>{
  state.isLogin = login;
}

export const updAuthenStatus=(state,authen)=>{
  state.isAuthen = authen;
}

export const setValidate=(state,validate)=>{
  state.validateInfo = validate;
  localStorage.setItem("validate",validate);
  state.isAuthen = true;
}

export const setSendStatus=(state,send)=>{
  state.isSendCourier = send;
}

export const setSend=(state,sender)=>{
  state.sender = sender;
}

export const setReceive=(state,receiver)=>{
  state.receiver = receiver;
}

export const recipient=(state,recipient)=>{
  state.recipient = recipient;
}

export const senderStatus=(state,status)=>{
  state.addrStatus.sender = status;
}

export const receiverStatus=(state,status)=>{
  state.addrStatus.receiver = status;
}

export const remark=(state,remark)=>{
  state.remark = remark
}

export const addressInfos=(state,addressInfo)=>{
  state.userAddress.addressInfo = addressInfo
}
export const addressSelected=(state,addressSelected)=>{
  state.userAddress.addressSelected = addressSelected
}

export const pay=(state,pay)=>{
  state.pay=pay
}

export const priceResult=(state,priceResult)=>{
  state.priceResult=priceResult
}
