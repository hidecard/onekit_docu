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
  Layers,
  Shield,
  Database,
  Router,
  Globe,
  Lock,
  Box,
  Cpu,
  Zap,
  Package,
  Settings
} from 'lucide-react';

const advancedExamples = {
  components: {
    basic: `import { register, create, mount } from 'onekit-js';

// Register a component
register('my-component', {
  name: 'my-component',
  template: '<div class="card">Hello {{name}}! Count: {{count}}</div>',
  props: { name: 'World' },
  data: () => ({ count: 0 }),
  methods: {
    increment() {
      this.count++;
      this.update();
    }
  },
  mounted() {
    console.log('Component mounted');
  },
  updated() {
    console.log('Component updated');
  }
});

// Create and mount
const comp = create('my-component', { name: 'OneKit' });
mount(comp, '#app');

// Access component methods
comp.increment();`,
    advanced: `import { register, create, mount, jsx } from 'onekit-js';

// Advanced component with lifecycle
register('user-card', {
  name: 'user-card',
  template: \`
    <div class="user-card">
      <img src="{{avatar}}" alt="{{name}}" class="avatar" />
      <div class="user-info">
        <h3>{{name}}</h3>
        <p>{{email}}</p>
        <div class="actions">
          <button onclick="{{edit}}">Edit</button>
          <button onclick="{{delete}}">Delete</button>
        </div>
      </div>
    </div>
  \`,
  props: {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    }
  },
  data() {
    return {
      isEditing: false,
      formData: { ...this.user }
    };
  },
  methods: {
    edit() {
      this.isEditing = true;
      this.update();
    },
    save() {
      this.user = { ...this.formData };
      this.isEditing = false;
      this.update();
      this.emit('user-updated', this.user);
    },
    delete() {
      this.emit('user-deleted', this.user);
    }
  },
  computed: {
    displayName() {
      return this.isEditing ? 'Editing...' : this.user.name;
    }
  }
});

// Using JSX syntax
const UserList = () => {
  const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ];

  return jsx('div', { className: 'user-list' },
    users.map(user => 
      jsx('user-card', { key: user.email, user })
    )
  );
};

mount(UserList(), '#app');`
  },
  vdom: {
    basic: `import { createElement, render, patch } from 'onekit-js';

// Create virtual nodes
const vnode1 = createElement('div', { 
  className: 'container',
  id: 'app'
}, 'Hello Virtual DOM!');

const vnode2 = createElement('div', { 
  className: 'container updated',
  id: 'app'
}, 'Hello Updated Virtual DOM!');

// Render to DOM
const element = render(vnode1);
document.body.appendChild(element);

// Patch for updates
setTimeout(() => {
  patch(element, vnode2, vnode1);
}, 2000);`,
    advanced: `import { createElement, render, patch, h } from 'onekit-js';

// Complex VDOM example with components
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return createElement('li', {
    className: \`todo-item \${todo.completed ? 'completed' : ''}\`,
    key: todo.id
  },
    createElement('input', {
      type: 'checkbox',
      checked: todo.completed,
      onChange: () => onToggle(todo.id)
    }),
    createElement('span', null, todo.text),
    createElement('button', {
      onClick: () => onDelete(todo.id)
    }, 'Delete')
  );
};

const TodoList = ({ todos, onToggle, onDelete }) => {
  return createElement('ul', { className: 'todo-list' },
    todos.map(todo => 
      TodoItem({ 
        key: todo.id, 
        todo, 
        onToggle, 
        onDelete 
      })
    )
  );
};

// Application state and rendering
let state = {
  todos: [
    { id: 1, text: 'Learn OneKit', completed: false },
    { id: 2, text: 'Build VDOM app', completed: false }
  ]
};

let currentVNode = null;
let container = null;

function renderApp() {
  const newVNode = createElement('div', { className: 'app' },
    createElement('h1', null, 'Todo App'),
    TodoList({
      todos: state.todos,
      onToggle: (id) => {
        state.todos = state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        renderApp();
      },
      onDelete: (id) => {
        state.todos = state.todos.filter(todo => todo.id !== id);
        renderApp();
      }
    })
  );

  if (container) {
    patch(container, newVNode, currentVNode);
  } else {
    container = render(newVNode);
    document.body.appendChild(container);
  }
  
  currentVNode = newVNode;
}

// Initial render
renderApp();`
  },
  security: {
    xss: `import { ok } from 'onekit-js';

// Safe HTML insertion (automatically sanitized)
const userInput = '<script>alert("XSS Attack!")</script><p>Safe content</p>';

// This automatically sanitizes the input
ok('#content').html(userInput);
// Result: <p>Safe content</p> (script tag removed)

// Safe text insertion
ok('#content').text(userInput);
// Result: &lt;script&gt;alert("XSS Attack!")&lt;/script&gt;&lt;p&gt;Safe content&lt;/p&gt;

// URL validation
const safeUrl = 'https://example.com';
const maliciousUrl = 'javascript:alert("XSS")';

ok('#link').attr('href', safeUrl);     // ✅ Allowed
ok('#link').attr('href', maliciousUrl); // ❌ Blocked/filtered`,
    storage: `import { localStorage, createStorage } from 'onekit-js';

// Safe storage operations (prevents prototype pollution)
localStorage.set('__proto__.malicious', 'blocked'); // Automatically prevented
localStorage.set('constructor.hack', 'blocked');    // Automatically prevented

// Custom storage with TTL and validation
const secureStorage = createStorage(localStorage, {
  prefix: 'myapp_',
  ttl: 10 * 60 * 1000, // 10 minutes
  validate: (key, value) => {
    // Custom validation logic
    if (key.includes('password')) {
      throw new Error('Cannot store passwords in localStorage');
    }
    return true;
  },
  encrypt: true // Optional encryption for sensitive data
});

// Usage
secureStorage.set('user', { name: 'John', role: 'admin' });
const user = secureStorage.get('user');

// Automatic cleanup of expired items
secureStorage.cleanup();`,
    validation: `import { ok, validateInput, sanitizeHTML } from 'onekit-js';

// Input validation
const userInput = '<img src=x onerror=alert(1)>';

// Validate CSS selectors
const isValidSelector = validateInput.selector(userInput);
if (!isValidSelector) {
  console.error('Invalid CSS selector');
}

// Validate URLs
const isValidUrl = validateInput.url(userInput);
if (!isValidUrl) {
  console.error('Invalid URL');
}

// Sanitize HTML
const cleanHTML = sanitizeHTML(userInput);
console.log(cleanHTML); // <img src="x"> (onerror removed)

// Form validation
ok('#contact-form').on('submit', (e) => {
  const formData = ok(e.target).form_data();
  
  // Validate email
  if (!validateInput.email(formData.email)) {
    announce('Please enter a valid email address', 'assertive');
    e.preventDefault();
    return;
  }
  
  // Validate phone number
  if (!validateInput.phone(formData.phone)) {
    announce('Please enter a valid phone number', 'assertive');
    e.preventDefault();
    return;
  }
  
  // Process valid form
  console.log('Form is valid:', formData);
});`
  },
  storage: {
    basic: `import { localStorage, sessionStorage } from 'onekit-js';

// Basic usage
localStorage.set('user', { name: 'John', id: 1 });
const user = localStorage.get('user');

// Check existence and get all keys
if (localStorage.has('user')) {
  console.log('User exists');
}
const keys = localStorage.keys();

// Session storage
sessionStorage.set('temp', 'temporary data');
const temp = sessionStorage.get('temp');

// Remove items
localStorage.remove('user');
localStorage.clear(); // Clear all`,
    advanced: `import { createStorage, deepCloneSafe } from 'onekit-js';

// Custom storage with TTL
const cache = createStorage(sessionStorage, {
  prefix: 'myapp_cache_',
  ttl: 10 * 60 * 1000, // 10 minutes
  maxSize: 1024 * 1024, // 1MB max
  compression: true,      // Compress large objects
  encryption: {
    key: 'my-secret-key',
    algorithm: 'AES-GCM'
  }
});

// Cache API responses
async function fetchWithCache(url) {
  const cacheKey = \`api_\${url}\`;
  
  // Try to get from cache first
  let data = cache.get(cacheKey);
  
  if (!data) {
    // Fetch from API
    const response = await fetch(url);
    data = await response.json();
    
    // Store in cache with 5-minute TTL
    cache.set(cacheKey, data, 5 * 60 * 1000);
  }
  
  return data;
}

// IndexedDB storage for large datasets
const dbStorage = createStorage('indexedDB', {
  dbName: 'MyAppDB',
  version: 1,
  stores: ['users', 'products', 'orders']
});

// Store large datasets
dbStorage.set('users', largeUserArray);
dbStorage.set('products', largeProductCatalog);

// Query with indexes
const activeUsers = dbStorage.query('users', {
  index: 'status',
  value: 'active'
});

// Storage events for cross-tab communication
localStorage.on('change', (event) => {
  console.log(\`Storage changed: \${event.key}\`);
  if (event.key === 'user-preferences') {
    updateUI(event.newValue);
  }
});`
  },
  router: {
    basic: `import { router } from 'onekit-js';

// Add routes
router.addRoute({
  path: '/home',
  handler: () => {
    console.log('Home route activated');
    loadComponent('home');
  }
});

router.addRoute({
  path: '/about',
  handler: () => {
    console.log('About page');
    loadComponent('about');
  }
});

router.addRoute({
  path: '/users/:id',
  handler: (params) => {
    console.log('User profile:', params.id);
    loadUserProfile(params.id);
  }
});

// Navigate programmatically
router.navigate('/home');
router.navigate('/users/123');

// Get current path
const currentPath = router.getCurrentPath();`,
    advanced: `import { router } from 'onekit-js';

// Advanced router with guards and middleware
router.addRoute({
  path: '/admin/*',
  handler: () => loadAdminPanel(),
  guards: [
    () => {
      // Authentication guard
      return isAuthenticated();
    },
    () => {
      // Authorization guard
      return hasAdminRole();
    }
  ],
  middleware: [
    (ctx, next) => {
      // Logging middleware
      console.log(\`Admin access: \${ctx.path}\`);
      next();
    },
    (ctx, next) => {
      // Analytics middleware
      trackPageView(ctx.path);
      next();
    }
  ]
});

// Lazy loading routes
router.addRoute({
  path: '/dashboard',
  handler: async () => {
    const module = await import('./components/Dashboard.js');
    const Dashboard = module.default;
    return Dashboard();
  },
  preload: true // Preload in background
});

// Route groups and nesting
router.group('/app', () => {
  router.addRoute({ path: '/', handler: () => loadApp() });
  router.addRoute({ path: '/settings', handler: () => loadSettings() });
  
  router.group('/user', () => {
    router.addRoute({ path: '/profile', handler: () => loadProfile() });
    router.addRoute({ path: '/preferences', handler: () => loadPreferences() });
  });
});

// Navigation events
router.on('beforeNavigate', (ctx) => {
  if (hasUnsavedChanges()) {
    if (!confirm('You have unsaved changes. Continue?')) {
      return false; // Cancel navigation
    }
  }
});

router.on('afterNavigate', (ctx) => {
  document.title = ctx.title || 'My App';
  updateActiveNavigation(ctx.path);
});

// Error handling
router.addRoute({
  path: '/error',
  handler: (ctx) => {
    const error = ctx.error || new Error('Unknown error');
    showErrorPage(error);
  }
});

router.setFallback('/error');`
  },
  api: {
    basic: `import { get, post, put, del, patch, API } from 'onekit-js';

// Simple requests
get('/api/users').then(response => {
  console.log('Users:', response.data);
});

post('/api/users', { name: 'John' }).then(response => {
  console.log('Created user:', response.data);
});

// Using API class for RESTful endpoints
const api = new API('/api/v1', {
  headers: { 'Authorization': 'Bearer token' }
});

api.get('/users').then(response => console.log(response.data));
api.post('/users', { name: 'Jane' }).then(response => console.log(response.data));`,
    advanced: `import { API, createAPIClient } from 'onekit-js';

// Advanced API client with interceptors
const api = createAPIClient({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  
  // Request interceptor
  onRequest: (config) => {
    // Add auth token
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    
    // Add request ID for tracking
    config.headers['X-Request-ID'] = generateRequestId();
    
    return config;
  },
  
  // Response interceptor
  onResponse: (response) => {
    // Log successful responses
    console.log(\`API Success: \${response.status} \${response.config.url}\`);
    
    // Transform response data
    if (response.data && response.data.items) {
      response.data = {
        ...response.data,
        total: response.data.items.length
      };
    }
    
    return response;
  },
  
  // Error interceptor
  onError: (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      redirectToLogin();
      return Promise.reject(error);
    }
    
    // Retry on network errors
    if (error.code === 'NETWORK_ERROR') {
      return api.request(error.config);
    }
    
    // Show user-friendly error message
    showErrorToast(error.message || 'Request failed');
    
    return Promise.reject(error);
  }
});

// GraphQL client
const graphql = api.graphql({
  endpoint: '/graphql',
  headers: { 'Content-Type': 'application/json' }
});

// GraphQL query
const GET_USERS = \`
  query GetUsers(\$limit: Int, \$offset: Int) {
    users(limit: \$limit, offset: \$offset) {
      id
      name
      email
      avatar
    }
  }
\`;

const { data } = await graphql.query(GET_USERS, { limit: 10, offset: 0 });

// File upload with progress
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progress) => {
      const percent = Math.round((progress.loaded / progress.total) * 100);
      updateUploadProgress(percent);
    }
  });
  
  return response.data;
};

// Request cancellation
const controller = new AbortController();

const fetchUsers = async () => {
  try {
    const response = await api.get('/users', {
      signal: controller.signal
    });
    return response.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was cancelled');
    }
    throw error;
  }
};

// Cancel request if needed
// controller.abort();`
  }
};

