'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code } from '@/components/ui/code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { 
  Play, 
  RefreshCw, 
  Copy, 
  Check,
  Zap,
  MousePointer,
  Layers,
  Box,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';

// Simulated OneKit functionality for demo purposes
const useOneKitDemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello OneKit!');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [isVisible, setIsVisible] = useState(true);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  
  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems(prev => [...prev, newItem]);
  };
  
  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const toggleVisibility = () => setIsVisible(prev => !prev);

  return {
    count,
    text,
    items,
    isVisible,
    increment,
    decrement,
    reset,
    addItem,
    removeItem,
    toggleVisibility,
    setText
  };
};

const codeSnippets = {
  reactive: `import { reactive, watch } from 'onekit-js';

// Create reactive state
const state = reactive({ 
  count: 0,
  text: 'Hello OneKit!'
});

// Watch for changes
watch(state, 'count', (newVal, oldVal) => {
  console.log(\`Count changed: \${oldVal} → \${newVal}\`);
});

// Update state
state.count = 5;  // Triggers watcher`,

  dom: `import { ok } from 'onekit-js';

// Element selection and manipulation
ok('#my-element')
  .text('Hello OneKit!')
  .addClass('highlight')
  .css('color', 'blue')
  .fadeIn(300);

// Event handling
ok('#button').click(() => {
  ok('#output').text('Button clicked!');
});

// Multiple elements
ok('.items').each((el) => {
  ok(el).text('Updated');
});`,

  events: `import { ok } from 'onekit-js';

// Click events
ok('#button').click((e) => {
  console.log('Button clicked!', e);
});

// Form events
ok('#input').on('input', (e) => {
  const value = e.target.value;
  ok('#output').text(value);
});

// Keyboard events
ok(document).on('keydown', (e) => {
  if (e.key === 'Enter') {
    console.log('Enter pressed');
  }
});

// Mouse events
ok('#element')
  .on('mouseenter', () => console.log('Mouse entered'))
  .on('mouseleave', () => console.log('Mouse left'));`,

  animation: `import { ok } from 'onekit-js';

// Fade animations
ok('#element').fade_in(500);
ok('#element').fade_out(300);

// Slide animations
ok('#element').slide_down(400);
ok('#element').slide_up(400);

// Special effects
ok('#element').bounce(1000);
ok('#element').shake(500);
ok('#element').pulse(1000, 3);

// Custom animations
ok('#element').animate({
  opacity: 0,
  transform: 'translateX(100px)'
}, 500);`
};

