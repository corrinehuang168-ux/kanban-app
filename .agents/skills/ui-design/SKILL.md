---
name: ui-design
description: 指導視覺設計系統、CSS 變數規範、深淺主題切換、毛玻璃 (Glassmorphism) 與動態互動設計。當開發 UI 介面、樣式或主題切換時觸發此 Skill。
---

# UI & Design System Skill (介面設計與視覺系統規範)

本 Skill 提供現代化 Web UI 設計方針，強調高質感視覺、動態微互動與深淺主題相容性。

---

## 核心設計系統 (Design Tokens)

1. **色彩系統與 CSS 變數**
   - 統一使用 `:root` 與 `[data-theme="dark"]` 定義 Design Tokens。
   - 包含 `--bg-primary`, `--bg-surface`, `--bg-card`, `--text-main`, `--accent-primary` 等。

2. **毛玻璃與階層感 (Glassmorphism)**
   - 卡片容器採用 `backdrop-filter: blur(16px)` 與微透明背景。
   - 配合背景微光 (`.glow`) 創造深邃層次感。

3. **雙主題相容性 (Dark / Light Theme)**
   - 確保明亮與暗色模式皆具備高對比度 (WCAG AA)。
   - 切換時使用 `transition: background-color var(--transition-normal)` 實現滑順視覺轉場。

4. **響應式佈局 (Responsive Breakpoints)**
   - `768px`：欄位轉換為直向單欄排列。
   - `480px`：表單垂直堆疊，點擊目標 (Tap Target) 保持 44px 以上。
