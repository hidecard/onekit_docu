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
  Copy, 
  Check, 
  Play, 
  RefreshCw,
  Package,
  Download,
  Terminal,
  FileText
} from 'lucide-react';

const codeExamples = {
  installation: {
    npm: 'npm install onekit-js',
    yarn: 'yarn add onekit-js',
    pnpm: 'pnpm add onekit-js',
    cdn: '<script src="https://unpkg.com/onekit-js"></script>'
  },
  basic: {
    reactive: `import { reactive, watch } from 'onekit-js';

// Create reactive state
const state = reactive({ 
  count: 0,
  name: 'OneKit'
});

// Watch for changes
watch(state, 'count', (newVal, oldVal) => {
  console.log(\`Count changed from \${oldVal} to \${newVal}\`);
});

// Update state
state.count = 5; // Triggers watcher`,
    dom: `import { ok } from 'onekit-js';

// Chainable DOM manipulation
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
    combined: `import { ok, reactive, watch } from 'onekit-js';

const state = reactive({ count: 0 });

watch(state, 'count', (value) => {
  ok('#counter').text(value);
});

ok('#increment').click(() => state.count++);
ok('#decrement').click(() => state.count--);`
  },
  frameworks: {
    react: `import { useEffect } from 'react';
import { ok, reactive, watch } from 'onekit-js';

export function Counter() {
  useEffect(() => {
    const state = reactive({ count: 0 });
    
    watch(state, 'count', (next) => {
      ok('#count').text(String(next));
    });
    
    ok('#inc').click(() => state.count++);
    ok('#dec').click(() => state.count--);
  }, []);

  return (
    <div>
      <h2>Count: <span id="count">0</span></h2>
      <button id="inc">+</button>
      <button id="dec">-</button>
    </div>
  );
}`,
    vue: `<script setup>
import { onMounted } from 'vue';
import { ok, reactive, watch } from 'onekit-js';

onMounted(() => {
  const state = reactive({ count: 0 });
  
  watch(state, 'count', (next) => {
    ok('#count').text(String(next));
  });
  
  ok('#inc').click(() => state.count++);
  ok('#dec').click(() => state.count--);
});
</script>

<template>
  <div>
    <h2>Count: <span id="count">0</span></h2>
    <button id="inc">+</button>
    <button id="dec">-</button>
  </div>
</template>`,
    svelte: `<script>
  import { onMount } from 'svelte';
  import { ok, reactive, watch } from 'onekit-js';

  onMount(() => {
    const state = reactive({ count: 0 });
    
    watch(state, 'count', (next) => {
      ok('#count').text(String(next));
    });
    
    ok('#inc').click(() => state.count++);
    ok('#dec').click(() => state.count--);
  });
</script>

<div>
  <h2>Count: <span id="count">0</span></h2>
  <button id="inc">+</button>
  <button id="dec">-</button>
</div>`,
    vanilla: `// main.js
import { ok, reactive, watch } from 'onekit-js';

const state = reactive({ count: 0 });

watch(state, 'count', (value) => {
  ok('#count').text(value);
});

ok('#inc').click(() => state.count++);
ok('#dec').click(() => state.count--);

// index.html
// <div>
//   <h2>Count: <span id="count">0</span></h2>
//   <button id="inc">+</button>
//   <button id="dec">-</button>
// </div>`
  }
};

