---
name: coding-standards
description: 指導 HTML/CSS/JS 代碼規範、XSS 安全防護、a11y 無障礙支援與 Git Commit 語意化。當編寫與重構程式碼時觸發此 Skill。
---

# Coding Standards Skill (程式碼與品質規範)

本 Skill 提供高品質、安全且易維護的程式碼實作規範。

---

## 核心代碼標準

1. **XSS 安全防範**
   - 插入使用者輸入動態內容至 DOM 時，必須使用 `.textContent` 或 `document.createTextNode`。
   - 嚴禁拼接未經轉義的字串至 `innerHTML`。

2. **無障礙功能 (Accessibility / a11y)**
   - 互動元素必須包含 `aria-label` 或連結對應標籤 `<label>`。
   - 確保所有功能皆可透過 Keyboard 鍵盤導覽使用。

3. **Git Commit 語意化**
   - 遵循 `feat`, `fix`, `docs`, `style`, `refactor` 之前綴格式。
