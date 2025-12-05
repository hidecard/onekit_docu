'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  X, 
  Code, 
  Zap, 
  Settings, 
  FileText, 
  BookOpen, 
  Github, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';

const navigation = [
  { name: 'Playground', href: '/playground', icon: Code },
  { name: 'Usage', href: '/usage', icon: Zap },
  { name: 'Components', href: '/components', icon: Settings },
  { name: 'Showcase', href: '/showcase', icon: Sparkles },
  { name: 'Documentation', href: '/docs', icon: FileText },
  { name: 'Tutorials', href: '/tutorials', icon: BookOpen },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
      scrolled ? 'shadow-sm' : ''
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center transform transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                AI Code
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Show different items based on screen size */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Show first 4 items on regular desktop */}
            {navigation.slice(0, 4).map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 group"
                >
                  <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Show more items on larger screens */}
            <div className="hidden xl:flex items-center space-x-1">
              {navigation.slice(4).map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 group"
                  >
                    <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle - always visible */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            {/* GitHub link - hidden on mobile, visible on tablet and up */}
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 group"
            >
              <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">GitHub</span>
            </Link>

            {/* CTA Button - hidden on mobile, visible on tablet and up */}
            <Link href="/playground">
              <Button className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform transition-all hover:scale-105">
                <span>Get Started</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="px-3 py-2">
                    <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                    <nav className="flex flex-col space-y-1">
                      {navigation.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 group"
                          >
                            <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="border-t pt-4 px-3">
                    <Link
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 group"
                    >
                      <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>View on GitHub</span>
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Link>
                  </div>

                  <div className="px-3 py-2">
                    <Link href="/playground" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform transition-all hover:scale-105">
                        <span>Get Started</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}