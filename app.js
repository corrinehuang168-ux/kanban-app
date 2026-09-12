/**
 * Minimalist Todo List - Kanban Board & Drag & Drop App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const todoForm = document.getElementById('todo-form');
  const taskInput = document.getElementById('task-input');
  const priorityInput = document.getElementById('priority-input');
  const assigneeInput = document.getElementById('assignee-input');
  const duedateInput = document.getElementById('duedate-input');
  const emptyState = document.getElementById('empty-state');
  
  const categoryFilters = document.getElementById('category-filters');
  const statusFilters = document.getElementById('status-filters');
  const clearCompletedBtn = document.getElementById('clear-completed-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  // Kanban Column Elements
  const columnLists = {
    todo: document.getElementById('column-list-todo'),
    process: document.getElementById('column-list-process'),
    done: document.getElementById('column-list-done')
  };

  const countEls = {
    todo: document.getElementById('todo-count'),
    process: document.getElementById('process-count'),
    done: document.getElementById('done-count')
  };

  const workCountEl = document.getElementById('work-count');
  const lifeCountEl = document.getElementById('life-count');
  const remainingCountEl = document.getElementById('remaining-count');

  // App State with Migration Support
  const priorityRank = { high: 3, medium: 2, low: 1, normal: 2 };
  let rawTasks = JSON.parse(localStorage.getItem('minimal_todo_tasks'));
  let tasks = [];
  
  if (rawTasks && Array.isArray(rawTasks)) {
    tasks = rawTasks.map(t => {
      if (!t.status) {
        t.status = t.completed ? 'done' : 'todo';
      }
      return t;
    });
  } else {
    tasks = [
      {
        id: '1',
        title: '完成每週工作進度報告',
        category: 'work',
        priority: 'high',
        assignee: 'Alex',
        status: 'process',
        createdAt: Date.now() - 3600000
      },
      {
        id: '2',
        title: '規劃下一季專案目標',
        category: 'work',
        priority: 'normal',
        assignee: 'Team',
        status: 'todo',
        createdAt: Date.now() - 1800000
      },
      {
        id: '3',
        title: '晚上準備健康晚餐材料',
        category: 'life',
        priority: 'normal',
        assignee: '自己',
        status: 'done',
        createdAt: Date.now() - 7200000
      }
    ];
  }

  let currentCategory = 'all'; // 'all' | 'work' | 'life'
  let currentStatus = 'all';    // 'all' | 'active' | 'completed' | 'todo' | 'process' | 'done'
  let draggedTaskId = null;

  // Initialize App
  initTheme();
  setupDragAndDrop();
  render();

  // Event Listeners
  todoForm.addEventListener('submit', handleAddTask);
  clearCompletedBtn.addEventListener('click', handleClearCompleted);
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Category Filter Listener
  categoryFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    currentCategory = btn.dataset.category;
    render();
  });

  // Status Filter Listener
  statusFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.status-btn');
    if (!btn) return;

    document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentStatus = btn.dataset.status;
    render();
  });

  // Drag and Drop Setup
  function setupDragAndDrop() {
    const columns = document.querySelectorAll('.kanban-column');
    
    columns.forEach(column => {
      column.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add('drag-over');
      });

      column.addEventListener('dragleave', (e) => {
        if (!column.contains(e.relatedTarget)) {
          column.classList.remove('drag-over');
        }
      });

      column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove('drag-over');
        const targetStatus = column.dataset.status;
        if (draggedTaskId && targetStatus) {
          moveTaskToStatus(draggedTaskId, targetStatus);
        }
      });
    });
  }

  // Handle Add Task
  function handleAddTask(e) {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    const categoryRadio = document.querySelector('input[name="category"]:checked');
    const category = categoryRadio ? categoryRadio.value : 'work';
    const priority = priorityInput.value;
    const assignee = (assigneeInput && assigneeInput.value.trim()) ? assigneeInput.value.trim() : '未指定';
    const dueDate = duedateInput ? duedateInput.value : '';

    const newTask = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      assignee,
      dueDate,
      status: 'todo',
      createdAt: Date.now()
    };

    tasks.unshift(newTask);
    saveTasks();
    
    // Reset form
    taskInput.value = '';
    if (assigneeInput) assigneeInput.value = '';
    if (duedateInput) duedateInput.value = '';
    taskInput.focus();
    render();
  }

  // Move Task Status
  function moveTaskToStatus(id, newStatus) {
    tasks = tasks.map(t => {
      if (t.id === id) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    saveTasks();
    render();
  }

  // Delete Task
  function deleteTask(id, taskElement) {
    taskElement.style.opacity = '0';
    taskElement.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      render();
    }, 200);
  }

  // Clear Completed (Done) Tasks
  function handleClearCompleted() {
    const hasDone = tasks.some(t => t.status === 'done');
    if (!hasDone) return;

    tasks = tasks.filter(t => t.status !== 'done');
    saveTasks();
    render();
  }

  // Filter Tasks Helper
  function getFilteredTasks() {
    return tasks.filter(task => {
      const matchCategory = currentCategory === 'all' || task.category === currentCategory;
      const matchStatus = 
        currentStatus === 'all' || 
        (currentStatus === 'active' && task.status !== 'done') ||
        (currentStatus === 'completed' && task.status === 'done') ||
        (currentStatus === task.status);
      
      return matchCategory && matchStatus;
    });
  }

  // Render Engine
  function render() {
    const filteredTasks = getFilteredTasks();

    // Sort tasks by Priority Rank descending (High -> Medium -> Low), then by Newest
    filteredTasks.sort((a, b) => {
      const rankA = priorityRank[a.priority] || 1;
      const rankB = priorityRank[b.priority] || 1;
      if (rankB !== rankA) {
        return rankB - rankA;
      }
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
    
    // Clear all 3 Kanban column lists
    Object.values(columnLists).forEach(list => {
      if (list) list.innerHTML = '';
    });
    
    if (filteredTasks.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      
      filteredTasks.forEach(task => {
        const targetList = columnLists[task.status] || columnLists.todo;
        if (!targetList) return;

        const li = document.createElement('li');
        li.className = `task-item ${task.status === 'done' ? 'completed' : ''}`;
        li.dataset.id = task.id;
        li.setAttribute('draggable', 'true');

        const categoryText = task.category === 'work' ? '💼 工作' : '🌱 生活';
        
        let priorityText = '';
        if (task.priority === 'high') {
          priorityText = '<span class="priority-tag high">🔥 高</span>';
        } else if (task.priority === 'medium') {
          priorityText = '<span class="priority-tag medium">⚡ 中</span>';
        } else if (task.priority === 'low') {
          priorityText = '<span class="priority-tag low">☕ 低</span>';
        }

        const assignee = task.assignee || '未指定';

        let dueDateTagHtml = '';
        if (task.dueDate) {
          const formattedDate = task.dueDate.replace(/-/g, '/');
          const now = new Date();
          const y = now.getFullYear();
          const m = String(now.getMonth() + 1).padStart(2, '0');
          const d = String(now.getDate()).padStart(2, '0');
          const todayStr = `${y}-${m}-${d}`;

          const isOverdueOrToday = task.dueDate <= todayStr;
          const overdueClass = isOverdueOrToday ? 'overdue' : '';
          dueDateTagHtml = `<span class="due-date-tag ${overdueClass}">📅 ${formattedDate}</span>`;
        }

        li.innerHTML = `
          <div class="task-left">
            <div class="task-content">
              <span class="task-title"></span>
              <div class="task-meta">
                <span class="category-tag ${task.category}">${categoryText}</span>
                ${priorityText}
                <span class="assignee-tag">👤 <span class="assignee-name"></span></span>
                ${dueDateTagHtml}
              </div>
            </div>
          </div>
          <button class="delete-btn" aria-label="刪除任務" title="刪除">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        `;

        // Safely insert text content to prevent XSS
        li.querySelector('.task-title').textContent = task.title;
        li.querySelector('.assignee-name').textContent = assignee;

        // HTML5 Drag Events
        li.addEventListener('dragstart', (e) => {
          draggedTaskId = task.id;
          li.classList.add('dragging');
          e.dataTransfer.setData('text/plain', task.id);
          e.dataTransfer.effectAllowed = 'move';
        });

        li.addEventListener('dragend', () => {
          li.classList.remove('dragging');
          draggedTaskId = null;
        });

        // Delete button event
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteTask(task.id, li);
        });

        targetList.appendChild(li);
      });
    }

    // Update Counters
    updateCounters();
  }

  // Update Counters & Badges
  function updateCounters() {
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const processCount = tasks.filter(t => t.status === 'process').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;

    if (countEls.todo) countEls.todo.textContent = todoCount;
    if (countEls.process) countEls.process.textContent = processCount;
    if (countEls.done) countEls.done.textContent = doneCount;

    const workCount = tasks.filter(t => t.category === 'work' && t.status !== 'done').length;
    const lifeCount = tasks.filter(t => t.category === 'life' && t.status !== 'done').length;
    const remainingCount = tasks.filter(t => t.status !== 'done').length;

    workCountEl.textContent = workCount;
    lifeCountEl.textContent = lifeCount;
    remainingCountEl.textContent = `${remainingCount} 個進行中/待辦任務`;
  }

  // Save Tasks to LocalStorage
  function saveTasks() {
    localStorage.setItem('minimal_todo_tasks', JSON.stringify(tasks));
  }

  // Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem('minimal_todo_theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIconSun.classList.remove('hidden');
      themeIconMoon.classList.add('hidden');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIconSun.classList.add('hidden');
      themeIconMoon.classList.remove('hidden');
    }
    localStorage.setItem('minimal_todo_theme', theme);
  }
});
