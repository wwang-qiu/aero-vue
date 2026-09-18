//引入创建仓库的函数
import {defineStore} from 'pinia'
//创建名为auth的仓库   useAuthStore是以后在其他组件时应用叫的名字
const useAuthStore=defineStore("auth",{
  
//state存放仓库的数据
  state:function(){
    //返回仓库中需要保存的数据
  return {
    username:"",
    isLogin:false
  }
},


//获取、计算数据
getters:{
  welcomeText:function(state){
if(state.isLogin){
  return "欢迎你，"+state.username
}
else{
  return "请先登录"
}
  }
},


  //action执行操作、修改数据
actions:{
  //登录操作
  login(username:string){
    this.username=username
    this.isLogin=true
  },
  //退出操作
logout(){
  this.username=""
  this.isLogin=false
}
}
})
export default useAuthStore