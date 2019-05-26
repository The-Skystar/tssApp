//应用mutation
export const setUser = ({commit},user) =>{
  commit('userStatus',user)
}

export const updLogin=({commit},isLogin)=>{
  commit('updLoginStatus',isLogin)
}

export const authen=({commit},authen)=>{
  commit('updAuthenStatus',authen)
}

export const validate=({commit},validate)=>{
  commit('setValidate',validate)
}

export const setSendCourier=({commit},issend)=>{
  commit('setSendStatus',issend)
}

export const setSender=({commit},sender)=>{
  commit("setSend",sender)
}

export const setReceiver=({commit},receiver)=>{
  commit("setReceive",receiver)
}

export const setRecipient=({commit},recipient)=>{
  commit("recipient",recipient)
}

export const setSenderStatus=({commit},status)=>{
  commit("senderStatus",status)
}
export const setReceiverStatus=({commit},status)=>{
  commit("receiverStatus",status)
}

export const setRemark=({commit},remark)=>{
  commit("remark",remark)
}

export const setAddressInfo=({commit},addressInfo)=>{
  commit("addressInfos",addressInfo)
}

export const setAddressSelected=({commit},addressSelected)=>{
  commit("addressSelected",addressSelected)
}

export const setPay=({commit},pay)=>{
  commit("pay",pay)
}

export const setPriceResult=({commit},priceResult)=>{
  commit("priceResult",priceResult)
}
