import Link from 'next/link';
import { Github, Twitter, Package, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">OneKit JS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simple DOM utilities and reactive state helpers for modern JavaScript apps.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://github.com/onekit-js/onekit-js" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://twitter.com/onekitjs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://www.npmjs.com/package/onekit-js" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="NPM package"
                >
                  <Package className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/installation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/frameworks" className="text-muted-foreground hover:text-foreground transition-colors">
                  Framework Integration
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/advanced" className="text-muted-foreground hover:text-foreground transition-colors">
                  Reactive State
                </Link>
              </li>
              <li>
                <Link href="/advanced" className="text-muted-foreground hover:text-foreground transition-colors">
                  DOM Utilities
                </Link>
              </li>
              <li>
                <Link href="/advanced" className="text-muted-foreground hover:text-foreground transition-colors">
                  Component System
                </Link>
              </li>
              <li>
                <Link href="/advanced" className="text-muted-foreground hover:text-foreground transition-colors">
                  Security Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/onekit-js/onekit-js/discussions" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/onekit-js/onekit-js/issues" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Report Issues
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/onekit-js/onekit-js/blob/main/CONTRIBUTING.md" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contributing
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/onekit-js/onekit-js/releases" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-muted-foreground">
            © 2024 OneKit JS. Licensed under ISC License.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a 
              href="https://github.com/onekit-js/onekit-js/blob/main/LICENSE" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              License
            </a>
            <a 
              href="https://github.com/onekit-js/onekit-js/blob/main/PRIVACY.md" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy
            </a>
            <a 
              href="https://github.com/onekit-js/onekit-js/blob/main/TERMS.md" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}