<template>
  <div class="layout">
    <div class="sider">
      <h3>航空知识库</h3>
      <router-link to="/index">首页</router-link>
      <router-link to="/index/user">用户管理</router-link>
      <router-link to="/index/document">文档管理</router-link>
      <router-link to="/index/AIchat">AI问答</router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "../stores/authStore";
const authStore = useAuthStore();
//从 Pinia 仓库中把响应式数据拿出来，同时保持响应式。
const { username, isLogin, welcomeText } = storeToRefs(authStore);
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sider {
  width: 220px;
  background: #001529;
  color: white;
  padding: 20px;
}

.sider h3 {
  margin: 0 0 20px;
  font-size: 18px;
}

.sider a {
  display: block;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 6px;
  margin-bottom: 6px;
}

.sider a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.sider a.router-link-exact-active {
  background: #1890ff;
  color: #fff;
}
</style>
