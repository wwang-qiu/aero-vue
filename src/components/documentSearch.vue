<template>
  <div class="search">
    <input type="text" placeholder="请输入文件名" v-model="searchInput" />
    <button @click="searchBtn">搜索</button>
  </div>
</template>

<script>
export default {
  emits: ["search"],
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    searchBtn() {
      this.$emit("search", this.searchInput);
    },
  },
};
</script>

<style>
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

.search button {
  height: 40px;
  padding: 0 20px;
  background: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.search button:hover {
  background: #1890ff;
}

.search button:active {
  background: #096dd9;
}
</style>
