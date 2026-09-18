<template>
  <div class="content">
    <h2>用户管理</h2>
    <p>用户名：{{ username }}</p>
    <p>登录状态：{{ isLogin }}</p>
    <!--搜索区域-->
    <userSearch @search="searchBtn"></userSearch>
    <!--添加用户-->
    <userAdd @add="addBtn"></userAdd>
    <!--用户列表-->
    <userList
      :users="showList"
      @edit="editUser"
      @delete="deleteUser"
    ></userList>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useAuthStore from "../stores/authStore";
import { storeToRefs } from "pinia";
import userSearch from "./userSearch.vue";
import userAdd from "./userAdd.vue";
import userList from "./userList.vue";

const authStore = useAuthStore();
const { username, isLogin } = storeToRefs(authStore);
const users = ref([
  {
    id: 1,
    username: "张三",
    email: "zhangsan@qq.com",
  },
  {
    id: 2,
    username: "李四",
    email: "lisi@qq.com",
  },
  {
    id: 3,
    username: "王五",
    email: "wangwu@qq.com",
  },
]);
const searchInput = ref("");
const showList = computed(() => {
  const keyword = searchInput.value.trim();
  if (keyword === "") {
    return users.value;
  }
  return users.value.filter(function (user) {
    return user.username.includes(keyword);
  });
});

//搜索用户
function searchBtn(newvalue) {
  searchInput.value = newvalue;
}

//添加用户
function addBtn(username, email) {
  if (username === "" || email === "") {
    alert("用户名和邮箱不能为空");
    return;
  }
  users.value.push({
    id: Date.now(),
    username,
    email,
  });
}

//编辑用户
function editUser(id) {
  const user = users.value.find((u) => u.id === id);
  if (!user) return;
  const newUsername = prompt("请输入新的用户名", user.username);
  const newEmail = prompt("请输入新的邮箱", user.email);
  // 取消则 prompt 返回 null
  if (newUsername === null || newEmail === null) {
    alert("已取消编辑");
    return;
  }
  if (newUsername === "" || newEmail === "") {
    alert("用户名和邮箱不能为空");
    return;
  }
  user.username = newUsername;
  user.email = newEmail;
}

//删除用户
function deleteUser(id) {
  users.value = users.value.filter((u) => u.id !== id);
}
</script>

<style scoped>
/* 内容区 */
.content {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.content h2 {
  margin-top: 0;
  color: #333;
}
</style>
