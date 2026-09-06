//导入Vue Router
//createRouter：创建路由实例的函数
//createWebHistory：创建history路由模式的函数(没有#)  还有一个hash模式(有#)
import {createRouter,createWebHistory} from "vue-router"
//导入页面组件
import login from "../components/login.vue"
import index from "../components/index.vue"
import home from "../components/home.vue"
import user from "../components/user.vue"
import document from "../components/document.vue"
import AIchat from "../components/AIchat.vue"
//创建路由对象
const router=createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:"/",
      redirect:"/login"//重定向 (A地址跳转到B地址)
    },
    {
      path:"/login",
      component:login
    },
    //嵌套路由
    {
      path:"/index",
      //路由别名 alias:"/home",
      //父路由
      component:index,
      children:[
        //子路由
         {path:"",component:home},
         {path:"user", component:user},
         {path:"document",component:document},
         {path:"AIchat",component:AIchat},
      ]
    }
  ],
})
//导出router，供main.js挂载
export default router
