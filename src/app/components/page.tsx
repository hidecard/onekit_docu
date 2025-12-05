'use client';

import { useState } from 'react';
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code } from '@/components/ui/code';
import { 
  Palette, 
  Box, 
  Type, 
  Layout, 
  MousePointer,
  ToggleLeft,
  CheckCircle,
  Copy,
  Eye,
  Settings,
  Layers,
  Grid,
  List,
  ArrowRight,
  Sparkles,
  Package,
  Zap,
  Shield,
  Heart
} from 'lucide-react';

const componentCategories = [
  {
    id: 'ui-elements',
    name: 'UI Elements',
    icon: Box,
    description: 'Essential UI building blocks',
    components: [
      { name: 'Button', description: 'Interactive button with variants', status: 'available' },
      { name: 'Card', description: 'Container for content grouping', status: 'available' },
      { name: 'Badge', description: 'Small status indicators', status: 'available' },
      { name: 'Tabs', description: 'Tabbed content navigation', status: 'available' },
      { name: 'Accordion', description: 'Collapsible content sections', status: 'available' },
      { name: 'Alert', description: 'Important message displays', status: 'available' }
    ]
  },
  {
    id: 'forms',
    name: 'Form Components',
    icon: MousePointer,
    description: 'Input and form controls',
    components: [
      { name: 'Input', description: 'Text input field', status: 'available' },
      { name: 'Select', description: 'Dropdown selection', status: 'available' },
      { name: 'Checkbox', description: 'Multiple selection', status: 'available' },
      { name: 'Radio', description: 'Single selection', status: 'available' },
      { name: 'Textarea', description: 'Multi-line text input', status: 'available' },
      { name: 'Switch', description: 'Toggle switch control', status: 'available' }
    ]
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: Layout,
    description: 'Navigation and layout components',
    components: [
      { name: 'Header', description: 'Site header with navigation', status: 'available' },
      { name: 'Footer', description: 'Site footer component', status: 'available' },
      { name: 'Breadcrumb', description: 'Navigation path indicator', status: 'available' },
      { name: 'Pagination', description: 'Page navigation controls', status: 'available' },
      { name: 'Sidebar', description: 'Side navigation panel', status: 'available' },
      { name: 'Menu', description: 'Dropdown menu component', status: 'available' }
    ]
  },
  {
    id: 'feedback',
    name: 'Feedback',
    icon: CheckCircle,
    description: 'User feedback and notification components',
    components: [
      { name: 'Toast', description: 'Temporary notification messages', status: 'available' },
      { name: 'Modal', description: 'Dialog overlay', status: 'available' },
      { name: 'Tooltip', description: 'Contextual help text', status: 'available' },
      { name: 'Progress', description: 'Progress indicators', status: 'available' },
      { name: 'Spinner', description: 'Loading animations', status: 'available' },
      { name: 'Skeleton', description: 'Content loading placeholders', status: 'available' }
    ]
  },
  {
    id: 'layout',
    name: 'Layout',
    icon: Grid,
    description: 'Layout and spacing components',
    components: [
      { name: 'Container', description: 'Responsive container', status: 'available' },
      { name: 'Grid', description: 'CSS grid layout', status: 'available' },
      { name: 'Flex', description: 'Flexbox layout', status: 'available' },
      { name: 'Spacer', description: 'Spacing utilities', status: 'available' },
      { name: 'Separator', description: 'Visual dividers', status: 'available' },
      { name: 'Aspect Ratio', description: 'Fixed ratio containers', status: 'available' }
    ]
  },
  {
    id: 'data-display',
    name: 'Data Display',
    icon: List,
    description: 'Data presentation components',
    components: [
      { name: 'Table', description: 'Data tables', status: 'available' },
      { name: 'List', description: 'Item lists', status: 'available' },
      { name: 'Avatar', description: 'User avatars', status: 'available' },
      { name: 'Chip', description: 'Compact data tags', status: 'available' },
      { name: 'Calendar', description: 'Date picker', status: 'available' },
      { name: 'Chart', description: 'Data visualization', status: 'available' }
    ]
  }
];

const codeExamples = {
  button: `import { Button } from '@/components/ui/button';

// Basic button
<Button>Click me</Button>

// Button with variants
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Button with sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>`,

  card: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>`,

  badge: `import { Badge } from '@/components/ui/badge';

// Default badge
<Badge>Default</Badge>

// Badge with variants
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`
};

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState('ui-elements');
  const [copiedCode, setCopiedCode] = useState('');
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'success' | 'error'>('success');

  const copyCode = async (code: string) => {
    try {
      // Always use the fallback method as it's more reliable across environments
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopiedCode(code);
          setCopyStatus('success');
          setShowCopyFeedback(true);
          setTimeout(() => {
            setCopiedCode('');
            setShowCopyFeedback(false);
          }, 2000);
        } else {
          throw new Error('Copy command failed');
        }
      } catch (err) {
        console.error('Failed to copy with fallback method:', err);
        setCopyStatus('error');
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyStatus('error');
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
    }
  };

  const currentCategory = componentCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Palette className="w-4 h-4 mr-2" />
            UI Component Library
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Components
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beautiful, accessible, and responsive components built with Tailwind CSS and Radix UI.
            Ready to use in your Next.js applications.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">Beautiful Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Modern, clean design with smooth animations and transitions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Accessible</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with accessibility in mind, following ARIA guidelines
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Performant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Optimized for performance with minimal bundle size
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-lg">Developer Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Easy to use with TypeScript support and comprehensive docs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Component Categories */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {componentCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {componentCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5" />
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.components.map((component) => (
                      <Card key={component.name} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{component.name}</CardTitle>
                            <Badge variant={component.status === 'available' ? 'default' : 'secondary'}>
                              {component.status}
                            </Badge>
                          </div>
                          <CardDescription>{component.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => {
                                const importStatement = `import { ${component.name} } from '@/components/ui/${component.name.toLowerCase()}';`;
                                copyCode(importStatement);
                              }}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Code Examples */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Quick Start
              </CardTitle>
              <CardDescription>
                Get started with our components in just a few lines of code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="button" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="button">Button</TabsTrigger>
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="badge">Badge</TabsTrigger>
                </TabsList>

                <TabsContent value="button" className="mt-4">
                  <div className="relative">
                    <Code className="block">
                      {codeExamples.button}
                    </Code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(codeExamples.button)}
                    >
                      {copiedCode === codeExamples.button ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="card" className="mt-4">
                  <div className="relative">
                    <Code className="block">
                      {codeExamples.card}
                    </Code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(codeExamples.card)}
                    >
                      {copiedCode === codeExamples.card ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="badge" className="mt-4">
                  <div className="relative">
                    <Code className="block">
                      {codeExamples.badge}
                    </Code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyCode(codeExamples.badge)}
                    >
                      {copiedCode === codeExamples.badge ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Installation */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Installation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Install the components</h4>
                <Code className="block">npm install @radix-ui/react-icons lucide-react class-variance-authority clsx tailwind-merge</Code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Configure Tailwind CSS</h4>
                <Code className="block">{`// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ... rest of config
}`}</Code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Copy Feedback Toast */}
      {showCopyFeedback && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 transition-all duration-300 transform ${
          copyStatus === 'success' 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
        }`}>
          {copyStatus === 'success' ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Failed to copy. Please copy manually.</span>
            </>
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
}