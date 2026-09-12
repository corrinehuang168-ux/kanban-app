---
name: backend-integration
description: 指導 RESTful API / GraphQL 整合、異步 Fetch 處理、錯誤重試與資料轉換機制。當進行 API 對接、伺服器資料通訊時觸發此 Skill。
---

# Backend Integration Skill (後端通訊與 API 對接規範)

本 Skill 提供標準化的前端非同步 HTTP 請求處理與 API 對接方針。

---

## 非同步請求原則 (Async Fetch Standards)

1. **統一 Async / Await 與 Try-Catch**
   - 所有網絡請求必須封裝在 `try { ... } catch (error) { ... }` 區塊中。
   - 明確處理 HTTP 錯誤狀態碼（如 404, 401, 500）。

2. **資料防禦與轉化 (Data Adapter)**
   - API 回傳資料進入全域狀態前，先經過 Adapter 轉化並給予預設值。
   - 防止後端 `null` 或未定義欄位導致前端崩潰。

3. **網路狀態與 Loading 視覺回饋**
   - 請求發出時啟動按鈕 Disable 或 Spinner。
   - 發生錯誤時顯示可理解的中文錯誤訊息通知。
