# Focus & Do - 簡約待辦事項與看板管理工具

> 一款極簡質感、支援 Kanban 看板拖曳、任務分類、優先級與截止日期提醒的現代化待辦事項管理工具。

![GitHub Pages Status](https://img.shields.io/badge/GitHub%20Pages-Online-success?style=flat-square&logo=github)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

🌐 **公開線上展示網址**：[https://corrinehuang168-ux.github.io/kanban-app/](https://corrinehuang168-ux.github.io/kanban-app/)

---

## ✨ 特色功能 (Features)

- 📌 **三欄式看板 (Kanban Board)**：支援 **To-do** (待辦)、**Process** (進行中)、**Done** (已完成) 狀態直覺拖曳 (Drag & Drop) 與切換。
- 💼 **工作與生活分類 (Category)**：支援 **工作 💼** 與 **生活 🌱** 標籤分類與數量即時統計。
- 🔥 **優先級管理 (Priority)**：可設定高 (High)、中 (Medium)、低 (Low) 優先級，系統自動依優先度與時間排序。
- 👤 **任務負責人 (Assignee)**：支援選填任務負責人名字。
- 📅 **截止日期與到期提醒 (Due Date & Overdue Alert)**：
  - 支援選填任務截止日期。
  - 卡片上自動呈現 `年/月/日` 標籤。
  - **今天到期或已過期**之任務標籤會自動呈現**紅底白字醒目提醒**。
- 🌓 **深淺模式切換 (Dark / Light Theme)**：支援暖色調明亮模式與暗色模式一鍵切換。
- 💾 **本地資料持久化 (LocalStorage Persistence)**：重新開啟網頁或重新整理時，任務紀錄自動保存不流失。

---

## 🛠️ 技術棧 (Tech Stack)

| 領域 | 使用技術 |
| :--- | :--- |
| **前端結構** | HTML5 (語意化標籤) |
| **樣式設計** | Vanilla CSS (CSS 變數、Glassmorphism 毛玻璃特效、響應式 Flexbox/Grid) |
| **互動邏輯** | JavaScript ES6+ (HTML5 Drag and Drop API, DOM 動態渲染) |
| **資料儲存** | Browser LocalStorage API |
| **網站部署** | GitHub Pages |

---

## 📁 專案結構 (Project Structure)

```text
kanban-app/
├── index.html       # 應用程式 UI 結構
├── style.css        # 設計系統與 CSS 樣式
├── app.js           # 看板邏輯、拖曳事件與 LocalStorage 操作
├── package.json     # 專案配置與說明
├── vercel.json      # 部署設定檔
├── .gitignore       # Git 檔案排除規則
└── .agents/
    └── rules/
        └── docs-writing.md  # 專案文件與 Commit 撰寫規範
```

---

## 🚀 本地開發與運行 (Local Setup)

本專案採用純前端技術開發，無需複雜構建過程：

1. **複製專案庫 (Clone)**
   ```bash
   git clone https://github.com/corrinehuang168-ux/kanban-app.git
   cd kanban-app
   ```

2. **開啟專案**
   - 直接以瀏覽器開啟 `index.html` 檔案。
   - 或使用 VS Code 的 **Live Server** 擴充功能啟動本地服務器。

---

## 📄 授權條款 (License)

本專案採用 [MIT License](LICENSE) 授權。
