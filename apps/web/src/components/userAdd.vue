<template>
  <div class="addUser">
    <input type="text" placeholder="用户名" v-model="username" />
    <input type="email" placeholder="邮箱" v-model="email" />
    <button @click="addBtn">添加用户</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["add"]);
const username = ref("");
const email = ref("");

function addBtn() {
  emit("add", username.value, email.value);
  // 添加后清空输入框
  username.value = "";
  email.value = "";
}
</script>

<style scoped>
/* 输入框 */
input {
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-color: #1890ff;
}

/* 按钮 */
button {
  width: 100%;
  height: 40px;
  padding: 0 25px;
  background: gray;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background: #1890ff;
}

button:active {
  background: #333;
}
.addUser {
  padding: 15px;
  background: #fafafa;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;
  display: flex;
  gap: 10px;
}
</style>
