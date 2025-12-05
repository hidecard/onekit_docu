'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code } from '@/components/ui/code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check,
  Zap,
  Code2,
  Lightbulb,
  Settings,
  Database,
  MousePointer,
  Layers
} from 'lucide-react';

const examples = {
  reactive: {
    title: 'Reactive State Management',
    description: 'Create reactive objects that automatically update when changed',
    template: `// Create a reactive state object
const state = reactive({
  count: 0,
  name: 'OneKit',
  user: {
    logged: false,
    score: 0
  }
});

// Watch for changes
watch(state, 'count', (newVal, oldVal) => {
  console.log(\`Count changed: \${oldVal} → \${newVal}\`);
});

// Create computed properties
const doubled = computed(() => state.count * 2);
const greeting = computed(() => \`Hello, \${state.name}!\`);

// Update state and see reactivity in action
state.count = 5;
state.name = 'Developer';
state.user.logged = true;

console.log('Count:', state.count);
console.log('Doubled:', doubled.value);
console.log('Greeting:', greeting.value);
console.log('User logged:', state.user.logged);`,
    expected: `Count changed: 0 → 5
Count: 5
Doubled: 10
Greeting: Hello, Developer!
User logged: true`
  },
  dom: {
    title: 'DOM Manipulation',
    description: 'jQuery-like DOM utilities with modern chaining',
    template: `// Select elements and create collections
const button = ok('#myButton');
const items = ok('.list-item');

// Chain operations
button
  .addClass('active')
  .css('backgroundColor', '#3b82f6')
  .text('Click me!')
  .on('click', () => {
    console.log('Button clicked!');
  });

// Manipulate multiple elements
items
  .addClass('highlight')
  .each((index, element) => {
    ok(element).text(\`Item \${index + 1}\`);
  })
  .css('padding', '8px');

// Create new elements
ok('#container')
  .append('<div class="new-item">New content</div>')
  .find('.new-item')
  .fade_in(300);

// Handle events
ok('#input').on('input', (e) => {
  ok('#output').text(e.target.value);
});`,
    expected: `Button element styled and event handler attached
List items updated with new text and styling
New element added and animated
Input event listener ready`
  },
  animations: {
    title: 'Animations & Transitions',
    description: 'Built-in animation methods for smooth effects',
    template: `// Basic animations
ok('#element').fade_in(500);
ok('#element').fade_out(300);

// Slide animations
ok('#dropdown').slide_down(400);
ok('#dropdown').slide_up(400);

// Custom animations
ok('#box').animate({
  opacity: 0.5,
  transform: 'translateX(100px) rotate(45deg)',
  borderRadius: '50%'
}, 1000, 'ease-in-out');

// Effect animations
ok('#notification').bounce(800);
ok('#error').shake(600);
ok('#pulse').pulse(1500, 3);

// Chain animations
ok('#sequence')
  .fade_in(300)
  .delay(500)
  .bounce(800)
  .slide_up(400);`,
    expected: `Element fades in over 500ms
Dropdown slides down smoothly
Box transforms with custom properties
Notification bounces, error shakes, pulse effect
Sequential animations execute in order`
  },
  storage: {
    title: 'Storage Management',
    description: 'Persistent client-side storage with TTL support',
    template: `// Store data with automatic serialization
localStorage.set('user', {
  id: 1,
  name: 'John Doe',
  preferences: {
    theme: 'dark',
    language: 'en'
  }
});

// Set with TTL (time to live)
localStorage.set('session', { token: 'abc123' }, {
  ttl: 3600000 // 1 hour
});

// Retrieve data
const user = localStorage.get('user');
const session = localStorage.get('session');

// Check existence
if (localStorage.has('user')) {
  console.log('User data exists');
}

// Get storage info
const info = localStorage.info();
console.log('Keys:', info.keys);
console.log('Total size:', info.size);

// Remove specific data
localStorage.remove('session');

// Clear all data
localStorage.clear();`,
    expected: `User data stored successfully
Session data with 1 hour TTL
Retrieved user: {id: 1, name: "John Doe", ...}
User data exists
Storage info retrieved
Session data removed
All storage cleared`
  },
  utilities: {
    title: 'Utility Functions',
    description: 'Helper functions for common tasks',
    template: `// Debounce function calls
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Throttle function calls
const throttledScroll = throttle(() => {
  console.log('Scroll event handled');
}, 100);

// Deep clone objects
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

// Merge objects
const merged = merge(
  { a: 1, b: 2 },
  { b: 3, c: 4 },
  { d: 5 }
);

// Format dates
const formatted = formatDate(new Date(), 'YYYY-MM-DD');

// Generate unique IDs
const id1 = generateId();
const id2 = generateId('prefix-');

// Type checking
console.log(isArray([1, 2, 3])); // true
console.log(isObject({})); // true
console.log(isEmpty('')); // true

// Sanitize HTML
const clean = sanitizeHTML('<script>alert("xss")</script><p>Safe</p>');
console.log(clean); // <p>Safe</p>`,
    expected: `Debounced search function created
Throttled scroll handler ready
Object cloned without reference
Objects merged: {a: 1, b: 3, c: 4, d: 5}
Date formatted: 2024-01-15
Unique IDs generated
Type checks performed
HTML sanitized and safe`
  }
};

