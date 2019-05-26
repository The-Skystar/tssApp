export const currentUser = state => localStorage.getItem("user")
export const isLogin = state=> state.isLogin
export const isAuthen = state=> {
  if (localStorage.getItem("validate")!=null){
    return true;
  } else{
    return false;
  }
}
export const validateInfo = state=> localStorage.getItem("validate")

export const isSendCourier = state=> state.isSendCourier

export const sender = state=> state.sender

export const receiver = state=> state.receiver

export const recipient = state=> state.recipient

export const senderStatus = state=> state.addrStatus.sender

export const receiverStatus = state=> state.addrStatus.receiver

export const remark = state=> state.remark

export const addressInfo = state=> state.userAddress.addressInfo

export const addressSelected = state=> state.userAddress.addressSelected

export const pay = state=> state.pay

export const priceResult = state=> state.priceResult

export  const url = state=>state.url
