---
name: code-review
description: 指導程式碼審查 (Code Review)、效能瓶頸檢查、XSS 漏洞稽核與架構健康度評估。當審查 PR、重構或提交前稽核時觸發此 Skill。
---

# Code Review Skill (程式碼審查與稽核規範)

本 Skill 提供專業且系統化的 Code Review 檢查標準，確保專案代碼品質與資安。

---

## Code Review 稽核清單 (Review Checklist)

1. **資安與漏洞檢測 (Security)**
   - [ ] 檢視是否包含任何 `eval()` 或未轉義之 `innerHTML` 漏洞。
   - [ ] 確定無硬編碼 (Hardcoded) 敏感憑證或 API Key。

2. **效能與記憶體 (Performance)**
   - [ ] 檢視有無無窮迴圈、事件重複監聽或記憶體洩漏。
   - [ ] 確認 DOM 搜尋與重繪是否進行適當快取與防抖 (Debounce)。

3. **維護性與風格 (Maintainability)**
   - [ ] 是否遵循現有 `.agents/rules/` 之程式碼規範。
   - [ ] 函式是否職責單一、命名清晰且變數語意明確。
