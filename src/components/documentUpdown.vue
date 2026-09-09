<template>
  <div>
    <!--让用户选择文件 先把它隐藏起来-->
    <!--给这个input文件标签，起个名字叫fileInput-->
    <input type="file" ref="fileInput" hidden @change="onfileChange" />
    <button class="upBtn" @click="upBtn">上传材料</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["updown"]);
const fileInput = ref(null);

function upBtn() {
  fileInput.value.click();
}
function onfileChange(e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }
  // 把选中的文件信息通过 updown 事件交给父组件处理
  emit("updown", {
    doName: file.name,
    size: (file.size / 1024 / 1024).toFixed(2) + "MB",
  });
  // 清空已选文件，方便下次重复上传同一个文件也能触发 change
  e.target.value = "";
}
</script>

<style scoped>
/* 上传材料按钮 */
.upBtn {
  width: 120px;
  height: 40px;
  background: gray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.upBtn:hover {
  background: #1890ff;
}

.upBtn:active {
  background: #096dd9;
}
</style>
