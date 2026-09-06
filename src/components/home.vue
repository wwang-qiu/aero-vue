<template>
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

<style>
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
