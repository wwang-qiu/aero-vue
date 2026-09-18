<template>
  <div class="chat-box" ref="chatBox">
    <chatItem
      v-for="(msg, idx) in msgList"
      :key="idx"
      :text="msg.text"
      :role="msg.role"
    ></chatItem>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import chatItem from "./chatItem.vue";

const props = defineProps({
  msgList: {
    type: Array,
    required: true,
  },
});

const chatBox = ref(null);

// 有新消息时自动滚动到底部
watch(
  () => props.msgList,
  () => {
    nextTick(() => {
      const el = chatBox.value;
      el.scrollTop = el.scrollHeight;
    });
  },
  { deep: true }
);
</script>

<style scoped>
.chat-box {
  width: 100%;
  height: 500px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
