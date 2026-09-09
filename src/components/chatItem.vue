<template>
  <div class="chat-msg" :class="role">
    <strong class="name">{{ name }}</strong>
    {{ text }}
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "ai", // "ai" | "user"
  },
});

const name = computed(() => (props.role === "user" ? "用户" : "AI"));
</script>

<style scoped>
.chat-msg {
  width: fit-content;
  max-width: 70%;
  padding: 15px 20px;
  border-radius: 12px;
  color: #333;
  font-size: 16px;
  line-height: 25px;
}

.chat-msg .name {
  margin-right: 6px;
}

/* AI消息 */
.chat-msg.ai {
  background: #f0f2f5;
  align-self: flex-start;
}

/* 用户消息 */
.chat-msg.user {
  background: #1890ff;
  color: white;
  align-self: flex-end;
}
</style>
