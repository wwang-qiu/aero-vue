<template>
  <div class="content">
    <h2>我的文档</h2>
    <documentSearch @search="searchBtn"></documentSearch>
    <documentList :documents="showList" @delete="deleteBtn"></documentList>
    <br />
    <documentUpdown @updown="upBtn"></documentUpdown>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import documentList from "./documentList.vue";
import documentSearch from "./documentSearch.vue";
import documentUpdown from "./documentUpdown.vue";

// 所有文档（原始数据）
const documents = ref([
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
]);
const searchInput = ref("");

const showList = computed(() => {
  const keyword = searchInput.value.trim();
  if (keyword === "") {
    return documents.value;
  }
  return documents.value.filter(function (doc) {
    return doc.doName.includes(keyword);
  });
});

//搜索材料
function searchBtn(value) {
  searchInput.value = value;
}

//删除材料
function deleteBtn(id) {
  documents.value = documents.value.filter(function (doc) {
    return doc.id !== id;
  });
}

//上传材料
function upBtn(fileInfo) {
  documents.value.push({
    id: Date.now(),
    doName: fileInfo.doName,
    size: fileInfo.size,
    upTime: new Date().now(),
  });
}
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
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-color: #1890ff;
}
</style>
