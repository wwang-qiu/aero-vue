<template>
  <tr>
    <td>{{ user.id }}</td>
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>
      <button @click="editUser(user.id)">编辑</button>
      <button @click="deleteUser(user.id)">删除</button>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

function editUser(id) {
  emit("edit", id);
}
function deleteUser(id) {
  emit("delete", id);
}
</script>

<style scoped>
/* 单元格 */
td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
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