export default function InteractiveExamples() {
  const [activeTab, setActiveTab] = useState('reactive');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const demo = useOneKitDemo();

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Play className="w-4 h-4 mr-2" />
            Interactive Examples
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Try OneKit JS Live
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive demos showcasing OneKit's core features. Try them out and see the code in action!
          </p>
        </div>

        {/* Interactive Examples */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="reactive">Reactive State</TabsTrigger>
            <TabsTrigger value="dom">DOM Utils</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="animation">Animations</TabsTrigger>
          </TabsList>

          {/* Reactive State Example */}
          <TabsContent value="reactive" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Reactive State Demo
                  </CardTitle>
                  <CardDescription>
                    See how reactive state automatically updates when changed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        Count: {demo.count}
                      </div>
                      <div className="text-lg text-slate-600 dark:text-slate-300">
                        {demo.text}
                      </div>
                      <div className="flex justify-center gap-2">
                        <Button onClick={demo.decrement} size="sm" variant="outline" className="touch-manipulation-pan-y">
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button onClick={demo.increment} size="sm" className="touch-manipulation-pan-y">
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button onClick={demo.reset} size="sm" variant="secondary" className="touch-manipulation-pan-y">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="text-input" className="text-sm font-medium">Update Text:</Label>
                    <Input
                      id="text-input"
                      value={demo.text}
                      onChange={(e) => demo.setText(e.target.value)}
                      placeholder="Type something..."
                      className="touch-manipulation-resize-none"
                    />
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>💡 Watch the console in the code example to see how changes trigger watchers automatically.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Code</CardTitle>
                  <CardDescription>
                    OneKit reactive state implementation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeSnippets.reactive}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeSnippets.reactive, 'reactive')}
                    >
                      {copiedCode === 'reactive' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* DOM Utilities Example */}
          <TabsContent value="dom" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="w-5 h-5" />
                    DOM Utilities Demo
                  </CardTitle>
                  <CardDescription>
                    Chainable DOM manipulation with jQuery-like syntax
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Dynamic List</h3>
                      <div className="space-y-2">
                        {demo.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-white dark:bg-slate-700 p-3 rounded touch-manipulation-pan-y">
                            <span>{item}</span>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => demo.removeItem(index)}
                              aria-label={`Remove ${item} from list`}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button onClick={demo.addItem} className="w-full mt-3 touch-manipulation-pan-y">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Item
                      </Button>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Visibility Toggle</h3>
                      <div className={`transition-all duration-300 ${demo.isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="bg-green-100 dark:bg-green-900 p-4 rounded border-2 border-green-300 dark:border-green-700">
                          This element can be toggled!
                        </div>
                      </div>
                      <Button onClick={demo.toggleVisibility} className="w-full mt-3">
                        {demo.isVisible ? 'Hide' : 'Show'} Element
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Code</CardTitle>
                  <CardDescription>
                    OneKit DOM utilities implementation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeSnippets.dom}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeSnippets.dom, 'dom')}
                    >
                      {copiedCode === 'dom' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Example */}
          <TabsContent value="events" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="w-5 h-5" />
                    Event Handling Demo
                  </CardTitle>
                  <CardDescription>
                    Comprehensive event handling with OneKit
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Click Events</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((num) => (
                          <Button
                            key={num}
                            variant="outline"
                            onClick={() => alert(`Button ${num} clicked!`)}
                          >
                            Button {num}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Input Events</h3>
                      <Input
                        placeholder="Type here..."
                        onChange={(e) => {
                          const output = document.getElementById('input-output');
                          if (output) {
                            output.textContent = e.target.value;
                          }
                        }}
                      />
                      <div className="mt-3 p-3 bg-white dark:bg-slate-700 rounded">
                        Output: <span id="input-output" className="font-mono">Nothing yet...</span>
                      </div>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Mouse Events</h3>
                      <div
                        className="h-24 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center cursor-pointer transition-all hover:bg-blue-200 dark:hover:bg-blue-800"
                        onMouseEnter={(e) => {
                          e.currentTarget.classList.add('ring-2', 'ring-blue-500');
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.classList.remove('ring-2', 'ring-blue-500');
                        }}
                      >
                        Hover over me!
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Code</CardTitle>
                  <CardDescription>
                    OneKit event handling implementation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeSnippets.events}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeSnippets.events, 'events')}
                    >
                      {copiedCode === 'events' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Animation Example */}
          <TabsContent value="animation" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Animation Demo
                  </CardTitle>
                  <CardDescription>
                    Built-in animation methods for smooth transitions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Fade Animations</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const el = document.getElementById('fade-box');
                            if (el) {
                              el.style.opacity = '1';
                              el.style.transition = 'opacity 0.5s';
                            }
                          }}
                        >
                          Fade In
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const el = document.getElementById('fade-box');
                            if (el) {
                              el.style.opacity = '0';
                              el.style.transition = 'opacity 0.3s';
                            }
                          }}
                        >
                          Fade Out
                        </Button>
                      </div>
                      <div
                        id="fade-box"
                        className="mt-3 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white font-semibold"
                      >
                        Fade Box
                      </div>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Special Effects</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const el = document.getElementById('effect-box');
                            if (el) {
                              el.style.animation = 'pulse 1s ease-in-out 3';
                              setTimeout(() => {
                                el.style.animation = '';
                              }, 3000);
                            }
                          }}
                        >
                          Pulse
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const el = document.getElementById('effect-box');
                            if (el) {
                              el.style.animation = 'shake 0.5s';
                              setTimeout(() => {
                                el.style.animation = '';
                              }, 500);
                            }
                          }}
                        >
                          Shake
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const el = document.getElementById('effect-box');
                            if (el) {
                              el.style.animation = 'bounce 1s';
                              setTimeout(() => {
                                el.style.animation = '';
                              }, 1000);
                            }
                          }}
                        >
                          Bounce
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            const el = document.getElementById('effect-box');
                            if (el) {
                              el.style.animation = 'flip 0.6s';
                              setTimeout(() => {
                                el.style.animation = '';
                              }, 600);
                            }
                          }}
                        >
                          Flip
                        </Button>
                      </div>
                      <div
                        id="effect-box"
                        className="mt-3 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center text-white font-semibold"
                      >
                        Effect Box
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Code</CardTitle>
                  <CardDescription>
                    OneKit animation implementation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeSnippets.animation}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeSnippets.animation, 'animation')}
                    >
                      {copiedCode === 'animation' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Feature Highlights */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="w-5 h-5" />
                Key Features Demonstrated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Reactive State</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatic updates when state changes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Chainable API</h4>
                    <p className="text-sm text-muted-foreground">
                      jQuery-like method chaining for DOM manipulation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Event System</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive event handling with delegation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Animations</h4>
                    <p className="text-sm text-muted-foreground">
                      Built-in animations and transitions
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