export default function AdvancedFeatures() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('components');

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const features = [
    { id: 'components', name: 'Component System', icon: Layers, description: 'Build reusable UI components' },
    { id: 'vdom', name: 'Virtual DOM', icon: Cpu, description: 'Efficient rendering and updates' },
    { id: 'security', name: 'Security', icon: Shield, description: 'XSS protection and validation' },
    { id: 'storage', name: 'Storage', icon: Database, description: 'Persistent data storage' },
    { id: 'router', name: 'Router', icon: Globe, description: 'Client-side routing' },
    { id: 'api', name: 'API Client', icon: Package, description: 'HTTP requests and GraphQL' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Settings className="w-4 h-4 mr-2" />
            Advanced Features
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Advanced OneKit Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore advanced capabilities including components, virtual DOM, security, storage, routing, and API integration
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border bg-white dark:bg-slate-800 p-1 flex-wrap max-w-2xl justify-center">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Button
                  key={feature.id}
                  variant={activeTab === feature.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(feature.id)}
                  className="flex items-center gap-2 text-sm"
                  size="sm"
                >
                  <Icon className="w-4 h-4" />
                  {feature.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Feature Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value={activeTab} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {(() => {
                      const Icon = features.find(f => f.id === activeTab)?.icon || Box;
                      return <Icon className="w-5 h-5" />;
                    })()}
                    {features.find(f => f.id === activeTab)?.name}
                  </CardTitle>
                  <CardDescription>
                    {features.find(f => f.id === activeTab)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="basic">Basic Usage</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced Example</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic">
                      <div className="relative">
                        <Code>{advancedExamples[activeTab as keyof typeof advancedExamples]?.basic || '// Coming soon'}</Code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(
                            advancedExamples[activeTab as keyof typeof advancedExamples]?.basic || '',
                            `${activeTab}-basic`
                          )}
                        >
                          {copiedCode === `${activeTab}-basic` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced">
                      <div className="relative">
                        <Code>{advancedExamples[activeTab as keyof typeof advancedExamples]?.advanced || '// Coming soon'}</Code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(
                            advancedExamples[activeTab as keyof typeof advancedExamples]?.advanced || '',
                            `${activeTab}-advanced`
                          )}
                        >
                          {copiedCode === `${activeTab}-advanced` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Why Choose Advanced Features?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Enterprise-Ready Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Built-in XSS protection, input validation, and secure storage
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">High Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Virtual DOM, efficient rendering, and optimized algorithms
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Data Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced storage with TTL, encryption, and compression
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Full-Stack Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete routing, API client, and state management
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