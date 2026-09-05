<template>
  <div class="layout">
    <div class="sider">
      <h3>航空知识库</h3>
      <a href="#">首页</a>
      <a href="#">用户管理</a>
      <a href="#">文档管理</a>
      <a href="#" class="active">AI问答</a>
    </div>

    <div class="content">
      <h2>航空助手</h2>
      <div class="chat-box" id="chatBox">
        <div v-for="(msg, idx) in msgList" :key="idx">{{ msg }}</div>
      </div>
      <div class="chat-item">
        <input type="text" placeholder="请输入问题" v-model="question" />
        <button @click="clearBtn">清空聊天</button>
        <button @click="sendBtn">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      msgList: ["AI：你好，我可以回答航空相关问题。"],
    };
  },
  methods: {
    clearBtn() {
      this.msgList = ["AI：你好，我可以回答航空相关问题。"];
    },
    sendBtn() {
      const q = this.question;
      if (q === "") {
        alert("请输入问题");
        return;
      }
      //用户消息a
      this.msgList.push("用户：+q");
      //AI消息
      this.msgList.push("AI正在思考");
      //清空输入框
      this.question = "";
    },
  },
};
</script>

<style scoped>
.layout {
  /*弹性布局 只能加在父元素上*/
  display: flex;
  min-height: 100vh;
}

.sider {
  width: 220px;
  background: #001529;
  color: white;
  padding: 20px;
}

.sider h3 {
  margin: 0 0 20px;
  font-size: 18px;
}

.sider a {
  display: block;
  color: rgba(255, 255, 255, 0.75);
  /*去掉a标签默认下划线*/
  text-decoration: none;
  /*上下 左右*/
  padding: 12px 15px;
  border-radius: 6px;
  margin-bottom: 6px;
}

/*鼠标悬浮伪类*/
.sider a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/*鼠标选中这个*/
.sider a.active {
  background: #1890ff;
  color: #fff;
}

.content {
  /*自动占剩下全部剩余宽度*/
  flex: 1;
  padding: 30px;
  display: flex;
  /*垂直纵向从上往下排*/
  flex-direction: column;
}
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

.chat-box div {
  width: fit-content;
  max-width: 70%;

  background: #f0f2f5;

  padding: 15px 20px;

  border-radius: 12px;

  color: #333;

  font-size: 16px;

  line-height: 25px;
}

/* AI消息 */
.chat-box div:nth-child(odd) {
  background: #f0f2f5;

  align-self: flex-start;
}

/* 用户消息 */
.chat-box div:nth-child(even) {
  background: #1890ff;

  color: white;

  align-self: flex-end;
}

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
  background: #1890ff;
  border-radius: 8px;
  font-size: 16px;
}
</style>
