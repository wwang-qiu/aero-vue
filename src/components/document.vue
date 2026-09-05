<template>
  <div class="layout">
    <div class="sider">
      <h3>航空知识库</h3>
      <a href="#">首页</a>
      <a href="#">用户管理</a>
      <a href="#" class="active">文档管理</a>
      <a href="#">AI问答</a>
    </div>

    <div class="content">
      <h2>我的文档</h2>

      <!--搜索区域-->
      <div class="search">
        <input type="text" placeholder="请输入文件名" v-model="searchInput" />
        <button @click="searchBtn">搜索</button>
      </div>

      <!--文档列表-->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>文件名</th>
            <th>大小</th>
            <th>上传时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in showList" :key="doc.id">
            <td>{{ doc.id }}</td>
            <td>{{ doc.doName }}</td>
            <td>{{ doc.size }}</td>
            <td>{{ doc.upTime }}</td>
            <td>
              <button @click="deleteBtn(doc.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <!--让用户选择文件 先把它隐藏起来-->
      <input type="file" ref="fileInput" hidden @change="onfileChange" />
      <button @click="upBtn">上传材料</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有文档（原始数据）
      documents: [
        {
          id: 1,
          doName: "发动机维修材料.pdf",
          size: "2.5MB",
          upTime: "2026-09-01",
        },
        {
          id: 2,
          doName: "航空材料介绍.pdf",
          size: "3.8MB",
          upTime: "2026-09-02",
        },
      ],
      // 列表实际显示的数据（搜索时会被过滤）
      showList: [],
      searchInput: "",
    };
  },
  created() {
    // 页面加载时显示所有文档
    this.showList = this.documents.slice();
  },
  methods: {
    //搜索材料
    searchBtn() {
      const keyword = this.searchInput.trim();
      if (keyword === "") {
        this.showList = this.documents.slice();
        return;
      }
      this.showList = this.documents.filter(function (doc) {
        return doc.doName.includes(keyword);
      });
    },

    //删除材料
    deleteBtn(id) {
      this.documents = this.documents.filter(function (doc) {
        return doc.id !== id;
      });
      this.showList = this.documents.slice();
    },

    //上传材料
    upBtn() {
      this.$refs.fileInput.click();
    },
    onfileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      this.documents.push({
        id: Date.now(),
        doName: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + "MB",
        upTime: new Date().toLocaleDateString(),
      });
      this.showList = this.documents.slice();
    },
  },
};
</script>

<style scoped>
/* 整体布局 */
.layout {
  display: flex;
  min-height: 100vh;
}

/* 侧边栏 */
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

.sider a.active {
  background: #1890ff;
  color: #fff;
}

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
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-color: #1890ff;
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
  width: 200px;
  margin-right: 10px;
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

/* 表格内删除按钮 */
td button {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

td button:hover {
  background: #ff7875;
}

td button:active {
  background: #d9363e;
}

/* 上传材料按钮 */
.upBtn {
  width: 120px;
  height: 40px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.upBtn:hover {
  background: #40a9ff;
}

.upBtn:active {
  background: #096dd9;
}
</style>
