---
name: architecture
description: 指導 Web 應用前端架構設計、模組拆分、目錄結構維護與擴充性規劃。當進行專案重構、架構設計或模組規劃時觸發此 Skill。
---

# Frontend Architecture Skill (前端架構設計規範)

本 Skill 提供標準化的前端架構方針，確保 Web 應用具備高可讀性、低偶合度與良好的擴充性。

---

## 核心分層原則 (Architectural Layers)

1. **UI 視圖層 (View Layer)**
   - 專注於 DOM 結構生成、事件監聽與 CSS 樣式展現。
   - 禁止在 UI 層直接寫死複雜資料處理邏輯。

2. **業務邏輯層 (Business Logic Layer)**
   - 負責處理資料過濾、排序、計算與狀態轉移。
   - 保持邏輯純粹性 (Pure Functions)，便於測試與重用。

3. **資料持久層 (Data & Persistence Layer)**
   - 統一封裝 LocalStorage 或 API 通訊邏輯。
   - 處理 Schema Migration、預設值補全與防禦性轉譯。

---

## 目錄結構規範 (Standard Project Tree)

```text
project-root/
├── index.html       # 應用程式 UI 結構與 Semantic HTML
├── style.css        # 設計系統 tokens、元件樣式與 Media Queries
├── app.js           # 應用程式入口、事件綁定與狀態驅動引擎
└── .agents/
    ├── rules/       # 專案程式碼與文件發展規範
    ├── skills/      # 團隊與 AI 重用技能庫
    └── workflows/   # 自動化 QA 與驗收工作流
```
