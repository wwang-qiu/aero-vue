<template>
  <div class="content">
    <h2>我的文档</h2>
    <documentSearch @search="searchBtn"></documentSearch>
    <documentList :documents="showList" @delete="deleteBtn"></documentList>
    <br />
    <documentUpdown @updown="upBtn"></documentUpdown>
  </div>
</template>

<script>
import documentItem from "./documentItem.vue";
import documentList from "./documentList.vue";
import documentSearch from "./documentSearch.vue";
import documentUpdown from "./documentUpdown.vue";
export default {
  components: { documentSearch, documentList, documentItem, documentUpdown },
  data() {
    return {
      // 所有文档（原始数据）
      documents: [
        {
          id: 1,
          doName: "发动机维修材料.pdf",
          size: "2.5MB",
          upTime: "2026-09-01",
        },
        {
          id: 2,
          doName: "航空材料介绍.pdf",
          size: "3.8MB",
          upTime: "2026-09-02",
        },
      ],
      // 列表实际显示的数据（搜索时会被过滤）
      showList: [],
    };
  },
  created() {
    // 页面加载时显示所有文档
    this.showList = this.documents.slice();
  },
  methods: {
    //搜索材料
    searchBtn(searchInput) {
      const keyword = searchInput.trim();
      if (keyword === "") {
        this.showList = this.documents.slice();
        return;
      }
      this.showList = this.documents.filter(function (doc) {
        return doc.doName.includes(keyword);
      });
    },

    //删除材料
    deleteBtn(id) {
      this.documents = this.documents.filter(function (doc) {
        return doc.id !== id;
      });
      this.showList = this.documents.slice();
    },

    //上传材料
    upBtn(fileInfo) {
      this.documents.push({
        id: Date.now(),
        doName: fileInfo.doName,
        size: fileInfo.size,
        upTime: new Date().toLocaleDateString(),
      });
      this.showList = this.documents.slice();
    },
  },
};
</script>

<style scoped>
/* 内容区 */
.content {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.content h2 {
  margin-top: 0;
  color: #333;
}

/* 输入框 */
input {
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-color: #1890ff;
}
</style>
