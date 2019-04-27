export const currentUser = state=> localStorage.getItem("user")
export const isLogin = state=> {
  if (sessionStorage.getItem("token")==null)
    return false;
  else
    return true;
}
export const isAuthen = state=> {
  if (localStorage.getItem("validate")!=null){
    return true;
  } else{
    return false;
  }
}
export const validateInfo = state=> localStorage.getItem("validate")

