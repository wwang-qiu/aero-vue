<template>
  <div class="content">
    <h2>航空助手</h2>
    <!--聊天记录-->
    <chatBox :msgList="msgList"></chatBox>
    <!--输入区域-->
    <chatInput @send="sendBtn" @clear="clearBtn"></chatInput>
  </div>
</template>

<script setup>
import { ref } from "vue";
import chatBox from "./chatBox.vue";
import chatInput from "./chatInput.vue";

const msgList = ref([
  { role: "ai", text: "你好，我可以回答航空相关问题。" },
]);

//清空聊天（始终保留第一条欢迎语）
function clearBtn() {
  msgList.value = msgList.value.slice(0, 1);
}
//发送消息
function sendBtn(question) {
  if (question === "") {
    alert("请输入问题");
    return;
  }
  //用户消息
  msgList.value.push({ role: "user", text: question });
  //AI消息
  msgList.value.push({ role: "ai", text: "正在思考" });
}
</script>

<style scoped>
.content {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
}
</style>
