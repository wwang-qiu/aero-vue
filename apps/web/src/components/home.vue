<template>
  <div class="content">
    <h2>首页</h2>
    <homeList :stats="stats"></homeList>
  </div>
</template>

<script setup>
import { ref } from "vue";
import homeList from "./homeList.vue";

const stats = ref([
  { title: "用户数量", value: "128" },
  { title: "文档数量", value: "256" },
  { title: "AI问答次数", value: "512" },
]);
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
</style>
