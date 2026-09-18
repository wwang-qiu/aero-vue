const documents = [{
  id: 1,
  doName: "发动机维修材料.pdf",
  size: "2.5MB",
  upTime: "2026-09-01",
},
{
  id: 2,
  doName: "航空材料介绍.pdf",
  size: "3.8MB",
  upTime: "2026-09-02"
}];

//显示列表
const documentList = document.getElementById("documentList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function showDocuments(documentsArray) {
  documentList.innerHTML = ""; // 清空列表
  documentsArray.forEach(function (doc) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${doc.id}</td>
    <td>${doc.doName}</td>
    <td>${doc.size}</td>
    <td>${doc.upTime}</td>
    <td><button onclick="deletedoc(${doc.id})">删除</button></td>
`;
    documentList.appendChild(tr);
  });
}
showDocuments(documents);

//搜索
searchBtn.addEventListener("click", function () {
  const keyword = searchInput.value;
  const result = documents.filter(function (doc) {
    return doc.doName.includes(keyword);
  });
  showDocuments(result);
});

//删除
function deletedoc(id) {
  const result = documents.filter(function (doc) {
    return doc.id !== id;
  });
  documents.length = 0;
  result.forEach(function (doc) {
    documents.push(doc);
  });
  showDocuments(result);
}

//上传材料
const upBtn = document.getElementById("upBtn");
const fileInput = document.getElementById("fileInput");
upBtn.addEventListener("click", function () {
  fileInput.click();
});
// 当用户选择了一个文件后，就会执行这里面的代码
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert("文件大小不能超过10MB");
      fileInput.value = "";
      return;
    }
    const newDocument = {
      id: documents.length + 1,
      doName: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + "MB",
      upTime: new Date().toISOString().slice(0, 10)
    };
    documents.push(newDocument);
    showDocuments(documents);
  }
})
