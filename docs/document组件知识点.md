# 五个 document 组件 知识点总结

> 这是 `Aviation Knowledge Platform` 中「我的文档」模块的 5 个组件，完整演示了
> **Vue 组件拆分、父子组件通信、单向数据流、状态提升**等核心知识点。

---

## 一、组件全景图

```
document.vue（父组件 / 容器组件，管理数据状态）
├── documentSearch.vue   搜索框 + 搜索按钮
├── documentList.vue     表格列表（表头 + 循环渲染行）
│     └── documentItem.vue   每一行文档（表格的一行）
└── documentUpdown.vue   上传文件按钮 + 隐藏的 file 输入框
```

**数据流方向（单向数据流）：**

```
                 ┌── search(关键字) ──────────→ 父组件过滤 showList
用户输入 → documentSearch ────────────────────────┐
                 │                                 │
                 └── updown(文件信息) ──→ 父组件 push 新文档
                                              ↓
                     documentList ←──── documents 数组（props 传入）
                                              ↓
                     documentItem ←─ document 对象（props 传入）
                                              ↓
                     documentItem ── delete(id) ──→ 父组件删除 → 更新数据 → 重新渲染
```

> **核心思想**：数据只存在父组件 `document.vue` 中，子组件不直接改数据，
> 而是通过 **`$emit` 向上发事件**，由父组件统一修改，这叫「状态提升（Lifting State Up）」。

---

## 二、五个组件职责拆解

### 1. document.vue —— 父组件（容器组件）

- **职责**：持有并管理所有文档数据，处理搜索、删除、上传三类业务逻辑。
- **关键点**：
  - `documents`：**原始数据**（完整的文档数组）
  - `showList`：**实际展示的数据**（搜索时会被过滤）

```js
data() {
  return {
    documents: [ /* 原始全部文档 */ ],
    showList: [],   // 列表真正渲染的数据
  };
},
created() {
  this.showList = this.documents.slice(); // 初始显示全部
}
```

- 为什么需要两个数组？
  - 搜索后 `showList` 被过滤，但 `documents` 保留完整数据；
  - 这样「清空关键字」或「删除后再显示」时，都能从原始数据恢复，而不会丢失数据。

| 方法 | 作用 | 触发来源 |
| ---- | ---- | -------- |
| `searchBtn(keyword)` | 按文件名关键字过滤 | `documentSearch` 的 `search` 事件 |
| `deleteBtn(id)` | 按 id 删除文档 | `documentItem` 的 `delete` 事件 |
| `upBtn(fileInfo)` | 上传新文档（push 进数组） | `documentUpdown` 的 `updown` 事件 |

- 三个方法都做了「**改数据 → 同步 showList**」两步：
```js
deleteBtn(id) {
  this.documents = this.documents.filter(doc => doc.id !== id);
  this.showList = this.documents.slice(); // 同步刷新展示列表
}
```

- 父组件模板中监听子组件事件：
```html
<documentSearch @search="searchBtn"></documentSearch>
<documentList :documents="showList" @delete="deleteBtn"></documentList>
<documentUpdown @updown="upBtn"></documentUpdown>
```

---

### 2. documentSearch.vue —— 搜索组件

- **职责**：收集用户输入的关键字，点「搜索」后把关键字传给父组件。
- **关键知识点**：

**① `v-model` 双向绑定**

```html
<input type="text" placeholder="请输入文件名" v-model="searchInput" />
```

```js
data() {
  return { searchInput: "" };
}
```

- `v-model` 本质是 `:value` + `@input` 的语法糖，输入时自动更新 `searchInput`。

**② 通过 `$emit` 向父组件传值**

```js
emits: ["search"],          // 声明要发出的事件（Vue3 推荐）
methods: {
  searchBtn() {
    this.$emit("search", this.searchInput); // 事件名 + 参数
  },
}
```

