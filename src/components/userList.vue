<template>
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
      <userItem
        v-for="user in users"
        :key="user.id"
        :user="user"
        @edit="editUser"
        @delete="deleteUser"
      ></userItem>
    </tbody>
  </table>
</template>

<script setup>
import userItem from "./userItem.vue";

defineProps({
  users: {
    type: Array,
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
