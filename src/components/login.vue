<template>
  <div class="login-page">
    <form class="login-container" @submit.prevent="loginBtn">
      <h2>航空知识库系统</h2>

      <div class="form-item">
        <input type="text" placeholder="请输入用户名" v-model="username" />
      </div>

      <div class="form-item">
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>

      <p id="message" :class="status">
        {{ message }}
      </p>

      <button>登录</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useAuthStore from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const message = ref("");
const status = ref("");
function loginBtn() {
  message.value = "";
  if (username.value === "") {
    message.value = "请输入用户名";
    status.value = "error";
    return;
  }
  if (password.value === "") {
    message.value = "请输入密码";
    status.value = "error";
    return;
  }
  if (username.value === "qiuqiu" && password.value === "1314") {
    message.value = "登陆成功";
    status.value = "success";
    authStore.login(username.value);
    router.push("/index");
  } else {
    message.value = "用户名或密码错误";
    status.value = "error";
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  background-image: url("../assets/denglubeijing.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.92);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.login-container h2 {
  text-align: center;
}

.form-item {
  margin-bottom: 20px;
}

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

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

#message.success {
  color: #52c41a;
  text-align: center;
}

#message.error {
  color: #eb3a3a;
  text-align: center;
}
</style>
