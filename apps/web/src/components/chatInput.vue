<template>
  <div class="chat-item">
    <input type="text" placeholder="请输入问题" v-model="question" />
    <button @click="clearBtn">清空聊天</button>
    <button @click="sendBtn">发送</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["send", "clear"]);
const question = ref("");

function clearBtn() {
  emit("clear");
}
function sendBtn() {
  emit("send", question.value);
  question.value = "";
}
</script>

<style scoped>
.chat-item {
  display: flex;
  margin-top: 20px;
  gap: 15px;
}

.chat-item input {
  flex: 1;
  height: 45px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0 15px;
  font-size: 15px;
}

.chat-item input:focus {
  outline: none;
  border-color: #1890ff;
}

.chat-item button {
  width: 150px;
  height: 45px;
  background: gray;
  border-radius: 8px;
  font-size: 16px;
}

.chat-item button:hover {
  background: #1890ff;
}
</style>
