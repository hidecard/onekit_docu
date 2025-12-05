'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Code } from '@/components/ui/code';
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { Loading, Skeleton } from '@/components/ui/loading';
import { 
  Zap, 
  Package, 
  Shield, 
  Rocket, 
  CheckCircle, 
  ArrowRight,
  Github,
  Download,
  Star,
  Layers,
  Cpu,
  Lock
} from 'lucide-react';

export default function OneKitLanding() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              Simple DOM utilities and reactive state helpers
            </Badge>
            
            <h1 className="text-4xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              OneKit JS
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Modern JavaScript utilities for reactive state management, 
              DOM manipulation, and component development. Works seamlessly 
              with React, Vue, Svelte, or vanilla JavaScript.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-3">
                <Download className="w-5 h-5 mr-2" />
                npm install onekit-js
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-8" role="group" aria-label="Key statistics">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400" aria-hidden="true">
                  3.0.0
                </div>
                <div className="text-sm text-muted-foreground">
                  Latest Version
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400" aria-hidden="true">
                  60%
                </div>
                <div className="text-sm text-muted-foreground">
                  Smaller Bundle
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400" aria-hidden="true">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">
                  TypeScript
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose OneKit?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for modern development with security, performance, and developer experience in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Reactive State</CardTitle>
                <CardDescription>
                  Simple and powerful reactive state management with automatic DOM updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Code className="text-sm">
{`const state = reactive({ count: 0 });
watch(state, 'count', (val) => updateUI(val));`}
                </Code>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Framework Agnostic</CardTitle>
                <CardDescription>
                  Works seamlessly with React, Vue, Svelte, or vanilla JavaScript projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Code className="text-sm">
{`// React, Vue, Svelte, or Vanilla
import { ok, reactive } from 'onekit-js';`}
                </Code>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Secure by Default</CardTitle>
                <CardDescription>
                  Built-in XSS protection, input validation, and prototype pollution prevention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Code className="text-sm">
{`// Automatic XSS protection
ok('#content').html(safeUserContent);`}
                </Code>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Tree Shaking</CardTitle>
                <CardDescription>
                  Import only what you need for up to 60% smaller bundle sizes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Code className="text-sm">
{`import { reactive, watch } from 'onekit-js';`}
                </Code>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Component System</CardTitle>
                <CardDescription>
                  Simple component system with virtual DOM and template syntax
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Code className="text-sm">
{`register('my-comp', {
  template: '<div>Hello {{name}}</div>'
});`}
                </Code>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle>TypeScript First</CardTitle>
                <CardDescription>
                  Full TypeScript support with comprehensive type definitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Code className="text-sm">
{`// Full type safety out of the box
const state: State = reactive({...});`}
                </Code>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Quick Start</h2>
              <p className="text-xl text-muted-foreground">
                Get up and running in minutes with OneKit JS
              </p>
            </div>

            <Tabs defaultValue="install" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="install">Install</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="vue">Vue</TabsTrigger>
                <TabsTrigger value="vanilla">Vanilla</TabsTrigger>
              </TabsList>

              <TabsContent value="install" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Installation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">npm</h4>
                      <Code className="block">npm install onekit-js</Code>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">yarn</h4>
                      <Code className="block">yarn add onekit-js</Code>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">pnpm</h4>
                      <Code className="block">pnpm add onekit-js</Code>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="react" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>React Integration</CardTitle>
                    <CardDescription>
                      Use OneKit with React hooks for enhanced state management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Code className="block">
{`import { useEffect } from 'react';
import { ok, reactive, watch } from 'onekit-js';

export function App() {
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
      Count: <span id="count">0</span>
      <button id="inc">+</button>
      <button id="dec">-</button>
    </div>
  );
}`}
                    </Code>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vue" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Vue Integration</CardTitle>
                    <CardDescription>
                      Combine OneKit with Vue's reactivity system
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Code className="block">
{`<script setup>
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
    Count: <span id="count">0</span>
    <button id="inc">+</button>
    <button id="dec">-</button>
  </div>
</template>`}
                    </Code>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vanilla" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Vanilla JavaScript</CardTitle>
                    <CardDescription>
                      Use OneKit without any framework
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Code className="block">
{`import { ok, reactive, watch } from 'onekit-js';

const state = reactive({ count: 0 });

watch(state, 'count', (next) => {
  ok('#count').text(String(next));
});

ok('#inc').click(() => state.count++);
ok('#dec').click(() => state.count--);

// HTML
// <div>Count: <span id="count">0</span>
//   <button id="inc">+</button>
//   <button id="dec">-</button>
// </div>`}
                    </Code>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build modern web applications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Reactive State Management</h3>
                  <p className="text-muted-foreground">
                    Create reactive objects that automatically trigger updates when changed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">DOM Utilities</h3>
                  <p className="text-muted-foreground">
                    Chainable DOM manipulation with jQuery-like syntax
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Component System</h3>
                  <p className="text-muted-foreground">
                    Build reusable components with virtual DOM and template syntax
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Security Features</h3>
                  <p className="text-muted-foreground">
                    Built-in XSS protection and input validation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Storage Utilities</h3>
                  <p className="text-muted-foreground">
                    Persistent client-side storage with TTL support
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Router & HTTP Client</h3>
                  <p className="text-muted-foreground">
                    Client-side routing and HTTP request utilities
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-6 text-slate-100">
              <Code className="text-sm">
{`// Reactive state
const state = reactive({ 
  user: { name: 'John' },
  count: 0 
});

// Watch changes
watch(state, 'count', (newVal) => {
  console.log('Count changed:', newVal);
});

// DOM manipulation
ok('#app')
  .html('<h1>Hello OneKit!</h1>')
  .addClass('loaded')
  .fadeIn(300);

// Event handling
ok('#button').click(() => {
  state.count++;
  ok('#counter').text(state.count);
});

// API requests
get('/api/users')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// Storage
localStorage.set('user', state.user);
const cached = localStorage.get('user');`}
              </Code>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers using OneKit JS to build fast, secure, and maintainable web applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Rocket className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-slate-900">
              <Github className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}