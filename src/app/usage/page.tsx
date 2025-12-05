'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code } from '@/components/ui/code';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { 
  Copy, 
  Check, 
  Search,
  Book,
  Zap,
  MousePointer,
  Layers,
  Shield,
  Database,
  Router,
  Package,
  ChevronRight,
  Play,
  Code2,
  Rocket,
  Target,
  Puzzle
} from 'lucide-react';

const usageExamples = {
  gettingStarted: {
    title: 'Getting Started',
    description: 'Quick start examples to learn OneKit JS basics',
    icon: Rocket,
    examples: [
      {
        name: 'Basic Setup',
        difficulty: 'Beginner',
        description: 'Install and initialize OneKit JS',
        code: `// Install via npm
npm install onekit-js

// Or use CDN
<script src="https://unpkg.com/onekit-js"></script>

// Import in your project
import { reactive, ok, watch } from 'onekit-js';

// You're ready to go!`,
        tags: ['setup', 'installation', 'cdn']
      },
      {
        name: 'First Reactive App',
        difficulty: 'Beginner',
        description: 'Create your first reactive application',
        code: `// Create reactive state
const app = reactive({
  counter: 0,
  message: 'Hello OneKit!'
});

// Watch for changes
watch(app, 'counter', (newVal) => {
  console.log(\`Counter is now: \${newVal}\`);
});

// Update UI automatically
bind('#counter', app, 'counter');
bind('#message', app, 'message');

// Change state and see magic happen
app.counter = 42;
app.message = 'Reactive updates are awesome!';`,
        tags: ['reactive', 'state', 'binding']
      },
      {
        name: 'DOM Manipulation',
        difficulty: 'Beginner',
        description: 'Learn DOM operations with OneKit',
        code: `// Select elements
const button = ok('#myButton');
const list = ok('#myList');

// Chain operations
button
  .addClass('btn-primary')
  .css('padding', '12px 24px')
  .text('Click me!')
  .on('click', () => {
    // Add new list item
    list.append(\`<li>Item \${list.children().length + 1}</li>\`);
  });

// Animate elements
button.hover(
  () => button.css('transform', 'scale(1.05)'),
  () => button.css('transform', 'scale(1)')
);`,
        tags: ['dom', 'events', 'chaining']
      }
    ]
  },
  stateManagement: {
    title: 'State Management',
    description: 'Advanced reactive state patterns and techniques',
    icon: Database,
    examples: [
      {
        name: 'Todo Application',
        difficulty: 'Intermediate',
        description: 'Build a complete todo app with reactive state',
        code: `// Todo app state
const todoApp = reactive({
  todos: [],
  filter: 'all', // all, active, completed
  newTodo: ''
});

// Computed properties
const filteredTodos = computed(() => {
  switch (todoApp.filter) {
    case 'active':
      return todoApp.todos.filter(todo => !todo.completed);
    case 'completed':
      return todoApp.todos.filter(todo => todo.completed);
    default:
      return todoApp.todos;
  }
});

const todoCount = computed(() => ({
  total: todoApp.todos.length,
  active: todoApp.todos.filter(todo => !todo.completed).length,
  completed: todoApp.todos.filter(todo => todo.completed).length
}));

// Methods
const addTodo = () => {
  if (todoApp.newTodo.trim()) {
    todoApp.todos.push({
      id: Date.now(),
      text: todoApp.newTodo,
      completed: false
    });
    todoApp.newTodo = '';
  }
};

const toggleTodo = (id) => {
  const todo = todoApp.todos.find(t => t.id === id);
  if (todo) todo.completed = !todo.completed;
};

const removeTodo = (id) => {
  todoApp.todos = todoApp.todos.filter(t => t.id !== id);
};

// Watch for changes and update UI
watch(todoApp, 'todos', () => {
  renderTodos();
});

watch(todoApp, 'filter', () => {
  renderTodos();
});`,
        tags: ['reactive', 'computed', 'todo', 'state']
      },
      {
        name: 'Shopping Cart',
        difficulty: 'Intermediate',
        description: 'E-commerce shopping cart with state management',
        code: `// Shopping cart state
const cart = reactive({
  items: [],
  coupon: '',
  discount: 0
});

// Product catalog
const products = reactive([
  { id: 1, name: 'Laptop', price: 999, category: 'electronics' },
  { id: 2, name: 'Book', price: 29, category: 'books' },
  { id: 3, name: 'Headphones', price: 199, category: 'electronics' }
]);

// Computed values
const subtotal = computed(() => 
  cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

const total = computed(() => 
  subtotal.value * (1 - cart.discount / 100)
);

const itemCount = computed(() =>
  cart.items.reduce((sum, item) => sum + item.quantity, 0)
);

// Cart operations
const addToCart = (product, quantity = 1) => {
  const existingItem = cart.items.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ ...product, quantity });
  }
};

const removeFromCart = (productId) => {
  cart.items = cart.items.filter(item => item.id !== productId);
};

const applyCoupon = (code) => {
  const coupons = {
    'SAVE10': 10,
    'SAVE20': 20,
    'WELCOME': 15
  };
  cart.discount = coupons[code] || 0;
};

// Watch cart changes
watch(cart, 'items', () => {
  console.log('Cart updated:', total.value);
  updateCartUI();
});`,
        tags: ['ecommerce', 'cart', 'computed', 'reactive']
      },
      {
        name: 'Form Validation',
        difficulty: 'Intermediate',
        description: 'Reactive form validation system',
        code: `// Form state
const form = reactive({
  fields: {
    email: { value: '', error: '', touched: false },
    password: { value: '', error: '', touched: false },
    confirmPassword: { value: '', error: '', touched: false }
  },
  isValid: false,
  isSubmitting: false
});

// Validation rules
const validators = {
  email: (value) => {
    if (!value) return 'Email is required';
    if (!/\\S+@\\S+\\.\\S+/.test(value)) return 'Invalid email format';
    return '';
  },
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  },
  confirmPassword: (value, allFields) => {
    if (!value) return 'Please confirm your password';
    if (value !== allFields.password.value) return 'Passwords do not match';
    return '';
  }
};

// Validate field
const validateField = (fieldName) => {
  const field = form.fields[fieldName];
  const value = field.value;
  field.error = validators[fieldName](value, form.fields);
  field.touched = true;
};

// Computed form validity
const isFormValid = computed(() => {
  return Object.values(form.fields).every(
    field => field.value && !field.error
  );
});

// Watch field changes
Object.keys(form.fields).forEach(fieldName => {
  watch(form.fields, fieldName, () => {
    validateField(fieldName);
    form.isValid = isFormValid.value;
  });
});

// Submit handler
const submitForm = async () => {
  if (!form.isValid) return;
  
  form.isSubmitting = true;
  try {
    await submitToAPI(form.fields);
    console.log('Form submitted successfully!');
  } catch (error) {
    console.error('Submission failed:', error);
  } finally {
    form.isSubmitting = false;
  }
};`,
        tags: ['forms', 'validation', 'reactive', 'computed']
      }
    ]
  },
  animations: {
    title: 'Animations & Effects',
    description: 'Create smooth animations and visual effects',
    icon: Layers,
    examples: [
      {
        name: 'Loading Animations',
        difficulty: 'Beginner',
        description: 'Create engaging loading animations',
        code: `// Spinner animation
const createSpinner = () => {
  const spinner = ok('<div class="spinner"></div>');
  ok('#loading-container').append(spinner);
  
  spinner.css({
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  });
};

// Pulse loading
const createPulseLoader = () => {
  const dots = ['.dot1', '.dot2', '.dot3'];
  dots.forEach((dot, index) => {
    ok(dot).css({
      width: '12px',
      height: '12px',
      backgroundColor: '#3498db',
      borderRadius: '50%',
      display: 'inline-block',
      margin: '0 4px'
    });
    
    // Animate each dot with delay
    setTimeout(() => {
      ok(dot).pulse(600, 3);
    }, index * 200);
  });
};

// Progress bar animation
const animateProgress = (targetPercent) => {
  const progressBar = ok('#progress-bar');
  const progressText = ok('#progress-text');
  
  progressBar.css('width', '0%');
  progressText.text('0%');
  
  // Animate to target
  progressBar.animate({
    width: targetPercent + '%'
  }, 2000, 'easeOutQuart');
  
  // Update text during animation
  let current = 0;
  const interval = setInterval(() => {
    current += 2;
    if (current >= targetPercent) {
      current = targetPercent;
      clearInterval(interval);
    }
    progressText.text(current + '%');
  }, 40);
};

// Staggered animations
const animateListItems = () => {
  ok('.list-item').each((index, element) => {
    const item = ok(element);
    item.css('opacity', '0').css('transform', 'translateY(20px)');
    
    setTimeout(() => {
      item.animate({
        opacity: 1,
        transform: 'translateY(0)'
      }, 400, 'easeOutQuart');
    }, index * 100);
  });
};`,
        tags: ['loading', 'animations', 'progress', 'stagger']
      },
      {
        name: 'Interactive UI Effects',
        difficulty: 'Intermediate',
        description: 'Create interactive user interface effects',
        code: `// Hover effects with smooth transitions
const setupHoverEffects = () => {
  ok('.card').hover(
    // Enter
    (element) => {
      ok(element).animate({
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }, 300, 'easeOutQuart');
    },
    // Leave
    (element) => {
      ok(element).animate({
        transform: 'translateY(0)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }, 300, 'easeOutQuart');
    }
  );
};

// Button ripple effect
const createRippleEffect = () => {
  ok('.ripple-button').on('click', (e) => {
    const button = ok(e.currentTarget);
    const rect = button[0].getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = ok('<span class="ripple"></span>');
    ripple.css({
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.6)',
      width: '100px',
      height: '100px',
      left: x - 50 + 'px',
      top: y - 50 + 'px',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear'
    });
    
    button.append(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
};

// Smooth scroll navigation
const setupSmoothScroll = () => {
  ok('.nav-link').on('click', (e) => {
    e.preventDefault();
    const targetId = ok(e.currentTarget).attr('href');
    const target = ok(targetId);
    
    if (target.length) {
      const offset = target[0].offsetTop - 80;
      ok('html, body').animate({
        scrollTop: offset
      }, 800, 'easeInOutQuart');
    }
  });
};

// Parallax scrolling effect
const setupParallax = () => {
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = ok('.parallax');
    
    parallaxElements.each((index, element) => {
      const speed = ok(element).data('speed') || 0.5;
      const yPos = -(scrolled * speed);
      ok(element).css('transform', \`translateY(\${yPos}px)\`);
    });
    
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', requestTick);
};

// Morphing shapes
const morphShape = (element, targetShape) => {
  const shapes = {
    circle: 'border-radius: 50%;',
    square: 'border-radius: 0;',
    rounded: 'border-radius: 20px;'
  };
  
  ok(element).animate({
    borderRadius: shapes[targetShape]
  }, 400, 'easeInOutQuart');
};`,
        tags: ['interactive', 'hover', 'parallax', 'morphing']
      }
    ]
  },
  realWorld: {
    title: 'Real-World Applications',
    description: 'Complete examples of real applications',
    icon: Target,
    examples: [
      {
        name: 'Weather Dashboard',
        difficulty: 'Advanced',
        description: 'Build a weather dashboard with API integration',
        code: `// Weather app state
const weatherApp = reactive({
  location: 'New York',
  current: null,
  forecast: [],
  loading: false,
  error: null,
  units: 'metric' // metric, imperial
});

// API service
const weatherAPI = {
  getCurrent: async (location, units) => {
    const response = await fetch(
      \`https://api.openweathermap.org/data/2.5/weather?q=\${location}&units=\${units}&appid=YOUR_API_KEY\`
    );
    return response.json();
  },
  
  getForecast: async (location, units) => {
    const response = await fetch(
      \`https://api.openweathermap.org/data/2.5/forecast?q=\${location}&units=\${units}&appid=YOUR_API_KEY\`
    );
    return response.json();
  }
};

// Load weather data
const loadWeather = async () => {
  weatherApp.loading = true;
  weatherApp.error = null;
  
  try {
    const [current, forecast] = await Promise.all([
      weatherAPI.getCurrent(weatherApp.location, weatherApp.units),
      weatherAPI.getForecast(weatherApp.location, weatherApp.units)
    ]);
    
    weatherApp.current = {
      temp: Math.round(current.main.temp),
      feels: Math.round(current.main.feels_like),
      description: current.weather[0].description,
      icon: current.weather[0].icon,
      humidity: current.main.humidity,
      wind: current.wind.speed,
      pressure: current.main.pressure
    };
    
    weatherApp.forecast = forecast.list.slice(0, 5).map(item => ({
      date: new Date(item.dt * 1000),
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));
    
  } catch (error) {
    weatherApp.error = 'Failed to load weather data';
  } finally {
    weatherApp.loading = false;
  }
};

// Computed properties
const formattedTemp = computed(() => {
  if (!weatherApp.current) return '';
  const unit = weatherApp.units === 'metric' ? '°C' : '°F';
  return \`\${weatherApp.current.temp}\${unit}\`;
});

const weatherBackground = computed(() => {
  if (!weatherApp.current) return 'bg-gradient-to-br from-blue-400 to-blue-600';
  
  const conditions = weatherApp.current.description.toLowerCase();
  if (conditions.includes('clear')) return 'bg-gradient-to-br from-yellow-400 to-orange-500';
  if (conditions.includes('cloud')) return 'bg-gradient-to-br from-gray-400 to-gray-600';
  if (conditions.includes('rain')) return 'bg-gradient-to-br from-gray-600 to-blue-800';
  if (conditions.includes('snow')) return 'bg-gradient-to-br from-blue-100 to-white';
  
  return 'bg-gradient-to-br from-blue-400 to-blue-600';
});

// Watch for changes and update UI
watch(weatherApp, 'location', () => loadWeather());
watch(weatherApp, 'units', () => loadWeather());

// Auto-refresh every 5 minutes
setInterval(loadWeather, 300000);

// Initialize
loadWeather();`,
        tags: ['api', 'weather', 'dashboard', 'async']
      },
      {
        name: 'Chat Application',
        difficulty: 'Advanced',
        description: 'Real-time chat application with WebSocket',
        code: `// Chat application state
const chatApp = reactive({
  messages: [],
  users: [],
  currentUser: null,
  isConnected: false,
  typingUsers: [],
  currentRoom: 'general',
  messageText: ''
});

// WebSocket connection
let socket = null;

const connectWebSocket = () => {
  socket = new WebSocket('wss://your-chat-server.com/ws');
  
  socket.onopen = () => {
    chatApp.isConnected = true;
    console.log('Connected to chat server');
  };
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleServerMessage(data);
  };
  
  socket.onclose = () => {
    chatApp.isConnected = false;
    console.log('Disconnected from chat server');
    // Attempt to reconnect after 3 seconds
    setTimeout(connectWebSocket, 3000);
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    chatApp.isConnected = false;
  }
};

// Handle server messages
const handleServerMessage = (data) => {
  switch (data.type) {
    case 'message':
      chatApp.messages.push({
        id: data.id,
        user: data.user,
        text: data.text,
        timestamp: new Date(data.timestamp)
      });
      break;
      
    case 'userList':
      chatApp.users = data.users;
      break;
      
    case 'typing':
      chatApp.typingUsers = data.users;
      break;
      
    case 'userJoined':
      chatApp.users.push(data.user);
      addSystemMessage(\`\${data.user.name} joined the room\`);
      break;
      
    case 'userLeft':
      chatApp.users = chatApp.users.filter(u => u.id !== data.userId);
      addSystemMessage(\`\${data.userName} left the room\`);
      break;
  }
};

// Send message
const sendMessage = () => {
  if (!chatApp.messageText.trim() || !chatApp.isConnected) return;
  
  const message = {
    type: 'message',
    text: chatApp.messageText,
    room: chatApp.currentRoom,
    timestamp: Date.now()
  };
  
  socket.send(JSON.stringify(message));
  chatApp.messageText = '';
};

// Typing indicator
let typingTimeout;
const handleTyping = () => {
  if (!chatApp.isConnected) return;
  
  // Send typing indicator
  socket.send(JSON.stringify({
    type: 'typing',
    room: chatApp.currentRoom
  }));
  
  // Clear existing timeout
  clearTimeout(typingTimeout);
  
  // Stop typing indicator after 3 seconds
  typingTimeout = setTimeout(() => {
    socket.send(JSON.stringify({
      type: 'stopTyping',
      room: chatApp.currentRoom
    }));
  }, 3000);
};

// Computed properties
const sortedMessages = computed(() => 
  chatApp.messages.sort((a, b) => a.timestamp - b.timestamp)
);

const typingIndicator = computed(() => {
  const count = chatApp.typingUsers.length;
  if (count === 0) return '';
  if (count === 1) return \`\${chatApp.typingUsers[0].name} is typing...\`;
  if (count === 2) return \`\${chatApp.typingUsers[0].name} and \${chatApp.typingUsers[1].name} are typing...\`;
  return \`\${count} people are typing...\`;
});

// UI helpers
const addSystemMessage = (text) => {
  chatApp.messages.push({
    id: Date.now(),
    type: 'system',
    text,
    timestamp: new Date()
  });
};

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);
};

// Auto-scroll to latest message
watch(chatApp, 'messages', () => {
  setTimeout(() => {
    const messagesContainer = ok('#messages-container');
    messagesContainer.animate({
      scrollTop: messagesContainer[0].scrollHeight
    }, 300, 'easeOutQuart');
  }, 100);
});

// Initialize
connectWebSocket();`,
        tags: ['websocket', 'chat', 'realtime', 'messaging']
      }
    ]
  }
};

