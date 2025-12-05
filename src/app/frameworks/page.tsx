'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code } from '@/components/ui/code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { 
  Copy, 
  Check, 
  Download,
  Terminal,
  Code2,
  FileText,
  Box,
  Zap,
  Package,
  Rocket
} from 'lucide-react';

const frameworkExamples = {
  react: {
    setup: `# Create React App
npx create-react-app my-onekit-app
cd my-onekit-app

# Install OneKit
npm install onekit-js

# Start development
npm start`,
    basic: `import { useEffect, useState } from 'react';
import { ok, reactive, watch } from 'onekit-js';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create reactive state
    const state = reactive({ 
      count: 0,
      name: 'React + OneKit'
    });

    // Watch for changes
    watch(state, 'count', (next) => {
      ok('#count').text(String(next));
    });

    watch(state, 'name', (next) => {
      ok('#title').text(next);
    });

    // Event handlers
    ok('#inc').click(() => state.count++);
    ok('#dec').click(() => state.count--);
    
    ok('#update-name').click(() => {
      const input = document.querySelector('#name-input');
      state.name = input?.value || 'OneKit';
    });

  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8">
      <h1 id="title">React + OneKit</h1>
      <div className="space-y-4">
        <div>
          Count: <span id="count">0</span>
        </div>
        <div className="space-x-2">
          <button id="inc">+</button>
          <button id="dec">-</button>
        </div>
        <div className="space-x-2">
          <input id="name-input" placeholder="Enter name" />
          <button id="update-name">Update Name</button>
        </div>
      </div>
    </div>
  );
}

export default App;`,
    advanced: `import { useEffect, useRef } from 'react';
import { ok, reactive, watch, announce } from 'onekit-js';

function TodoApp() {
  const appRef = useRef(null);

  useEffect(() => {
    if (!appRef.current) return;

    const state = reactive({
      todos: [],
      filter: 'all',
      newTodo: ''
    });

    // Watch for changes
    watch(state, 'todos', renderTodos);
    watch(state, 'filter', renderTodos);

    function renderTodos() {
      const filtered = state.todos.filter(todo => {
        if (state.filter === 'active') return !todo.completed;
        if (state.filter === 'completed') return todo.completed;
        return true;
      });

      const html = filtered.map(todo => \`
        <li class="todo-item \${todo.completed ? 'completed' : ''}">
          <input type="checkbox" 
                 \${todo.completed ? 'checked' : ''} 
                 data-id="\${todo.id}">
          <span>\${todo.text}</span>
          <button class="delete" data-id="\${todo.id}">×</button>
        </li>
      \`).join('');

      ok('#todo-list').html(html);
      
      // Re-attach event listeners
      ok('#todo-list input').on('change', (e) => {
        const id = parseInt(e.target.dataset.id);
        const todo = state.todos.find(t => t.id === id);
        if (todo) {
          todo.completed = e.target.checked;
          announce(\`Todo \${todo.completed ? 'completed' : 'uncompleted'}\`);
        }
      });

      ok('#todo-list .delete').on('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        state.todos = state.todos.filter(t => t.id !== id);
        announce('Todo deleted');
      });
    }

    // Add new todo
    ok('#add-todo').on('submit', (e) => {
      e.preventDefault();
      const input = ok('#new-todo').element();
      const text = input.value.trim();
      
      if (text) {
        state.todos.push({
          id: Date.now(),
          text,
          completed: false
        });
        input.value = '';
        announce('Todo added');
      }
    });

    // Filter buttons
    ok('.filter-btn').on('click', (e) => {
      state.filter = e.target.dataset.filter;
      ok('.filter-btn').removeClass('active');
      ok(e.target).addClass('active');
    });

  }, []);

  return (
    <div ref={appRef} className="max-w-md mx-auto p-4">
      <h1>Todo App</h1>
      <form id="add-todo" className="flex gap-2 mb-4">
        <input 
          id="new-todo" 
          type="text" 
          placeholder="What needs to be done?"
          className="flex-1 px-2 py-1 border rounded"
        />
        <button type="submit">Add</button>
      </form>
      
      <div className="flex gap-2 mb-4">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="active">Active</button>
        <button class="filter-btn" data-filter="completed">Completed</button>
      </div>
      
      <ul id="todo-list"></ul>
    </div>
  );
}

export default TodoApp;`
  },
  vue: {
    setup: `# Vue 3 + Vite
npm create vue@latest my-onekit-app
cd my-onekit-app

# Install OneKit
npm install onekit-js

# Start development
npm run dev`,
    basic: `<script setup>
import { onMounted } from 'vue';
import { ok, reactive, watch } from 'onekit-js';

onMounted(() => {
  // Create reactive state
  const state = reactive({ 
    count: 0,
    name: 'Vue + OneKit'
  });

  // Watch for changes
  watch(state, 'count', (next) => {
    ok('#count').text(String(next));
  });

  watch(state, 'name', (next) => {
    ok('#title').text(next);
  });

  // Event handlers
  ok('#inc').click(() => state.count++);
  ok('#dec').click(() => state.count--);
  
  ok('#update-name').click(() => {
    const input = document.querySelector('#name-input');
    state.name = input?.value || 'OneKit';
  });
});
</script>

<template>
  <div class="p-8">
    <h1 id="title">Vue + OneKit</h1>
    <div class="space-y-4">
      <div>
        Count: <span id="count">0</span>
      </div>
      <div class="space-x-2">
        <button id="inc">+</button>
        <button id="dec">-</button>
      </div>
      <div class="space-x-2">
        <input id="name-input" placeholder="Enter name" />
        <button id="update-name">Update Name</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}
.space-x-2 > * + * {
  margin-left: 0.5rem;
}
</style>`,
    advanced: `<script setup>
import { onMounted } from 'vue';
import { ok, reactive, watch, announce } from 'onekit-js';

onMounted(() => {
  const state = reactive({
    todos: [],
    filter: 'all'
  });

  // Watch for changes
  watch(state, 'todos', renderTodos);
  watch(state, 'filter', renderTodos);

  function renderTodos() {
    const filtered = state.todos.filter(todo => {
      if (state.filter === 'active') return !todo.completed;
      if (state.filter === 'completed') return todo.completed;
      return true;
    });

    const html = filtered.map(todo => \`
      <li class="todo-item \${todo.completed ? 'completed' : ''}">
        <input type="checkbox" 
               \${todo.completed ? 'checked' : ''} 
               data-id="\${todo.id}">
        <span>\${todo.text}</span>
        <button class="delete" data-id="\${todo.id}">×</button>
      </li>
    \`).join('');

    ok('#todo-list').html(html);
    
    // Re-attach event listeners
    ok('#todo-list input').on('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = e.target.checked;
        announce(\`Todo \${todo.completed ? 'completed' : 'uncompleted'}\`);
      }
    });

    ok('#todo-list .delete').on('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      state.todos = state.todos.filter(t => t.id !== id);
      announce('Todo deleted');
    });
  }

  // Add new todo
  ok('#add-todo').on('submit', (e) => {
    e.preventDefault();
    const input = ok('#new-todo').element();
    const text = input.value.trim();
    
    if (text) {
      state.todos.push({
        id: Date.now(),
        text,
        completed: false
      });
      input.value = '';
      announce('Todo added');
    }
  });

  // Filter buttons
  ok('.filter-btn').on('click', (e) => {
    state.filter = e.target.dataset.filter;
    ok('.filter-btn').removeClass('active');
    ok(e.target).addClass('active');
  });
});
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h1>Todo App</h1>
    <form id="add-todo" class="flex gap-2 mb-4">
      <input 
        id="new-todo" 
        type="text" 
        placeholder="What needs to be done?"
        class="flex-1 px-2 py-1 border rounded"
      />
      <button type="submit">Add</button>
    </form>
    
    <div class="flex gap-2 mb-4">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
    </div>
    
    <ul id="todo-list"></ul>
  </div>
</template>

<style scoped>
.todo-item {
  @apply flex items-center gap-2 p-2 border rounded;
}
.todo-item.completed {
  @apply opacity-50;
}
.todo-item input[type="checkbox"] {
  @apply w-4 h-4;
}
.todo-item .delete {
  @apply ml-auto text-red-500 hover:text-red-700;
}
.filter-btn.active {
  @apply bg-blue-500 text-white;
}
</style>`
  },
  svelte: {
    setup: `# Create SvelteKit app
npm create svelte@latest my-onekit-app
cd my-onekit-app

# Install OneKit
npm install onekit-js

# Start development
npm run dev`,
    basic: `<script>
  import { onMount } from 'svelte';
  import { ok, reactive, watch } from 'onekit-js';

  onMount(() => {
    // Create reactive state
    const state = reactive({ 
      count: 0,
      name: 'Svelte + OneKit'
    });

    // Watch for changes
    watch(state, 'count', (next) => {
      ok('#count').text(String(next));
    });

    watch(state, 'name', (next) => {
      ok('#title').text(next);
    });

    // Event handlers
    ok('#inc').click(() => state.count++);
    ok('#dec').click(() => state.count--);
    
    ok('#update-name').click(() => {
      const input = document.querySelector('#name-input');
      state.name = input?.value || 'OneKit';
    });
  });
</script>

<div class="p-8">
  <h1 id="title">Svelte + OneKit</h1>
  <div class="space-y-4">
    <div>
      Count: <span id="count">0</span>
    </div>
    <div class="space-x-2">
      <button id="inc">+</button>
      <button id="dec">-</button>
    </div>
    <div class="space-x-2">
      <input id="name-input" placeholder="Enter name" />
      <button id="update-name">Update Name</button>
    </div>
  </div>
</div>

<style>
  :global(.space-y-4 > * + *) {
    margin-top: 1rem;
  }
  :global(.space-x-2 > * + *) {
    margin-left: 0.5rem;
  }
</style>`,
    advanced: `<script>
  import { onMount } from 'svelte';
  import { ok, reactive, watch, announce } from 'onekit-js';

  onMount(() => {
    const state = reactive({
      todos: [],
      filter: 'all'
    });

    // Watch for changes
    watch(state, 'todos', renderTodos);
    watch(state, 'filter', renderTodos);

    function renderTodos() {
      const filtered = state.todos.filter(todo => {
        if (state.filter === 'active') return !todo.completed;
        if (state.filter === 'completed') return todo.completed;
        return true;
      });

      const html = filtered.map(todo => \`
        <li class="todo-item \${todo.completed ? 'completed' : ''}">
          <input type="checkbox" 
                 \${todo.completed ? 'checked' : ''} 
                 data-id="\${todo.id}">
          <span>\${todo.text}</span>
          <button class="delete" data-id="\${todo.id}">×</button>
        </li>
      \`).join('');

      ok('#todo-list').html(html);
      
      // Re-attach event listeners
      ok('#todo-list input').on('change', (e) => {
        const id = parseInt(e.target.dataset.id);
        const todo = state.todos.find(t => t.id === id);
        if (todo) {
          todo.completed = e.target.checked;
          announce(\`Todo \${todo.completed ? 'completed' : 'uncompleted'}\`);
        }
      });

      ok('#todo-list .delete').on('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        state.todos = state.todos.filter(t => t.id !== id);
        announce('Todo deleted');
      });
    }

    // Add new todo
    ok('#add-todo').on('submit', (e) => {
      e.preventDefault();
      const input = ok('#new-todo').element();
      const text = input.value.trim();
      
      if (text) {
        state.todos.push({
          id: Date.now(),
          text,
          completed: false
        });
        input.value = '';
        announce('Todo added');
      }
    });

    // Filter buttons
    ok('.filter-btn').on('click', (e) => {
      state.filter = e.target.dataset.filter;
      ok('.filter-btn').removeClass('active');
      ok(e.target).addClass('active');
    });
  });
</script>

<div class="max-w-md mx-auto p-4">
  <h1>Todo App</h1>
  <form id="add-todo" class="flex gap-2 mb-4">
    <input 
      id="new-todo" 
      type="text" 
      placeholder="What needs to be done?"
      class="flex-1 px-2 py-1 border rounded"
    />
    <button type="submit">Add</button>
  </form>
  
  <div class="flex gap-2 mb-4">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="active">Active</button>
    <button class="filter-btn" data-filter="completed">Completed</button>
  </div>
  
  <ul id="todo-list"></ul>
</div>

<style>
  :global(.todo-item) {
    @apply flex items-center gap-2 p-2 border rounded;
  }
  :global(.todo-item.completed) {
    @apply opacity-50;
  }
  :global(.todo-item input[type="checkbox"]) {
    @apply w-4 h-4;
  }
  :global(.todo-item .delete) {
    @apply ml-auto text-red-500 hover:text-red-700;
  }
  :global(.filter-btn.active) {
    @apply bg-blue-500 text-white;
  }
</style>`
  },
  vanilla: {
    setup: `# Create vanilla project
mkdir my-onekit-app
cd my-onekit-app

# Initialize package.json
npm init -y

# Install OneKit
npm install onekit-js

# Create index.html and main.js
touch index.html main.js

# Serve with live-server
npx live-server`,
    basic: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanilla + OneKit</title>
</head>
<body>
  <div id="app" class="p-8">
    <h1 id="title">Vanilla + OneKit</h1>
    <div class="space-y-4">
      <div>
        Count: <span id="count">0</span>
      </div>
      <div class="space-x-2">
        <button id="inc">+</button>
        <button id="dec">-</button>
      </div>
      <div class="space-x-2">
        <input id="name-input" placeholder="Enter name" />
        <button id="update-name">Update Name</button>
      </div>
    </div>
  </div>

  <script type="module">
    import { ok, reactive, watch } from './node_modules/onekit-js/dist/onekit.esm.js';

    // Create reactive state
    const state = reactive({ 
      count: 0,
      name: 'Vanilla + OneKit'
    });

    // Watch for changes
    watch(state, 'count', (next) => {
      ok('#count').text(String(next));
    });

    watch(state, 'name', (next) => {
      ok('#title').text(next);
    });

    // Event handlers
    ok('#inc').click(() => state.count++);
    ok('#dec').click(() => state.count--);
    
    ok('#update-name').click(() => {
      const input = document.querySelector('#name-input');
      state.name = input?.value || 'OneKit';
    });
  </script>

  <style>
    .space-y-4 > * + * {
      margin-top: 1rem;
    }
    .space-x-2 > * + * {
      margin-left: 0.5rem;
    }
    .p-8 {
      padding: 2rem;
    }
  </style>
</body>
</html>`,
    advanced: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Todo App</title>
</head>
<body>
  <div id="app" class="max-w-md mx-auto p-4">
    <h1>Todo App</h1>
    <form id="add-todo" class="flex gap-2 mb-4">
      <input 
        id="new-todo" 
        type="text" 
        placeholder="What needs to be done?"
        class="flex-1 px-2 py-1 border rounded"
      />
      <button type="submit">Add</button>
    </form>
    
    <div class="flex gap-2 mb-4">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
    </div>
    
    <ul id="todo-list"></ul>
  </div>

  <script type="module">
    import { ok, reactive, watch, announce } from './node_modules/onekit-js/dist/onekit.esm.js';

    const state = reactive({
      todos: [],
      filter: 'all'
    });

    // Watch for changes
    watch(state, 'todos', renderTodos);
    watch(state, 'filter', renderTodos);

    function renderTodos() {
      const filtered = state.todos.filter(todo => {
        if (state.filter === 'active') return !todo.completed;
        if (state.filter === 'completed') return todo.completed;
        return true;
      });

      const html = filtered.map(todo => \`
        <li class="todo-item \${todo.completed ? 'completed' : ''}">
          <input type="checkbox" 
                 \${todo.completed ? 'checked' : ''} 
                 data-id="\${todo.id}">
          <span>\${todo.text}</span>
          <button class="delete" data-id="\${todo.id}">×</button>
        </li>
      \`).join('');

      ok('#todo-list').html(html);
      
      // Re-attach event listeners
      ok('#todo-list input').on('change', (e) => {
        const id = parseInt(e.target.dataset.id);
        const todo = state.todos.find(t => t.id === id);
        if (todo) {
          todo.completed = e.target.checked;
          announce(\`Todo \${todo.completed ? 'completed' : 'uncompleted'}\`);
        }
      });

      ok('#todo-list .delete').on('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        state.todos = state.todos.filter(t => t.id !== id);
        announce('Todo deleted');
      });
    }

    // Add new todo
    ok('#add-todo').on('submit', (e) => {
      e.preventDefault();
      const input = ok('#new-todo').element();
      const text = input.value.trim();
      
      if (text) {
        state.todos.push({
          id: Date.now(),
          text,
          completed: false
        });
        input.value = '';
        announce('Todo added');
      }
    });

    // Filter buttons
    ok('.filter-btn').on('click', (e) => {
      state.filter = e.target.dataset.filter;
      ok('.filter-btn').removeClass('active');
      ok(e.target).addClass('active');
    });
  </script>

  <style>
    .todo-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
    }
    .todo-item.completed {
      opacity: 0.5;
    }
    .todo-item input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
    }
    .todo-item .delete {
      margin-left: auto;
      color: #ef4444;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
    }
    .todo-item .delete:hover {
      color: #dc2626;
    }
    .filter-btn.active {
      background-color: #3b82f6;
      color: white;
    }
    .max-w-md {
      max-width: 28rem;
    }
    .mx-auto {
      margin-left: auto;
      margin-right: auto;
    }
    .p-4 {
      padding: 1rem;
    }
    .flex {
      display: flex;
    }
    .gap-2 {
      gap: 0.5rem;
    }
    .mb-4 {
      margin-bottom: 1rem;
    }
    .flex-1 {
      flex: 1;
    }
    .px-2 {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    .py-1 {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
    .border {
      border: 1px solid #ccc;
    }
    .rounded {
      border-radius: 0.25rem;
    }
    button {
      padding: 0.25rem 0.5rem;
      border: 1px solid #ccc;
      background: white;
      cursor: pointer;
      border-radius: 0.25rem;
    }
    button:hover {
      background-color: #f3f4f6;
    }
  </style>
</body>
</html>`
  }
};

