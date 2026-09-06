<template>
  <div class="content">
    <h2>用户管理</h2>
    <!--搜索区域-->
    <div class="search">
      <input type="text" placeholder="请输入用户名称" v-model="searchInput" />
      <button @click="searchBtn">搜索</button>
    </div>
    <!--添加用户-->
    <div class="addUser">
      <input type="text" placeholder="用户名" v-model="username" />
      <input type="email" placeholder="邮箱" v-model="email" />
      <button @click="addBtn">添加用户</button>
    </div>

    <!--用户列表-->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>用户名</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in showList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(user.id)">编辑</button>
            <button @click="deleteUser(user.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
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
      ],
      showList: [],
      searchInput: "",
      username: "",
      email: "",
    };
  },
  created() {
    // 页面加载时显示所有用户
    this.showList = this.users.slice();
  },
  methods: {
    //搜索用户
    searchBtn() {
      // 获取搜索框中的内容，.trim() 去掉前后空格
      const keyword = this.searchInput.trim();
      if (keyword === "") {
        this.showList = this.users.slice();
        return;
      }
      this.showList = this.users.filter((user) =>
        user.username.includes(keyword),
      );
    },

    //添加用户
    addBtn() {
      if (this.username === "" || this.email === "") {
        alert("用户名和邮箱不能为空");
        return;
      }
      this.users.push({
        id: Date.now(),
        username: this.username,
        email: this.email,
      });
      // 重新显示用户列表
      this.showList = this.users.slice();
      // 清空用户名输入框和邮箱输入框
      this.username = "";
      this.email = "";
    },

    //编辑用户
    editUser(id) {
      const user = this.users.find((u) => u.id == id);
      if (!user) return;
      const newUsername = prompt("请输入新的用户名", user.username);
      const newEmail = prompt("请输入新的邮箱", user.email);
      if (newUsername === "" || newEmail === "") {
        return;
      }
      if (newUsername === null || newEmail === null) {
        alert("用户名和密码不能为空");
        return;
      }
      user.username = newUsername;
      user.email = newEmail;
      // 重新显示用户列表
      this.showList = this.users.slice();
    },

    //删除用户
    deleteUser(id) {
      this.users = this.users.filter((u) => u.id !== id);
      // 重新显示用户列表
      this.showList = this.users.slice();
    },
  },
};
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

/* 搜索区域 */
.search {
  padding: 15px;
  background: #fafafa;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;
  display: flex;
}

.search input {
  padding: 8px;
  width: 200px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.search button {
  background-color: gray;
  width: 80px;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
}

.search button:hover {
  background-color: #1890ff;
}

/* 添加用户区域 */
.addUser {
  padding: 15px;
  background: #fafafa;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #f0f0f0;
  display: flex;
  gap: 10px;
}

/* 表格 */
table {
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-collapse: collapse;
}

table thead tr {
  background: #fafafa;
  font-weight: bold;
}

td,
th {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
}

/* 斑马纹 */
table tbody tr:nth-child(odd) {
  background: #fafafa;
}

/* 悬浮效果 */
table tbody tr:hover {
  background: #e6f7ff;
  transition: background 0.3s;
}

/* 表格内按钮（编辑/删除） */
td button {
  width: 80%;
  height: 30px;
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 6px 14px;
  margin: 5px auto;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  display: block;
}

td button:hover {
  background: #ff7875;
}

td button:active {
  background: #d9363e;
}
</style>
