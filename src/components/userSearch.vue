<template>
  <div class="search">
    <input type="text" placeholder="请输入用户名称" v-model="searchInput" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["search"]);
const searchInput = ref("");

watch(searchInput, (newvalue) => {
  emit("search", newvalue);
});
</script>

<style>
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
</style>
