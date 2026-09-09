//引入axios
import axios from "axios"
//创建axios实例
const request=axios.create({
//后端服务器基本地址
  url:"http://127.0.0.1:8000",
//如果请求超过 5 秒还没有得到响应，就认为请求超时。
  timeout:5000
})
 export default request