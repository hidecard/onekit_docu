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
  FileText
} from 'lucide-react';

const apiReference = {
  reactive: {
    description: 'Create reactive objects that automatically trigger updates when changed',
    methods: [
      {
        name: 'reactive',
        signature: 'reactive<T>(obj: T): Reactive<T>',
        description: 'Creates a reactive proxy of the given object',
        params: [
          { name: 'obj', type: 'T', description: 'The object to make reactive' }
        ],
        returns: 'Reactive<T> - A reactive proxy of the original object',
        example: `const state = reactive({
  count: 0,
  user: { name: 'John' }
});

state.count = 5; // Triggers reactivity`
      },
      {
        name: 'watch',
        signature: 'watch<T>(obj: Reactive<T>, key: string, callback: Function): void',
        description: 'Watch for changes on a specific property',
        params: [
          { name: 'obj', type: 'Reactive<T>', description: 'The reactive object to watch' },
          { name: 'key', type: 'string', description: 'The property key to watch' },
          { name: 'callback', type: 'Function', description: 'Callback function (newValue, oldValue) => void' }
        ],
        returns: 'void',
        example: `watch(state, 'count', (newVal, oldVal) => {
  console.log(\`Count changed: \${oldVal} → \${newVal}\`);
});`
      },
      {
        name: 'computed',
        signature: 'computed<T>(fn: () => T): Computed<T>',
        description: 'Create a computed property that updates automatically',
        params: [
          { name: 'fn', type: '() => T', description: 'Function that computes the value' }
        ],
        returns: 'Computed<T> - A computed property',
        example: `const doubled = computed(() => state.count * 2);
console.log(doubled.value); // 10`
      },
      {
        name: 'bind',
        signature: 'bind(selector: string, obj: Reactive<T>, key: string, attr?: string): void',
        description: 'Bind a reactive property to a DOM element',
        params: [
          { name: 'selector', type: 'string', description: 'CSS selector for the element' },
          { name: 'obj', type: 'Reactive<T>', description: 'The reactive object' },
          { name: 'key', type: 'string', description: 'The property key to bind' },
          { name: 'attr', type: 'string', description: 'Optional attribute name (default: "textContent")' }
        ],
        returns: 'void',
        example: `bind('#counter', state, 'count');
bind('#name-input', state, 'name', 'value');`
      }
    ]
  },
  dom: {
    description: 'jQuery-like DOM manipulation utilities with chaining support',
    methods: [
      {
        name: 'ok',
        signature: 'ok(selector: string | Element): OneKitCollection',
        description: 'Select DOM elements and return a collection for chaining',
        params: [
          { name: 'selector', type: 'string | Element', description: 'CSS selector or DOM element' }
        ],
        returns: 'OneKitCollection - Collection of selected elements',
        example: `const elements = ok('.my-class');
const single = ok('#my-id');
const element = ok(document.body);`
      },
      {
        name: 'text',
        signature: 'text(content?: string): string | OneKitCollection',
        description: 'Get or set the text content of elements',
        params: [
          { name: 'content', type: 'string', description: 'Optional text content to set' }
        ],
        returns: 'string | OneKitCollection - Text content if getting, collection if setting',
        example: `ok('#title').text('Hello World');
const text = ok('#title').text();`
      },
      {
        name: 'html',
        signature: 'html(content?: string): string | OneKitCollection',
        description: 'Get or set the HTML content of elements (auto-sanitized)',
        params: [
          { name: 'content', type: 'string', description: 'Optional HTML content to set' }
        ],
        returns: 'string | OneKitCollection - HTML content if getting, collection if setting',
        example: `ok('#content').html('<p>Safe content</p>');
const html = ok('#content').html();`
      },
      {
        name: 'addClass',
        signature: 'addClass(className: string): OneKitCollection',
        description: 'Add CSS class to elements',
        params: [
          { name: 'className', type: 'string', description: 'CSS class name to add' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('.item').addClass('active');`
      },
      {
        name: 'removeClass',
        signature: 'removeClass(className?: string): OneKitCollection',
        description: 'Remove CSS class from elements',
        params: [
          { name: 'className', type: 'string', description: 'Optional CSS class name to remove (removes all if not specified)' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('.item').removeClass('active');
ok('.item').removeClass(); // Remove all classes`
      },
      {
        name: 'toggleClass',
        signature: 'toggleClass(className: string): OneKitCollection',
        description: 'Toggle CSS class on elements',
        params: [
          { name: 'className', type: 'string', description: 'CSS class name to toggle' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('.item').toggleClass('active');`
      },
      {
        name: 'css',
        signature: 'css(property: string | object, value?: string): OneKitCollection | string',
        description: 'Get or set CSS styles',
        params: [
          { name: 'property', type: 'string | object', description: 'CSS property name or object of properties' },
          { name: 'value', type: 'string', description: 'CSS value (required if property is string)' }
        ],
        returns: 'OneKitCollection | string - Collection if setting, value if getting',
        example: `ok('#element').css('color', 'red');
ok('#element').css({ color: 'red', fontSize: '16px' });
const color = ok('#element').css('color');`
      },
      {
        name: 'attr',
        signature: 'attr(name: string | object, value?: string): OneKitCollection | string',
        description: 'Get or set element attributes',
        params: [
          { name: 'name', type: 'string | object', description: 'Attribute name or object of attributes' },
          { name: 'value', type: 'string', description: 'Attribute value (required if name is string)' }
        ],
        returns: 'OneKitCollection | string - Collection if setting, value if getting',
        example: `ok('#link').attr('href', 'https://example.com');
ok('#image').attr({ src: 'img.jpg', alt: 'Description' });
const href = ok('#link').attr('href');`
      },
      {
        name: 'click',
        signature: 'click(handler?: Function): OneKitCollection',
        description: 'Bind click event handler or trigger click event',
        params: [
          { name: 'handler', type: 'Function', description: 'Optional click handler function' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#button').click(() => console.log('Clicked'));
ok('#button').click(); // Trigger click`
      },
      {
        name: 'on',
        signature: 'on(event: string, handler: Function): OneKitCollection',
        description: 'Bind event handler to elements',
        params: [
          { name: 'event', type: 'string', description: 'Event name(s) separated by spaces' },
          { name: 'handler', type: 'Function', description: 'Event handler function' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#input').on('input', (e) => console.log(e.target.value));
ok('#element').on('mouseenter mouseleave', (e) => {
  console.log(e.type);
});`
      },
      {
        name: 'each',
        signature: 'each(callback: Function): OneKitCollection',
        description: 'Iterate over each element in the collection',
        params: [
          { name: 'callback', type: 'Function', description: 'Callback function (index, element) => void' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('.items').each((index, element) => {
  console.log(\`Item \${index}:\`, element);
});`
      },
      {
        name: 'append',
        signature: 'append(content: string | Element): OneKitCollection',
        description: 'Append content to elements',
        params: [
          { name: 'content', type: 'string | Element', description: 'Content to append' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#list').append('<li>New item</li>');
ok('#container').append(newElement);`
      },
      {
        name: 'empty',
        signature: 'empty(): OneKitCollection',
        description: 'Remove all child elements from each element',
        params: [],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#container').empty();`
      },
      {
        name: 'remove',
        signature: 'remove(): OneKitCollection',
        description: 'Remove elements from the DOM',
        params: [],
        returns: 'OneKitCollection - Collection of removed elements',
        example: `ok('.temporary').remove();`
      },
      {
        name: 'show',
        signature: 'show(): OneKitCollection',
        description: 'Show elements by removing display:none',
        params: [],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#modal').show();`
      },
      {
        name: 'hide',
        signature: 'hide(): OneKitCollection',
        description: 'Hide elements by setting display:none',
        params: [],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#modal').hide();`
      }
    ]
  },
  animations: {
    description: 'Built-in animation methods for smooth transitions and effects',
    methods: [
      {
        name: 'fade_in',
        signature: 'fade_in(duration?: number): OneKitCollection',
        description: 'Fade elements in',
        params: [
          { name: 'duration', type: 'number', description: 'Animation duration in milliseconds (default: 400)' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#element').fade_in(500);`
      },
      {
        name: 'fade_out',
        signature: 'fade_out(duration?: number): OneKitCollection',
        description: 'Fade elements out',
        params: [
          { name: 'duration', type: 'number', description: 'Animation duration in milliseconds (default: 400)' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#element').fade_out(300);`
      },
      {
        name: 'slide_down',
        signature: 'slide_down(duration?: number): OneKitCollection',
        description: 'Slide elements down (expand height)',
        params: [
          { name: 'duration', type: 'number', description: 'Animation duration in milliseconds (default: 400)' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#dropdown').slide_down(300);`
      },
      {
        name: 'slide_up',
        signature: 'slide_up(duration?: number): OneKitCollection',
        description: 'Slide elements up (collapse height)',
        params: [
          { name: 'duration', type: 'number', description: 'Animation duration in milliseconds (default: 400)' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#dropdown').slide_up(300);`
      },
      {
        name: 'animate',
        signature: 'animate(properties: object, duration?: number, easing?: string): OneKitCollection',
        description: 'Animate CSS properties',
        params: [
          { name: 'properties', type: 'object', description: 'CSS properties to animate' },
          { name: 'duration', type: 'number', description: 'Animation duration in milliseconds (default: 400)' },
          { name: 'easing', type: 'string', description: 'Easing function (default: "swing")' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#element').animate({
  opacity: 0.5,
  transform: 'translateX(100px)'
}, 500, 'ease-in-out');`
      },
      {
        name: 'bounce',
        signature: 'bounce(duration?: number): OneKitCollection',
        description: 'Bounce animation effect',
        params: [
          { name: 'duration', type: 'number', description: 'Animation duration in milliseconds (default: 1000)' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#button').bounce(800);`
      },
      {
        name: 'shake',
        signature: 'shake(duration?: number): OneKitCollection',
        description: 'Shake animation effect',
        params: [
          { name: 'duration', type: 'number', description: 'Animation duration in milliseconds (default: 500)' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#error').shake(600);`
      },
      {
        name: 'pulse',
        signature: 'pulse(duration?: number, times?: number): OneKitCollection',
        description: 'Pulse animation effect',
        params: [
          { name: 'duration', type: 'number', description: 'Animation duration in milliseconds (default: 1000)' },
          { name: 'times', type: 'number', description: 'Number of pulses (default: 3)' }
        ],
        returns: 'OneKitCollection - Collection for chaining',
        example: `ok('#notification').pulse(1500, 5);`
      }
    ]
  },
  storage: {
    description: 'Persistent client-side storage with TTL support and security features',
    methods: [
      {
        name: 'localStorage',
        signature: 'localStorage.set(key: string, value: any): void',
        description: 'Store data in localStorage with automatic serialization',
        params: [
          { name: 'key', type: 'string', description: 'Storage key' },
          { name: 'value', type: 'any', description: 'Value to store (will be JSON serialized)' }
        ],
        returns: 'void',
        example: `localStorage.set('user', { name: 'John', id: 1 });
localStorage.set('preferences', { theme: 'dark' });`
      },
      {
        name: 'localStorage.get',
        signature: 'localStorage.get<T>(key: string): T | null',
        description: 'Retrieve data from localStorage with automatic deserialization',
        params: [
          { name: 'key', type: 'string', description: 'Storage key' }
        ],
        returns: 'T | null - Retrieved value or null if not found',
        example: `const user = localStorage.get('user');
const preferences = localStorage.get('preferences');`
      },
      {
        name: 'localStorage.has',
        signature: 'localStorage.has(key: string): boolean',
        description: 'Check if a key exists in localStorage',
        params: [
          { name: 'key', type: 'string', description: 'Storage key to check' }
        ],
        returns: 'boolean - True if key exists',
        example: `if (localStorage.has('user')) {
  console.log('User data exists');
}`
      },
      {
        name: 'localStorage.remove',
        signature: 'localStorage.remove(key: string): void',
        description: 'Remove a specific key from localStorage',
        params: [
          { name: 'key', type: 'string', description: 'Storage key to remove' }
        ],
        returns: 'void',
        example: `localStorage.remove('user');
localStorage.remove('preferences');`
      },
      {
        name: 'localStorage.clear',
        signature: 'localStorage.clear(): void',
        description: 'Clear all data from localStorage',
        params: [],
        returns: 'void',
        example: `localStorage.clear();`
      },
      {
        name: 'localStorage.keys',
        signature: 'localStorage.keys(): string[]',
        description: 'Get all keys from localStorage',
        params: [],
        returns: 'string[] - Array of all keys',
        example: `const keys = localStorage.keys();
console.log('Stored keys:', keys);`
      },
      {
        name: 'createStorage',
        signature: 'createStorage(storage: Storage, options?: StorageOptions): EnhancedStorage',
        description: 'Create an enhanced storage instance with additional features',
        params: [
          { name: 'storage', type: 'Storage', description: 'Storage object (localStorage or sessionStorage)' },
          { name: 'options', type: 'StorageOptions', description: 'Configuration options' }
        ],
        returns: 'EnhancedStorage - Enhanced storage instance',
        example: `const cache = createStorage(localStorage, {
  prefix: 'myapp_',
  ttl: 10 * 60 * 1000, // 10 minutes
  maxSize: 1024 * 1024  // 1MB
});

cache.set('data', { value: 'expires soon' });`
      }
    ]
  },
  utilities: {
    description: 'Utility functions for common development tasks',
    methods: [
      {
        name: 'debounce',
        signature: 'debounce(func: Function, delay: number): Function',
        description: 'Create a debounced version of a function',
        params: [
          { name: 'func', type: 'Function', description: 'Function to debounce' },
          { name: 'delay', type: 'number', description: 'Delay in milliseconds' }
        ],
        returns: 'Function - Debounced function',
        example: `const debouncedSearch = debounce((query) => {
  console.log('Searching:', query);
}, 300);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});`
      },
      {
        name: 'throttle',
        signature: 'throttle(func: Function, delay: number): Function',
        description: 'Create a throttled version of a function',
        params: [
          { name: 'func', type: 'Function', description: 'Function to throttle' },
          { name: 'delay', type: 'number', description: 'Delay in milliseconds' }
        ],
        returns: 'Function - Throttled function',
        example: `const throttledScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

window.addEventListener('scroll', throttledScroll);`
      },
      {
        name: 'deepClone',
        signature: 'deepClone<T>(obj: T): T',
        description: 'Deep clone an object (prevents prototype pollution)',
        params: [
          { name: 'obj', type: 'T', description: 'Object to clone' }
        ],
        returns: 'T - Deep cloned object',
        example: `const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3; // Doesn't affect original`
      },
      {
        name: 'generateId',
        signature: 'generateId(prefix?: string): string',
        description: 'Generate a unique ID',
        params: [
          { name: 'prefix', type: 'string', description: 'Optional prefix for the ID' }
        ],
        returns: 'string - Unique ID',
        example: `const id1 = generateId(); // "a1b2c3d4"
const id2 = generateId('user_'); // "user_e5f6g7h8"`
      },
      {
        name: 'announce',
        signature: 'announce(message: string, priority?: string): void',
        description: 'Announce message to screen readers',
        params: [
          { name: 'message', type: 'string', description: 'Message to announce' },
          { name: 'priority', type: 'string', description: 'Priority level ("polite" or "assertive", default: "polite")' }
        ],
        returns: 'void',
        example: `announce('Item added to cart', 'polite');
announce('Error: Invalid input', 'assertive');`
      }
    ]
  }
};

export default function APIReference() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('reactive');
  const [searchTerm, setSearchTerm] = useState('');

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const categories = [
    { id: 'reactive', name: 'Reactive State', icon: Zap, description: 'State management and reactivity' },
    { id: 'dom', name: 'DOM Utilities', icon: MousePointer, description: 'DOM manipulation and events' },
    { id: 'animations', name: 'Animations', icon: Layers, description: 'Animation and transitions' },
    { id: 'storage', name: 'Storage', icon: Database, description: 'Data persistence' },
    { id: 'utilities', name: 'Utilities', icon: Package, description: 'Helper functions' }
  ];

  const filteredMethods = apiReference[activeCategory as keyof typeof apiReference]?.methods?.filter(method =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Book className="w-4 h-4 mr-2" />
            API Reference
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            OneKit JS API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete API reference for all OneKit JS modules, methods, and utilities
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search methods, descriptions, or examples..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 h-12 text-base touch-manipulation-resize-none w-full"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-col lg:flex-row justify-center mb-8 gap-2 lg:gap-4">
          <div className="inline-flex flex-wrap justify-center gap-2 mb-4 lg:mb-0">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'ghost'}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors touch-manipulation-pan-y"
                  size="sm"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.shortName || category.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Category Description */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const Icon = categories.find(c => c.id === activeCategory)?.icon || Book;
                  return <Icon className="w-5 h-5" />;
                })()}
                {categories.find(c => c.id === activeCategory)?.name}
              </CardTitle>
              <CardDescription>
                {apiReference[activeCategory as keyof typeof apiReference]?.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Methods List */}
        <div className="max-w-6xl mx-auto space-y-8">
          {filteredMethods.map((method, index) => (
            <Card key={index} id={method.name}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      {method.name}
                    </CardTitle>
                    <Code className="text-sm">{method.signature}</Code>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(method.example, `${activeCategory}-${index}`)}
                  >
                    {copiedCode === `${activeCategory}-${index}` ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Parameters */}
                {method.params && method.params.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Parameters
                    </h4>
                    <div className="space-y-2">
                      {method.params.map((param, paramIndex) => (
                        <div key={paramIndex} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                          <Badge variant="outline" className="font-mono text-xs">
                            {param.name}
                          </Badge>
                          <div className="flex-1">
                            <div className="font-mono text-sm text-blue-600 dark:text-blue-400">
                              {param.type}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {param.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Returns */}
                {method.returns && (
                  <div>
                    <h4 className="font-semibold mb-3">Returns</h4>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                      <div className="font-mono text-sm text-green-600 dark:text-green-400">
                        {method.returns}
                      </div>
                    </div>
                  </div>
                )}

                {/* Example */}
                {method.example && (
                  <div>
                    <h4 className="font-semibold mb-3">Example</h4>
                    <div className="relative">
                      <Code>{method.example}</Code>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Reference */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
              <CardDescription>
                Common usage patterns and best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="patterns" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="patterns">Common Patterns</TabsTrigger>
                  <TabsTrigger value="tips">Best Practices</TabsTrigger>
                  <TabsTrigger value="migration">Migration Tips</TabsTrigger>
                </TabsList>

                <TabsContent value="patterns">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
                      <h4 className="font-semibold mb-2">Reactive State + DOM</h4>
                      <Code className="text-sm">{`const state = reactive({ count: 0 });
watch(state, 'count', (val) => ok('#counter').text(val));
ok('#inc').click(() => state.count++);`}</Code>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
                      <h4 className="font-semibold mb-2">Event Delegation</h4>
                      <Code className="text-sm">{`ok('#container').on('click', '.button', (e) => {
  console.log('Button clicked:', e.target);
});`}</Code>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
                      <h4 className="font-semibold mb-2">Chaining Operations</h4>
                      <Code className="text-sm">{`ok('#element')
  .addClass('active')
  .css('color', 'blue')
  .fade_in(300)
  .click(() => console.log('clicked'));`}</Code>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tips">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold">Use reactive for complex state</h4>
                        <p className="text-sm text-muted-foreground">
                          For simple values, direct DOM manipulation might be more efficient
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold">Cache DOM selections</h4>
                        <p className="text-sm text-muted-foreground">
                          Store frequently accessed elements in variables
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold">Prefer event delegation</h4>
                        <p className="text-sm text-muted-foreground">
                          Use event delegation for dynamic content to improve performance
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="migration">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
                      <h4 className="font-semibold mb-2">From jQuery</h4>
                      <Code className="text-sm">{`// jQuery
$('.element').text('Hello').addClass('active');

// OneKit
ok('.element').text('Hello').addClass('active');`}</Code>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
                      <h4 className="font-semibold mb-2">From Vanilla JS</h4>
                      <Code className="text-sm">{`// Vanilla
document.querySelector('#element').textContent = 'Hello';

// OneKit
ok('#element').text('Hello');`}</Code>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
                      <h4 className="font-semibold mb-2">From React</h4>
                      <Code className="text-sm">{`// React
const [count, setCount] = useState(0);

// OneKit
const state = reactive({ count: 0 });
watch(state, 'count', callback);`}</Code>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}