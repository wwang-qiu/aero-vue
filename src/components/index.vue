<template>
  <div class="layout">
    <div class="sider">
      <h3>航空知识库</h3>
      <a href="index.html" class="active">首页</a>
      <a href="user.html">用户管理</a>
      <a href="document.html">文档管理</a>
      <a href="AIchat.html">AI问答</a>
    </div>

    <div class="content">
      <h2>首页</h2>
      <div class="cards">
        <div class="card">
          <h3>用户数量</h3>
          <p>{{ userCount }}</p>
        </div>
        <div class="card">
          <h3>文档数量</h3>
          <p>{{ documentCount }}</p>
        </div>
        <div class="card">
          <h3>AI问答次数</h3>
          <p>{{ questionCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCount: "128",
      documentCount: "256",
      questionCount: "512",
    };
  },
};
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

.sider a.active {
  background: #1890ff;
  color: #fff;
}

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

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 10px;
}
</style>
