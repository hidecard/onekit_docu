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
  BookOpen,
  Play,
  Copy,
  Check,
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
  Target,
  Zap,
  Code2,
  Rocket,
  GraduationCap,
  Award,
  Users,
  FileText,
  Video,
  Download,
  ExternalLink,
  Lightbulb,
  AlertCircle,
  TrendingUp,
  Star,
  ThumbsUp
} from 'lucide-react';

const tutorials = {
  beginner: {
    title: 'Beginner Tutorials',
    description: 'Start your journey with OneKit JS',
    icon: GraduationCap,
    duration: '30-45 min',
    tutorials: [
      {
        id: 'getting-started',
        title: 'Getting Started with OneKit JS',
        description: 'Learn the basics and set up your first project',
        duration: '10 min',
        difficulty: 'Beginner',
        topics: ['Installation', 'Basic Setup', 'First Reactive App'],
        steps: [
          {
            title: 'Install OneKit JS',
            content: `// Option 1: npm install
npm install onekit-js

// Option 2: CDN
<script src="https://unpkg.com/onekit-js"></script>

// Option 3: Download and include
<script src="onekit.js"></script>`,
            explanation: 'Choose your preferred installation method. NPM is recommended for projects, while CDN is great for quick prototyping.'
          },
          {
            title: 'Create Your First Reactive App',
            content: `// Import OneKit JS
import { reactive, ok, watch } from 'onekit-js';

// Create reactive state
const app = reactive({
  message: 'Hello, OneKit!',
  count: 0
});

// Watch for changes
watch(app, 'count', (newVal) => {
  console.log(\`Count is now: \${newVal}\`);
});

// Update state
app.count = 42;
app.message = 'Reactive updates are awesome!';`,
            explanation: 'Reactive objects automatically trigger updates when their properties change.'
          },
          {
            title: 'DOM Manipulation',
            content: `// Select elements
const button = ok('#myButton');
const list = ok('#myList');

// Chain operations
button
  .addClass('btn-primary')
  .text('Click me!')
  .on('click', () => {
    list.append('<li>New item!</li>');
  });

// Animate elements
button.hover(
  () => button.css('transform', 'scale(1.1)'),
  () => button.css('transform', 'scale(1)')
);`,
            explanation: 'OneKit JS provides jQuery-like DOM manipulation with modern chaining support.'
          }
        ],
        nextTutorial: 'reactive-basics'
      },
      {
        id: 'reactive-basics',
        title: 'Understanding Reactivity',
        description: 'Deep dive into reactive state management',
        duration: '15 min',
        difficulty: 'Beginner',
        topics: ['Reactive Objects', 'Computed Properties', 'Watchers'],
        steps: [
          {
            title: 'Creating Reactive Objects',
            content: `// Simple reactive object
const user = reactive({
  name: 'John',
  age: 25,
  email: 'john@example.com'
});

// Nested reactive objects
const app = reactive({
  user: {
    profile: {
      name: 'John',
      avatar: 'avatar.jpg'
    },
    settings: {
      theme: 'dark',
      notifications: true
    }
  }
});

// Arrays are also reactive
const todos = reactive([
  { id: 1, text: 'Learn OneKit', completed: false },
  { id: 2, text: 'Build amazing apps', completed: false }
]);`,
            explanation: 'Reactive objects track changes and automatically update dependent computations.'
          },
          {
            title: 'Computed Properties',
            content: `// Create computed properties
const user = reactive({
  firstName: 'John',
  lastName: 'Doe',
  age: 25
});

const fullName = computed(() => 
  \`\${user.firstName} \${user.lastName}\`
);

const isAdult = computed(() => 
  user.age >= 18
);

const greeting = computed(() => 
  \`Hello, \${fullName.value}! You are \${user.age} years old.\`
);

// Access computed values
console.log(fullName.value); // "John Doe"
console.log(isAdult.value); // true
console.log(greeting.value); // "Hello, John Doe! You are 25 years old."`,
            explanation: 'Computed properties automatically update when their dependencies change.'
          },
          {
            title: 'Watching Changes',
            content: `// Watch specific properties
const user = reactive({ name: 'John', age: 25 });

watch(user, 'name', (newVal, oldVal) => {
  console.log(\`Name changed from \${oldVal} to \${newVal}\`);
});

// Watch multiple properties
watch(user, ['name', 'age'], (prop, newVal, oldVal) => {
  console.log(\`\${prop} changed from \${oldVal} to \${newVal}\`);
});

// Watch with immediate execution
watch(user, 'name', (newVal) => {
  console.log(\`Current name: \${newVal}\`);
}, { immediate: true });

// Deep watching
const app = reactive({
  user: { profile: { name: 'John' } }
});

watch(app, 'user.profile.name', (newVal) => {
  console.log(\`Profile name changed: \${newVal}\`);
});`,
            explanation: 'Watchers allow you to react to state changes with custom logic.'
          }
        ],
        nextTutorial: 'dom-manipulation'
      }
    ]
  },
  intermediate: {
    title: 'Intermediate Tutorials',
    description: 'Build more complex applications',
    icon: Target,
    duration: '45-60 min',
    tutorials: [
      {
        id: 'todo-app',
        title: 'Build a Todo Application',
        description: 'Create a complete todo app with state management',
        duration: '20 min',
        difficulty: 'Intermediate',
        topics: ['State Management', 'Event Handling', 'Local Storage'],
        steps: [
          {
            title: 'Setup Todo State',
            content: `// Todo app state
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
}));`,
            explanation: 'Set up reactive state and computed properties for the todo application.'
          },
          {
            title: 'Todo Operations',
            content: `// Add todo
const addTodo = () => {
  if (todoApp.newTodo.trim()) {
    todoApp.todos.push({
      id: Date.now(),
      text: todoApp.newTodo,
      completed: false,
      createdAt: new Date()
    });
    todoApp.newTodo = '';
  }
};

// Toggle todo
const toggleTodo = (id) => {
  const todo = todoApp.todos.find(t => t.id === id);
  if (todo) todo.completed = !todo.completed;
};

// Remove todo
const removeTodo = (id) => {
  todoApp.todos = todoApp.todos.filter(t => t.id !== id);
};

// Clear completed
const clearCompleted = () => {
  todoApp.todos = todoApp.todos.filter(t => !t.completed);
};`,
            explanation: 'Implement CRUD operations for todos with reactive updates.'
          },
          {
            title: 'UI Binding and Events',
            content: `// Bind to DOM elements
bind('#new-todo-input', todoApp, 'newTodo', 'value');
bind('#todo-count', todoCount, 'active', 'textContent');

// Event handlers
ok('#add-todo-btn').on('click', addTodo);
ok('#new-todo-input').on('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Filter buttons
ok('.filter-btn').on('click', function() {
  const filter = ok(this).data('filter');
  todoApp.filter = filter;
  
  // Update active state
  ok('.filter-btn').removeClass('active');
  ok(this).addClass('active');
});

// Auto-save to localStorage
watch(todoApp, 'todos', () => {
  localStorage.set('todos', todoApp.todos);
});

// Load from localStorage
todoApp.todos = localStorage.get('todos') || [];`,
            explanation: 'Connect the reactive state to the UI and add persistence.'
          }
        ],
        nextTutorial: 'form-validation'
      }
    ]
  },
  advanced: {
    title: 'Advanced Tutorials',
    description: 'Master advanced OneKit JS features',
    icon: Award,
    duration: '60-90 min',
    tutorials: [
      {
        id: 'real-time-chat',
        title: 'Real-time Chat Application',
        description: 'Build a chat app with WebSocket integration',
        duration: '30 min',
        difficulty: 'Advanced',
        topics: ['WebSocket', 'Real-time Updates', 'Advanced State'],
        steps: [
          {
            title: 'Chat State Management',
            content: `// Chat application state
const chatApp = reactive({
  messages: [],
  users: [],
  currentUser: null,
  isConnected: false,
  typingUsers: [],
  currentRoom: 'general',
  messageText: '',
  rooms: ['general', 'random', 'tech', 'help']
});

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

const unreadCount = computed(() => 
  chatApp.messages.filter(m => !m.read && m.user.id !== chatApp.currentUser?.id).length
);`,
            explanation: 'Set up comprehensive state management for the chat application.'
          },
          {
            title: 'WebSocket Integration',
            content: `// WebSocket connection
let socket = null;

const connectWebSocket = () => {
  socket = new WebSocket('wss://your-chat-server.com/ws');
  
  socket.onopen = () => {
    chatApp.isConnected = true;
    console.log('Connected to chat server');
    
    // Join room
    socket.send(JSON.stringify({
      type: 'join',
      room: chatApp.currentRoom,
      user: chatApp.currentUser
    }));
  };
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleServerMessage(data);
  };
  
  socket.onclose = () => {
    chatApp.isConnected = false;
    console.log('Disconnected from chat server');
    
    // Auto-reconnect after 3 seconds
    setTimeout(connectWebSocket, 3000);
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    chatApp.isConnected = false;
  };
};

// Handle server messages
const handleServerMessage = (data) => {
  switch (data.type) {
    case 'message':
      chatApp.messages.push({
        id: data.id,
        user: data.user,
        text: data.text,
        timestamp: new Date(data.timestamp),
        read: false
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
};`,
            explanation: 'Implement WebSocket connection for real-time communication.'
          },
          {
            title: 'Message Handling and UI',
            content: `// Send message
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
  
  socket.send(JSON.stringify({
    type: 'typing',
    room: chatApp.currentRoom
  }));
  
  clearTimeout(typingTimeout);
  
  typingTimeout = setTimeout(() => {
    socket.send(JSON.stringify({
      type: 'stopTyping',
      room: chatApp.currentRoom
    }));
  }, 3000);
};

// UI bindings
bind('#message-input', chatApp, 'messageText', 'value');
bind('#typing-indicator', typingIndicator, 'value', 'textContent');
bind('#unread-count', unreadCount, 'value', 'textContent');

// Event handlers
ok('#send-btn').on('click', sendMessage);
ok('#message-input').on('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
  else handleTyping();
});

// Auto-scroll to latest message
watch(chatApp, 'messages', () => {
  setTimeout(() => {
    const messagesContainer = ok('#messages-container');
    messagesContainer.animate({
      scrollTop: messagesContainer[0].scrollHeight
    }, 300, 'easeOutQuart');
  }, 100);
});

// Mark messages as read when visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const messageId = ok(entry.target).data('message-id');
      const message = chatApp.messages.find(m => m.id === messageId);
      if (message) message.read = true;
    }
  });
});

ok('.message').each(function() {
  observer.observe(this);
});`,
            explanation: 'Connect the real-time functionality to the user interface.'
          }
        ],
        nextTutorial: null
      }
    ]
  }
};

