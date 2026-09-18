<template>
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
      <documentItem
        v-for="doc in documents"
        :key="doc.id"
        :document="doc"
        @delete="deleteBtn"
      ></documentItem>
    </tbody>
  </table>
</template>

<script setup>
import documentItem from "./documentItem.vue";

defineProps({
  documents: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["delete"]);

function deleteBtn(id) {
  emit("delete", id);
}
</script>

<style>
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
</style>
