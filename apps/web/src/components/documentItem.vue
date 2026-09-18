<template>
  <tr>
    <td>{{ document.id }}</td>
    <td>{{ document.doName }}</td>
    <td>{{ document.size }}</td>
    <td>{{ document.upTime }}</td>
    <td>
      <button @click="deleteBtn(document.id)">删除</button>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  document: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["delete"]);

function deleteBtn(id) {
  emit("delete", id);
}
</script>

<style>
td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
}
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
</style>
