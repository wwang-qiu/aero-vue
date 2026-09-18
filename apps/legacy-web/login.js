const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

// 登录按钮点击事件
loginBtn.addEventListener("click", function () {
  loginBtn.disabled = true; // 禁用按钮（加在开头）
  message.textContent = ""; // 清空提示信息
  if (usernameInput.value === "") {
    message.textContent = "请输入用户名";
    message.className = "error";
    loginBtn.disabled = false;
    return;
  }
  if (passwordInput.value === "") {
    message.textContent = "请输入密码";
    message.className = "error";
    loginBtn.disabled = false;
    return;
  }
  if (usernameInput.value === "qiuqiu" && passwordInput.value === "1314") {
    message.textContent = "登录成功";
    message.className = "success";
    setTimeout(() => {
      window.location.href = "index.html";  // 跳转到index.html页面
    }, 1000);
  }
  else {
    message.textContent = "用户名或密码错误";
    message.className = "error";
    loginBtn.disabled = false;
  }
});

//按下回车键触发登录//
usernameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    loginBtn.click();
  }
});
passwordInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    loginBtn.click();
  }
});

