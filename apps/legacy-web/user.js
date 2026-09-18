const users = [{
  id: 1,
  username: "张三",
  email: "zhangsan@qq.com"
},
{
  id: 2,
  username: "李四",
  email: "lisi@qq.com"
},
{
  id: 3,
  username: "王五",
  email: "wangwu@qq.com"
}
];

//取页面中的搜索框、搜索按钮、用户列表、用户名输入框、邮箱输入框和添加按钮
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const userList = document.getElementById("userList");
const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const addBtn = document.getElementById("addBtn");

// 显示用户列表
function showUsers(usersArray) {
  //先清空原来的用户列表
  userList.innerHTML = "";
  //遍历用户数组
  usersArray.forEach(
    function (user) {
      //创建tr标签
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td><button onclick="editUser(${user.id})">编辑</button>
      <button onclick="deleteUser(${user.id})">删除</button></td>
      `;
      //把tr添加到用户列表中
      userList.appendChild(tr);
    }
  )
}
//页面加载时显示所有用户
showUsers(users);


// 搜索用户
searchBtn.addEventListener("click", function () {
  //获取搜索框中的内容  .trim()去掉前后空格
  const keyword = searchInput.value.trim();
  if (keyword === "") {
    showUsers(users);
    return;
  }
  //使用filter筛选用户名中包含关键字的用户
  const result = users.filter(function (user) {
    return user.username.includes(keyword);
  });
  //显示搜索结果
  showUsers(result);
});


//添加用户
addBtn.addEventListener("click", function () {
  //获取用户名输入框和邮箱输入框中的内容
  const username = usernameInput.value;
  const email = emailInput.value;
  //判断用户名或者邮箱是否为空
  if (username === "" || email === "") {
    alert("用户名和邮箱不能为空");
    return;
  }
  else {
    //创建一个新的用户对象
    const newuser = {
      id: Date.now(),
      username: username,
      email: email
    };
    //把新用户添加到users数组中
    users.push(newuser);
    //重新显示用户列表
    showUsers(users);
    //清空用户名输入框和邮箱输入框
    usernameInput.value = "";
    emailInput.value = "";
  }
});


//----修改用户
function editUser(id) {
  //根据id找到用户
  const user = users.find(function (user) {
    return user.id == id;
  });
  //输入新的用户名
  const newUsername = prompt("请输入新的用户名", user.username);
  //输入新的邮箱
  const newEmail = prompt("请输入新的邮箱", user.email);
  if (newUsername === "" || newEmail === "") {
    return;
  }
  if (newUsername === null || newEmail === null) {
    alert("用户名和密码不能为空");
    return;
  }
  //修改用户名和邮箱
  user.username = newUsername;
  user.email = newEmail;
  //重新显示用户列表
  showUsers(users);
}


// 删除用户
function deleteUser(id) {
  //使用filter筛选出id不等于当前id的用户
  const result = users.filter(function (user) {
    return user.id !== id;
  });
  //清空原来的users数组
  users.length = 0;
  //遍历筛选后的结果
  result.forEach(function (user) {
    users.push(user);
  });
  //重新显示用户列表
  showUsers(users);
}