export default function FrameworkGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeFramework, setActiveFramework] = useState('react');
  const [activeTab, setActiveTab] = useState('setup');

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const frameworks = [
    { id: 'react', name: 'React', icon: Code2, color: 'blue' },
    { id: 'vue', name: 'Vue', icon: Box, color: 'green' },
    { id: 'svelte', name: 'Svelte', icon: Zap, color: 'orange' },
    { id: 'vanilla', name: 'Vanilla JS', icon: Package, color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Rocket className="w-4 h-4 mr-2" />
            Framework Integration
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            OneKit with Your Favorite Framework
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to integrate OneKit JS with React, Vue, Svelte, or use it with vanilla JavaScript
          </p>
        </div>

        {/* Framework Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border bg-white dark:bg-slate-800 p-1">
            {frameworks.map((framework) => {
              const Icon = framework.icon;
              return (
                <Button
                  key={framework.id}
                  variant={activeFramework === framework.id ? 'default' : 'ghost'}
                  onClick={() => setActiveFramework(framework.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {framework.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Framework Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="basic">Basic Usage</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Example</TabsTrigger>
            </TabsList>

            {/* Setup Tab */}
            <TabsContent value="setup" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    {frameworks.find(f => f.id === activeFramework)?.name} Setup
                  </CardTitle>
                  <CardDescription>
                    Get started with OneKit in {frameworks.find(f => f.id === activeFramework)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{frameworkExamples[activeFramework as keyof typeof frameworkExamples].setup}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(
                        frameworkExamples[activeFramework as keyof typeof frameworkExamples].setup,
                        `${activeFramework}-setup`
                      )}
                    >
                      {copiedCode === `${activeFramework}-setup` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Basic Usage Tab */}
            <TabsContent value="basic" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Basic Usage Example
                  </CardTitle>
                  <CardDescription>
                    Simple counter and text input demonstration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{frameworkExamples[activeFramework as keyof typeof frameworkExamples].basic}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(
                        frameworkExamples[activeFramework as keyof typeof frameworkExamples].basic,
                        `${activeFramework}-basic`
                      )}
                    >
                      {copiedCode === `${activeFramework}-basic` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Example Tab */}
            <TabsContent value="advanced" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Box className="w-5 h-5" />
                    Advanced Todo App
                  </CardTitle>
                  <CardDescription>
                    Full-featured todo application with filtering and state management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{frameworkExamples[activeFramework as keyof typeof frameworkExamples].advanced}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(
                        frameworkExamples[activeFramework as keyof typeof frameworkExamples].advanced,
                        `${activeFramework}-advanced`
                      )}
                    >
                      {copiedCode === `${activeFramework}-advanced` ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Key Benefits */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Why Use OneKit with {frameworks.find(f => f.id === activeFramework)?.name}?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Enhanced State Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Complement your framework's reactivity with OneKit's simple and powerful state system
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">DOM Utilities</h4>
                    <p className="text-sm text-muted-foreground">
                      Access powerful DOM manipulation utilities when you need direct DOM access
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Framework Agnostic</h4>
                    <p className="text-sm text-muted-foreground">
                      Skills learned with OneKit transfer across all JavaScript frameworks
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Progressive Enhancement</h4>
                    <p className="text-sm text-muted-foreground">
                      Add OneKit features incrementally to existing projects without major refactoring
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}