export default function UsageExamples() {
  const [selectedCategory, setSelectedCategory] = useState('gettingStarted');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const categories = Object.keys(usageExamples).map(key => ({
    id: key,
    ...usageExamples[key]
  }));

  const filteredExamples = usageExamples[selectedCategory]?.examples?.filter(example =>
    example.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    example.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Code2 className="w-4 h-4 mr-2" />
            Usage Examples
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Comprehensive Usage Examples
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn OneKit JS through practical, real-world examples and complete applications.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search examples by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 h-12 text-base"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 px-4 py-2"
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Category Description */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const Icon = usageExamples[selectedCategory]?.icon || Book;
                  return <Icon className="w-5 h-5" />;
                })()}
                {usageExamples[selectedCategory]?.title}
              </CardTitle>
              <CardDescription>
                {usageExamples[selectedCategory]?.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Examples Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6">
            {filteredExamples.map((example, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{example.name}</CardTitle>
                        <Badge className={getDifficultyColor(example.difficulty)}>
                          {example.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {example.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {example.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm font-mono whitespace-pre">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(example.code, index)}
                        className="flex items-center gap-2"
                      >
                        {copiedCode === index ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No examples found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse a different category.
              </p>
            </div>
          </div>
        )}

        {/* Learning Path */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Learning Path
              </CardTitle>
              <CardDescription>
                Follow this recommended path to master OneKit JS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Getting Started</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn the basics with setup, first reactive app, and DOM manipulation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">State Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Master reactive state with todo apps, shopping carts, and form validation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Animations & Effects</h4>
                    <p className="text-sm text-muted-foreground">
                      Create smooth animations and interactive UI effects
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Real-World Applications</h4>
                    <p className="text-sm text-muted-foreground">
                      Build complete applications like weather dashboards and chat apps
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