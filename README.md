# Aviation Knowledge Platform

航空知识管理全栈项目，基于 Vue 3 前端和 Python 后端开发。

## 项目结构

```text
apps/web       Vue 3 + Vite 前端
services/api   Python 后端服务
docs            项目组件和开发文档
```

## 前端启动

```powershell
cd apps/web
npm install
npm run dev
```

## 后端启动

```powershell
cd services/api
python -m uvicorn main:app --reload
```

## 技术栈

- Vue 3
- Vite
- Pinia
- Vue Router
- Axios
- Python

旧版页面、练习代码和练习数据保留在本地，但不属于本项目仓库提交内容。
