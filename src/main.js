import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 引入 Pinia
import { createPinia } from 'pinia'

const app = createApp(App)

// 注册 Pinia
app.use(createPinia())

// 注册路由
app.use(router)

app.mount('#app')