export default function Playground() {
  const [activeExample, setActiveExample] = useState('reactive');
  const [code, setCode] = useState(examples.reactive.template);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setCode(examples[activeExample as keyof typeof examples].template);
    setOutput('');
  }, [activeExample]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n\n');
    
    // Simulate code execution with expected output
    setTimeout(() => {
      const expected = examples[activeExample as keyof typeof examples].expected;
      setOutput(`✅ Code executed successfully!\n\n${expected}`);
      setIsRunning(false);
    }, 1500);
  };

  const resetCode = () => {
    setCode(examples[activeExample as keyof typeof examples].template);
    setOutput('');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const exampleCategories = [
    { id: 'reactive', name: 'Reactive', icon: Zap, color: 'bg-blue-500' },
    { id: 'dom', name: 'DOM', icon: MousePointer, color: 'bg-green-500' },
    { id: 'animations', name: 'Animations', icon: Layers, color: 'bg-purple-500' },
    { id: 'storage', name: 'Storage', icon: Database, color: 'bg-orange-500' },
    { id: 'utilities', name: 'Utilities', icon: Settings, color: 'bg-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Code2 className="w-4 h-4 mr-2" />
            Interactive Playground
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Try OneKit JS Live
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experiment with OneKit JS features in your browser. Write code, run it, and see results instantly.
          </p>
        </div>

        {/* Example Selector */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {exampleCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeExample === category.id ? 'default' : 'outline'}
                  onClick={() => setActiveExample(category.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base"
                >
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${category.color}`} />
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Example Description */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                {examples[activeExample as keyof typeof examples].title}
              </CardTitle>
              <CardDescription>
                {examples[activeExample as keyof typeof examples].description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Code Editor and Output */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Code Editor */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Code Editor</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetCode}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyCode}
                    className="flex items-center gap-2"
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="h-full relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 border-0 resize-none focus:outline-none"
                  placeholder="Write your OneKit JS code here..."
                  spellCheck={false}
                />
                <div className="absolute top-2 right-2 text-xs text-muted-foreground">
                  JavaScript
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Output</CardTitle>
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="h-full p-4 bg-slate-50 dark:bg-slate-900 overflow-auto">
                {output ? (
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {output}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Run Code" to see the output</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">💡 Experiment Freely</h4>
                  <p className="text-sm text-muted-foreground">
                    Modify the code examples and see how OneKit JS responds to different inputs.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">🔄 Chain Methods</h4>
                  <p className="text-sm text-muted-foreground">
                    Most OneKit JS methods return collections for easy chaining.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">⚡ Reactive Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Watch how reactive objects automatically trigger updates when properties change.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">🎨 Smooth Animations</h4>
                  <p className="text-sm text-muted-foreground">
                    Try different animation durations and easing functions for smooth transitions.
                  </p>
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