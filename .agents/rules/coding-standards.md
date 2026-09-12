# Project Development & Coding Standards (專案開發與程式碼規範)

本規範根據 Focus & Do (Kanban App) 的現有專案架構與技術棧制定，所有新增與修改的程式碼皆需遵循本規範。

---

## 1. 核心開發原則 (Core Architecture Principles)

- **原生輕量技術 (Zero-Dependency Vanilla Web)**：
  - 本專案採用純原生 HTML5、CSS3 與 ES6+ JavaScript，不引入 React、Vue、TailwindCSS 或 jQuery 等外部前端框架，維持專案輕量與極速載入。
- **單向資料流與狀態驅動 (State-Driven Rendering)**：
  - 所有狀態變更皆應更新 `tasks` 狀態陣列，透過 `saveTasks()` 寫入 LocalStorage，最後統一呼叫 `render()` 重繪 UI。

---

## 2. HTML 規範

- **語意化結構 (Semantic HTML5)**：
  - 使用 HTML5 語意標籤（如 `<header>`, `<main>`, `<section>`, `<footer>`）。
- **無障礙支援 (Accessibility / a11y)**：
  - 所有互動元素（按鈕、選單、輸入框）皆需具備明確的 `aria-label` 或對應 `<label>` 標籤。
- **XSS 安全防護**：
  - 動態使用者輸入（如任務標題、負責人名字）插入 DOM 節點時，**嚴禁直接組裝 HTML**，必須使用 `textContent` 進行純文字指派。

---

## 3. CSS 樣式規範

- **設計系統與變數 (Design Tokens & CSS Variables)**：
  - 所有顏色、陰影、圓角、過渡動畫一律使用 `:root` 與 `[data-theme="dark"]` 中定義的 CSS 變數（例如 `--bg-primary`, `--accent-primary`, `--radius-md`）。
  - 避免寫死內聯顏色 (Inline styles) 或魔法數字 (Magic Numbers)。
- **雙主題支援 (Dark / Light Theme)**：
  - 新增元件時必須確保在明亮模式與暗色模式下皆具有良好的視覺視覺品質與色彩對比度。
- **響應式佈局 (Responsive Design)**：
  - 版面採用 Flexbox 與 CSS Grid 佈局。
  - Breakpoint 斷點規範：
    - `768px` 以下：看板多欄轉為單欄直向排列。
    - `480px` 以下：表單選項垂直堆疊並優化觸控區域。

---

## 4. JavaScript 邏輯規範

- **命名與函式拆分**：
  - 變數與 DOM 選擇器統一採用駝峰命名 (`camelCase`)（如 `taskInput`, `priorityInput`）。
  - 函式依職責命名：事件處理器使用 `handle` 前綴（如 `handleAddTask`, `handleClearCompleted`），商業邏輯使用動詞開頭（如 `moveTaskToStatus`, `deleteTask`）。
- **LocalStorage 資料持久化**：
  - Storage Key 統一加上專案前綴 `minimal_todo_`（如 `minimal_todo_tasks`），避免全域 Key 衝突。
  - 讀取 LocalStorage 資料時需考量預設值向下相容性。
- **拖曳 API (Drag & Drop)**：
  - 採用原生 HTML5 Drag and Drop API，維護 `dragstart`, `dragover`, `dragenter`, `dragleave`, `drop`, `dragend` 事件。

---

## 5. 版本控制與發佈流程 (Git & Release Workflow)

- **提交規範**：
  - 變更前確保本地測試無誤，並遵循 `.agents/rules/docs-writing.md` 之 Commit 格式。
- **GitHub Pages 自動發佈**：
  - 本專案已連結 GitHub Pages，程式碼推送到 `main` 分支後自動觸發線上建置與更新。