export default function GettingStarted() {
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
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

  const levels = Object.keys(tutorials).map(key => ({
    id: key,
    ...tutorials[key]
  }));

  const currentTutorials = tutorials[selectedLevel]?.tutorials || [];

  const startTutorial = (tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < selectedTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getProgress = () => {
    if (!selectedTutorial) return 0;
    return ((currentStep + 1) / selectedTutorial.steps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Getting Started
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Learn OneKit JS Step by Step
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive tutorials to master OneKit JS from basics to advanced concepts.
          </p>
        </div>

        {!selectedTutorial ? (
          <>
            {/* Level Selection */}
            <div className="flex flex-wrap justify-center mb-8 gap-3">
              {levels.map((level) => {
                const Icon = level.icon;
                return (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel(level.id)}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">{level.title}</div>
                      <div className="text-xs opacity-75">{level.duration}</div>
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Level Description */}
            <div className="max-w-4xl mx-auto mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {(() => {
                      const Icon = tutorials[selectedLevel]?.icon || BookOpen;
                      return <Icon className="w-5 h-5" />;
                    })()}
                    {tutorials[selectedLevel]?.title}
                  </CardTitle>
                  <CardDescription>
                    {tutorials[selectedLevel]?.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Tutorials Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-6">
                {currentTutorials.map((tutorial, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startTutorial(tutorial)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                            <Badge className={getDifficultyColor(tutorial.difficulty)}>
                              {tutorial.difficulty}
                            </Badge>
                          </div>
                          <CardDescription className="text-base mb-3">
                            {tutorial.description}
                          </CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {tutorial.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {tutorial.steps.length} steps
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {tutorial.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="ml-4">
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Learning Path */}
            <div className="max-w-4xl mx-auto mt-16">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Recommended Learning Path
                  </CardTitle>
                  <CardDescription>
                    Follow this path to become a OneKit JS expert
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold">Beginner: Getting Started</h4>
                        <p className="text-sm text-muted-foreground">
                          Learn the basics of OneKit JS, reactive state, and DOM manipulation
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                      <Circle className="w-6 h-6 text-yellow-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold">Intermediate: Building Applications</h4>
                        <p className="text-sm text-muted-foreground">
                          Create complete applications with advanced state management
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-red-50 dark:bg-red-950/20">
                      <Circle className="w-6 h-6 text-red-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold">Advanced: Real-world Projects</h4>
                        <p className="text-sm text-muted-foreground">
                          Master advanced concepts with real-time applications
                        </p>
                      </div>
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          /* Tutorial View */
          <div className="max-w-5xl mx-auto">
            {/* Tutorial Header */}
            <div className="mb-8">
              <Button 
                variant="outline" 
                onClick={() => setSelectedTutorial(null)}
                className="mb-4"
              >
                ← Back to tutorials
              </Button>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedTutorial.title}</h2>
                  <p className="text-muted-foreground">{selectedTutorial.description}</p>
                </div>
                <Badge className={getDifficultyColor(selectedTutorial.difficulty)}>
                  {selectedTutorial.difficulty}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {selectedTutorial.steps.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {selectedTutorial.steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentStep 
                          ? 'bg-blue-500' 
                          : index < currentStep 
                            ? 'bg-green-500' 
                            : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <Button 
                  onClick={nextStep}
                  disabled={currentStep === selectedTutorial.steps.length - 1}
                >
                  {currentStep === selectedTutorial.steps.length - 1 ? 'Complete' : 'Next'}
                </Button>
              </div>
            </div>

            {/* Current Step */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {currentStep + 1}
                    </div>
                    {selectedTutorial.steps[currentStep].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Explanation */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{selectedTutorial.steps[currentStep].explanation}</p>
                      </div>
                    </div>

                    {/* Code */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Code Example</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(selectedTutorial.steps[currentStep].content, `step-${currentStep}`)}
                          className="flex items-center gap-2"
                        >
                          {copiedCode === `step-${currentStep}` ? (
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
                      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono whitespace-pre">
                          <code>{selectedTutorial.steps[currentStep].content}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Pro Tip</h4>
                          <p className="text-sm">
                            Try running this code in your browser console to see how it works!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Completion */}
              {currentStep === selectedTutorial.steps.length - 1 && (
                <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <CheckCircle className="w-6 h-6" />
                      Tutorial Complete!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-green-800 dark:text-green-200">
                        Congratulations! You've completed the "{selectedTutorial.title}" tutorial.
                      </p>
                      
                      <div className="flex gap-3">
                        <Button onClick={() => setSelectedTutorial(null)}>
                          Back to Tutorials
                        </Button>
                        
                        {selectedTutorial.nextTutorial && (
                          <Button variant="outline">
                            Next Tutorial
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}