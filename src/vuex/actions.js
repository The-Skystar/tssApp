//应用mutation
export const setUser = ({commit},user) =>{
  commit('userStatus',user)
}

export const updLogin=({commit},login)=>{
  commit('updLoginStatus',login)
}

export const authen=({commit},authen)=>{
  commit('updAuthenStatus',authen)
}

export const validate=({commit},validate)=>{
  commit('setValidate',validate)
}