- `$emit("search", 值)` 中的第二个参数，会被父组件 `@search="searchBtn"` 的方法作为**参数接收**。
- 对应父组件：`searchBtn(searchInput)`，即**子传父**。

---

### 3. documentList.vue —— 列表组件

- **职责**：用表格展示文档数组，循环渲染每一行 `documentItem`。
- **关键知识点**：

**① `props` 接收父组件数据**

```js
props: {
  documents: { type: Array, required: true },
}
```

```html
<documentList :documents="showList"></documentList> <!-- 父传子 -->
```

**② `v-for` 列表渲染 + `:key`**

```html
<documentItem
  v-for="doc in documents"
  :key="doc.id"
  :document="doc"
  @delete="deleteBtn"
></documentItem>
```

- `v-for` 遍历数组，每个 `doc` 渲染成一个 `documentItem`。
- `:key` 用唯一的 `doc.id`，帮助 Vue 高效地 diff 更新列表（不要用数组下标当 key）。

**③ 事件「转发」**

```js
emits: ["delete"],
methods: {
  deleteBtn(id) {
    this.$emit("delete", id); // 把 id 继续向上传给父组件
  },
}
```

- `documentList` 自己并不处理删除，它只是**转发**子组件 `documentItem` 传来的 `delete` 事件，
  让最顶层的 `document.vue` 统一处理，这就是「事件冒泡式」的组件通信。

---

### 4. documentItem.vue —— 行组件（叶子组件）

- **职责**：渲染一行的数据（id、文件名、大小、上传时间）+ 删除按钮。
- **关键知识点**：

**① props 接收单个对象**

```js
props: {
  document: { type: Object, required: true },
}
```

```html
<td>{{ document.id }}</td>
<td>{{ document.doName }}</td>
```

- 父级传 `:document="doc"`，这里用 `document.id` 等访问对象属性。

**② 模板插值 `{{ }}`（Mustache 语法）**

- 双花括号内写表达式，Vue 会自动取 `this` 上的数据渲染。

**③ 事件传参**

```html
<button @click="deleteBtn(document.id)">删除</button>
```

```js
methods: {
  deleteBtn(id) {
    this.$emit("delete", id);
  },
}
```

- `@click="deleteBtn(document.id)"` 把当前行 id 作为参数传入，再向上 `$emit`。
- 这里体现了 **`document` 变量名遮蔽** 的一个小坑：组件里 `document` 既是一个 prop 名，
  又和浏览器全局 `document` 同名。在 Vue 的 `this.document` 里指向的是 prop，
  不会冲突，但读代码时要分清。

---

### 5. documentUpdown.vue —— 上传组件

- **职责**：让用户选择本地文件，把文件信息（文件名、大小）传给父组件。
- **关键知识点**：

**① 隐藏原生 file 输入框 + `$refs` 触发点击**

```html
<input type="file" ref="fileInput" hidden @change="onfileChange" />
<button class="upBtn" @click="upBtn">上传材料</button>
```

```js
upBtn() {
  this.$refs.fileInput.click(); // 用 ref 拿到隐藏 input，程序化触发点击
}
```

- `ref="fileInput"` + `this.$refs.fileInput`：在模板上打标记，脚本里直接访问该 DOM 元素。
- 因为原生的 `<input type="file">` 样式丑，所以把它 `hidden` 隐藏，
  用一个好看的自定义按钮来「代理」触发它。

**② 监听 `change` 事件获取文件**

```js
onfileChange(e) {
  const file = e.target.files[0];   // 拿到选中的文件对象
  if (!file) return;                // 用户取消选择时 files[0] 为 undefined

  this.$emit("updown", {
    doName: file.name,
    size: (file.size / 1024 / 1024).toFixed(2) + "MB",
  });

  e.target.value = ""; // 清空，保证下次选同一文件也能再次触发 change
}
```

