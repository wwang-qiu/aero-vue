const chatBox = document.getElementById('chatBox');
const questionInput = document.getElementById('question');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
sendBtn.addEventListener("click", function () {
  const question = questionInput.value;
  if (question === "") {
    alert("请输入问题");
  }
  else {
    // 发送问题到AI并显示在聊天框中
    const userMessage = document.createElement("div");
    userMessage.textContent = "用户：" + question;
    chatBox.appendChild(userMessage);
    // 模拟AI回答
    const aiMessage = document.createElement("div");
    aiMessage.textContent = "AI:正在思考...";
    chatBox.appendChild(aiMessage);
    //清空输入框
    questionInput.value = "";
  }
})
questionInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendBtn.click();
  }
})

clearBtn.addEventListener("click", function () {
  chatBox.innerHTML = "<div>AI：你好，我可以回答航空相关问题。</div>";
})