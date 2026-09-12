---
name: state-management
description: 指導單向資料流、狀態維護、LocalStorage 持久化、資料向下相容與 Migration 策略。當處理狀態變更、快取或資料儲存時觸發此 Skill。
---

# State Management Skill (狀態管理與持久化規範)

本 Skill 提供可預測的單向資料流與 LocalStorage 安全持久化方針。

---

## 核心單向資料流 (Unidirectional Data Flow)

```text
[ User Action / Event ] 
        │
        ▼
[ Update State Array (tasks) ]
        │
        ▼
[ Persist State (saveTasks to LocalStorage) ]
        │
        ▼
[ Re-render UI (render) ]
```

---

## 防禦性寫入與讀取原則

1. **命名空間前綴 (Namespace)**
   - 所有 LocalStorage Key 必須統一前綴（如 `minimal_todo_tasks`），防範衝突。

2. **Schema 向下相容 (Migration & Fallbacks)**
   - 讀取資料時應補全缺漏欄位（例如：`task.dueDate || ''`）。
   - 處理舊版格式時自動執行資料結構修復。

3. **純粹狀態重繪**
   - 避免在 DOM 上直接手動修改資料，所有改變統一經由狀態重繪處理。
