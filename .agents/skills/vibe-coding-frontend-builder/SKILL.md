---
name: vibe-coding-frontend-builder
description: 當需要從 0 到 1 快速構建前端應用、建立版本控制與 CI/CD 發佈管道，或進行增量功能開發與專案規範沉澱時使用此 Skill。
---

# VibeCoding 前端應用開發 Skill

本 Skill 提煉自實戰 VibeCoding 開發流程，旨在協助 AI 與開發者以「小步快跑、自動化發佈、隱性防禦與規範沉澱」為核心，極速建置並持續交付高品質的前端應用。

---

## 適用情境

- **MVP 快速構建**：從 0 到 1 打造工具型 Web App、單頁應用 (SPA)、個人管理系統或 Dashboard。
- **增量功能開發**：在既有專案中進行功能擴充、UI 調整或重構，並保持舊功能相容。
- **自動化工程建置**：建立 Git 版本控制、GitHub Pages/Vercel 發佈管道與 CI/CD 自動化。
- **專案資產與規範沉澱**：產出專案專屬的 `.agents/rules` 與 `.agents/workflows` 檔案，提升團隊與 AI 協作效率。

---

## 核心方法論（四心法）

- **基線先行 (Baseline First)**：先確保工具鏈、版本控制與部署管道暢通，再開始撰寫業務邏輯。
- **增量迭代 (Incremental Iteration)**：小步快跑，每次僅專注單一功能，完成即驗收並同步遠端。
- **隱性防禦 (Implicit Defense)**：主動處理 `.gitignore`、XSS 防護與舊資料相容，不待指令提示。
- **規範沉澱 (Rule Crystallization)**：將專案風格、架構慣例與 QA 流程自動轉化為 Rules 與 Workflows。

---

## 步驟序列

### 步驟 1：開發環境與 CLI 工具鏈檢查
- **目的**：確認系統必備開發工具（如 Git、GitHub CLI、Node/npm）已正確安裝與認證。
- **Prompt 模板**：
  > `幫我確認 [工具名稱 1，例如 Git] 和 [工具名稱 2，例如 GitHub CLI] 有沒有正確安裝並完成登入`
- **成功判斷標準**：取得各工具之版本號與認證狀態（如 `Logged in to github.com account...`）。

---

### 步驟 2：初始化版本控制與專案基線
- **目的**：建立乾淨的本地 Git 儲存庫，自動過濾不必要暫存檔並完成 Root Commit。
- **Prompt 模板**：
  > `目前我的專案裡有 [專案檔案與結構描述，例如 index.html, style.css, app.js]。請幫我初始化 Git 版本控制，自動建立 .gitignore 排除不必要的暫存與套件檔案，並建立第一次 commit`
- **成功判斷標準**：自動產出 `.gitignore`，本地預設分支 `main` 完成首個提交，且 `git status` 顯示 `working tree clean`。

---

### 步驟 3：遠端儲存庫建立與 CI/CD 發佈
- **目的**：建立 GitHub 遠端儲存庫，推向遠端並開啓自動化線上發佈預覽連結。
- **Prompt 模板**：
  > `幫我建立一個 GitHub Repo 叫做 [專案名稱，例如 my-app]，設成 [public/private]，把現有的 commit 推上去，然後開啟 [GitHub Pages/Vercel/Netlify] 讓專案有公開預覽連結`
- **成功判斷標準**：取得遠端 GitHub Repo 連結與公開發佈網址（如 `https://username.github.io/my-app/`），且網址可正常存取。

---

### 步驟 4：增量功能實作與動態發佈
- **目的**：新增或修改單一業務功能，實施防禦性編程（如 XSS 防護、資料向下相容），並自動同步遠端。
- **Prompt 模板**：
  > `幫我在 [目標 UI 位置/元件] 上加入 [新功能/欄位描述，例如 截止日期欄位]，需求為：[需求細節 1，例如 可選填]、[需求細節 2，例如 今日到期顯示紅色]，其他原有功能不要改動`
- **成功判斷標準**：新功能通過測試，舊功能運作正常，變更自動提交 (Commit & Push) 至遠端儲存庫。

---

### 步驟 5：開發規範沉澱 (Rules Extraction)
- **目的**：將專案架構、代碼風格、安全性要求與提交規範固化為文字規範檔。
- **Prompt 模板**：
  > `按照現有的專案架構與狀態，撰寫開發與規範文件進 Rules 檔案 [.agents/rules/指定檔名.md]`
- **成功判斷標準**：產出結構化 Markdown 規範檔，包含 HTML/CSS/JS 寫作標準、安全要求與 Git Commit 規範，並納入版本控制。

---

### 步驟 6：QA 工作流建立與系統驗收 (Workflow Audit)
- **目的**：建立標準化 UI/UX / 功能 QA 測試 SOP，並執行全自動/半自動最終驗收。
- **Prompt 模板**：
  > `在專案目錄底下建立 Workflows 檔案 [.agents/workflows/指定檔名.md]，並立即執行 [@指定檔名.md] 進行全面驗收`
- **成功判斷標準**：產出詳細的 UX/功能 Checklist，並輸出各項 100% 通過的 Audit 稽核報告。

---

## 常見問題處理

### 問題 1：CLI 工具路徑找不到（例如 `zsh: command not found: gh`）
- **原因**：工具（如 Homebrew 或 nvm）安裝路徑未自動載入至目前 Shell 的 `PATH` 中。
- **解法**：
  1. 使用 `find` 或 `which` 搜尋常見安裝路徑（如 `/opt/homebrew/bin/gh`）。
  2. 在執行指令時前置匯入 PATH：`export PATH="/opt/homebrew/bin:$PATH" && gh --version`。
  3. 提示使用者於 `~/.zshrc` 加入 `eval "$(/opt/homebrew/bin/brew shellenv)"`。

### 問題 2：新增資料欄位導致既有 LocalStorage 壞掉（Schema Conflict）
- **原因**：讀取舊有數據時，新欄位為 `undefined` 導致前端選取或渲染邏輯報錯。
- **解法**：
  1. 實施防禦性讀取：`(task.dueDate || '')` 或可選鏈運算子 `task?.dueDate`。
  2. 在載入資料時加入 Migration 邏輯（如自動為舊資料補齊預設欄位值）。

### 問題 3：GitHub Pages 發佈後出現 404 或內容未更新
- **原因**：GitHub Pages 首次建置需要 1~2 分鐘，或 Publish 來源分支/路徑設定錯誤。
- **解法**：
  1. 使用 `gh api` 驗證 Pages 設定：`gh api repos/{owner}/{repo}/pages` 確認分支為 `main` 且路徑為 `/`。
  2. 檢查 `status` 是否為 `building` 或 `built`，提示使用者稍微重新整理頁面。

### 問題 4：多次微調導致代碼混亂、難以追溯
- **原因**：未堅持「一功能一 Commit」，多項變更混在一起。
- **解法**：
  1. 嚴格遵循小步快跑原則：完成並驗收單一需求後，立即執行 `git commit` 與 `git push`。
  2. 使用 `git diff` 隨時確認變更範圍僅包含該次需求所及之檔案。
