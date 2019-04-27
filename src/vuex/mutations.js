//更改用户状态信息
export const userStatus=(state,user)=>{
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
  state.isAuthen = authen();
}

export const setValidate=(state,validate)=>{
  state.validateInfo = validate;
  localStorage.setItem("validate",validate);
  state.isAuthen = true;
}