- `e.target.files` 是用户选中的文件列表，`files[0]` 是第一个文件。
- `file.size` 单位是字节（Byte），`÷ 1024 ÷ 1024` 换算成 MB，`toFixed(2)` 保留两位小数。
- **清空 `e.target.value`** 是常见技巧：否则再次选择同一个文件，`change` 事件不会触发。

---

## 三、贯穿五个组件的核心知识点汇总

### 1. 组件通信方式

| 方向 | 方式 | 例子 |
| ---- | ---- | ---- |
| 父 → 子 | `props` 传数据 | `:documents="showList"` |
| 子 → 父 | `$emit` 发事件 | `this.$emit("search", keyword)` |
| 获取子组件/元素 | `ref` + `$refs` | `this.$refs.fileInput` |

### 2. 单向数据流（重点！）

- 数据只能由父组件流向子组件（通过 props），子组件**不能直接修改 props**。
- 子组件要改数据，必须 `$emit` 事件，让父组件去改。
- 好处：数据流向清晰、易于调试、状态可预测。

### 3. 状态提升（Lifting State Up）

- 多个子组件需要共享同一份数据时，把数据放在它们**共同的父组件**里管理。
- 本例中 `documents` / `showList` 放在 `document.vue`，三个子组件都通过事件和它交互。

### 4. props 与 emits 声明

```js
// 接收
props: { documents: { type: Array, required: true } }

// 发出（Vue3 推荐声明，增强可读性和类型提示）
emits: ["search"] / ["delete"] / ["updown"]
```

### 5. v-for 与 :key

```html
<documentItem v-for="doc in documents" :key="doc.id" :document="doc" />
```

- `v-for` 用于列表渲染；`:key` 用唯一标识（这里是 `doc.id`），提升渲染性能和正确性。

### 6. 方法调用中的参数传递

```html
<button @click="deleteBtn(document.id)">删除</button>
```

- 事件处理函数可以直接传参，把具体的数据（如 id）带过去。

---

## 四、易错点 & 注意事项

1. **修改数组要用响应式方法**：`push`、`filter`（返回新数组并重新赋值）都能触发更新；
   直接 `documents[0] = xxx` 或 `documents.length = 0` 不会触发视图更新（Vue2 的坑，Vue3 已改善）。

2. **`filter` 返回新数组**：删除用 `filter` 后要**重新赋值**给 `this.documents`，并同步 `showList`。

3. **两个数组要同步**：`documents` 和 `showList` 任何一方变化后，都要记得更新另一方，否则显示会不一致。

4. **事件层层转发**：`documentItem → documentList → document.vue`，每一层都要在 `emits` 里声明、
   在模板里 `@delete="xxx"` 监听、在方法里再次 `$emit`，少一环就会断。

5. **上传后清空 input**：`e.target.value = ""` 必须做，否则重复上传同一文件不触发 `change`。

6. **`ref` 与 `$refs` 时机**：`$refs` 要在组件挂载（mounted）后才能可靠访问，不要在 `created` 里用。

---

## 五、数据流实战复盘（一个完整操作）

**场景：用户搜索「发动机」，点击删除第一条，再上传一个新文件**

```
1. 输入关键字 → documentSearch.searchInput = "发动机"
2. 点搜索 → $emit("search", "发动机")
3. document.searchBtn("发动机") → showList = documents.filter(含"发动机")
4. showList 变化 → documentList 重新 v-for 渲染 → documentItem 只显示匹配行
5. 点删除 → documentItem $emit("delete", id)
6. documentList 转发 $emit("delete", id)
7. document.deleteBtn(id) → documents 过滤掉该 id → showList 同步
8. 点上传 → documentUpdown $refs.fileInput.click() → 选文件 → change
9. $emit("updown", {doName, size}) → document.upBtn → push 新对象 → showList 同步
```

每一步都是 **子组件发事件 → 父组件改数据 → 数据流回子组件重渲染**，形成完整闭环。

---

*本文档覆盖五个 document 组件的职责、通信方式与 Vue 核心知识点。*