export default function InstallationGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('installation');

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
            <Package className="w-4 h-4 mr-2" />
            Installation & Setup
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Get Started with OneKit JS
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your preferred installation method and framework to start building with OneKit JS
          </p>
        </div>

        {/* Installation Methods */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="basic">Basic Usage</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="cdn">CDN</TabsTrigger>
          </TabsList>

          {/* Installation Tab */}
          <TabsContent value="installation" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    npm
                  </CardTitle>
                  <CardDescription>Recommended for Node.js projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.installation.npm}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.installation.npm, 'npm')}
                    >
                      {copiedCode === 'npm' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    yarn
                  </CardTitle>
                  <CardDescription>Fast, reliable, and secure dependency management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.installation.yarn}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.installation.yarn, 'yarn')}
                    >
                      {copiedCode === 'yarn' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    pnpm
                  </CardTitle>
                  <CardDescription>Fast, disk space efficient package manager</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.installation.pnpm}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.installation.pnpm, 'pnpm')}
                    >
                      {copiedCode === 'pnpm' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    CDN
                  </CardTitle>
                  <CardDescription>Use directly in HTML without bundlers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.installation.cdn}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.installation.cdn, 'cdn')}
                    >
                      {copiedCode === 'cdn' ? (
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

          {/* Basic Usage Tab */}
          <TabsContent value="basic" className="space-y-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reactive State</CardTitle>
                  <CardDescription>
                    Create reactive objects that automatically trigger updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.basic.reactive}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.basic.reactive, 'reactive')}
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

              <Card>
                <CardHeader>
                  <CardTitle>DOM Utilities</CardTitle>
                  <CardDescription>
                    Chainable DOM manipulation with jQuery-like syntax
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.basic.dom}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.basic.dom, 'dom')}
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

              <Card>
                <CardHeader>
                  <CardTitle>Combined Example</CardTitle>
                  <CardDescription>
                    See how reactive state and DOM utilities work together
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.basic.combined}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.basic.combined, 'combined')}
                    >
                      {copiedCode === 'combined' ? (
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

          {/* Frameworks Tab */}
          <TabsContent value="frameworks" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>React</CardTitle>
                  <CardDescription>Use OneKit with React hooks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.frameworks.react}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.frameworks.react, 'react')}
                    >
                      {copiedCode === 'react' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vue 3</CardTitle>
                  <CardDescription>Integrate with Vue's composition API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.frameworks.vue}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.frameworks.vue, 'vue')}
                    >
                      {copiedCode === 'vue' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Svelte</CardTitle>
                  <CardDescription>Use OneKit in Svelte components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.frameworks.svelte}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.frameworks.svelte, 'svelte')}
                    >
                      {copiedCode === 'svelte' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vanilla JavaScript</CardTitle>
                  <CardDescription>Use OneKit without any framework</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Code>{codeExamples.frameworks.vanilla}</Code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.frameworks.vanilla, 'vanilla')}
                    >
                      {copiedCode === 'vanilla' ? (
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

          {/* CDN Tab */}
          <TabsContent value="cdn" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Using OneKit via CDN</CardTitle>
                <CardDescription>
                  Include OneKit directly in your HTML file without any build tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">ESM Version (Recommended)</h4>
                  <div className="relative">
                    <Code>{`<!DOCTYPE html>
<html>
<head>
  <title>OneKit CDN Example</title>
</head>
<body>
  <div id="app">
    <h1>Hello <span id="name">World</span>!</h1>
    <button id="greet">Greet</button>
  </div>

  <script type="module">
    import { ok, reactive, watch } from 'https://unpkg.com/onekit-js/dist/onekit.esm.js';
    
    const state = reactive({ name: 'World' });
    
    watch(state, 'name', (value) => {
      ok('#name').text(value);
    });
    
    ok('#greet').click(() => {
      state.name = 'OneKit';
    });
  </script>
</body>
</html>`}</Code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">UMD Version (Global Variable)</h4>
                  <div className="relative">
                    <Code>{`<!DOCTYPE html>
<html>
<head>
  <title>OneKit CDN Example</title>
  <script src="https://unpkg.com/onekit-js/dist/onekit.js"></script>
</head>
<body>
  <div id="app">
    <h1>Hello <span id="name">World</span>!</h1>
    <button id="greet">Greet</button>
  </div>

  <script>
    // OneKit is available as a global variable
    const { ok, reactive, watch } = OneKit;
    
    const state = reactive({ name: 'World' });
    
    watch(state, 'name', (value) => {
      ok('#name').text(value);
    });
    
    ok('#greet').click(() => {
      state.name = 'OneKit';
    });
  </script>
</body>
</html>`}</Code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Tips */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">TypeScript Support</h4>
                  <p className="text-sm text-muted-foreground">
                    OneKit includes full TypeScript definitions out of the box. 
                    Just import and start typing with full IntelliSense support.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tree Shaking</h4>
                  <p className="text-sm text-muted-foreground">
                    Import only what you need for smaller bundle sizes. 
                    OneKit supports modern bundlers with tree shaking.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Browser Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Supports all modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Built-in XSS protection and input validation keep your applications secure.
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