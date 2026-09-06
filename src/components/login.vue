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

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
      status: "",
      disabled: false,
    };
  },
  methods: {
    loginBtn() {
      this.disabled = true;
      this.message = "";
      if (this.username === "") {
        this.message = "请输入用户名";
        this.status = "error";
        this.disabled = false;
        return;
      }
      if (this.password === "") {
        this.message = "请输入密码";
        this.status = "error";
        this.disabled = false;
        return;
      }
      if (this.username === "qiuqiu" && this.password === "1314") {
        this.message = "登陆成功";
        this.status = "success";
        this.$router.push("/index");
      } else {
        this.message = "用户名或密码错误";
        this.status = "error";
        this.disabled = false;
      }
    },
  },
};
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
