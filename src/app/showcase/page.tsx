'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code } from '@/components/ui/code';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { 
  Play, 
  Copy, 
  Check,
  Eye,
  Code2,
  Zap,
  MousePointer,
  Layers,
  Database,
  Settings,
  Palette,
  Shield,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Clock,
  Star,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Filter,
  Grid,
  List,
  ArrowUpDown,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  ExternalLink
} from 'lucide-react';

const components = {
  buttons: {
    title: 'Button Components',
    description: 'Interactive button variations and states',
    components: [
      {
        name: 'Button Variants',
        description: 'Different button styles and variants',
        demo: 'ButtonVariants',
        code: `// Primary button
ok('#primary-btn').on('click', () => {
  ok(this).addClass('clicked').bounce(300);
});

// Loading state
ok('#loading-btn').on('click', function() {
  const btn = ok(this);
  btn.text('Loading...').addClass('loading');
  
  setTimeout(() => {
    btn.text('Submit').removeClass('loading');
  }, 2000);
});

// Icon button
ok('#icon-btn').hover(
  () => ok(this).css('transform', 'scale(1.1)'),
  () => ok(this).css('transform', 'scale(1)')
});

// Dropdown button
ok('#dropdown-btn').on('click', function() {
  const menu = ok('#dropdown-menu');
  menu.slide_down(200);
  
  // Close on outside click
  ok(document).on('click', function(e) {
    if (!ok(e.target).closest('#dropdown-btn, #dropdown-menu').length) {
      menu.slide_up(200);
    }
  });
});`,
        live: true
      },
      {
        name: 'Button Groups',
        description: 'Grouped button controls',
        demo: 'ButtonGroups',
        code: `// Button group toggle
ok('.btn-group button').on('click', function() {
  const group = ok(this).parent();
  group.find('button').removeClass('active');
  ok(this).addClass('active');
});

// Segmented control
ok('.segmented-control button').on('click', function() {
  const index = ok(this).index();
  const indicator = ok('.segmented-indicator');
  
  indicator.animate({
    left: (index * 100) + '%'
  }, 200, 'easeOutQuart');
});

// Button counter
let count = 0;
ok('#increment').on('click', () => {
  count++;
  ok('#counter').text(count).pulse(300);
});

ok('#decrement').on('click', () => {
  if (count > 0) {
    count--;
    ok('#counter').text(count).shake(300);
  }
});`,
        live: true
      }
    ]
  },
  forms: {
    title: 'Form Components',
    description: 'Input fields, validation, and form controls',
    components: [
      {
        name: 'Input Fields',
        description: 'Various input types and states',
        demo: 'InputFields',
        code: `// Floating label effect
ok('.floating-input').on('focus', function() {
  ok(this).parent().addClass('focused');
}).on('blur', function() {
  if (!ok(this).val()) {
    ok(this).parent().removeClass('focused');
  }
});

// Input validation
ok('#email-input').on('input', function() {
  const email = ok(this).val();
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  
  if (email && isValid) {
    ok(this).addClass('valid').removeClass('invalid');
  } else if (email) {
    ok(this).addClass('invalid').removeClass('valid');
  } else {
    ok(this).removeClass('valid invalid');
  }
});

// Password strength indicator
ok('#password-input').on('input', function() {
  const password = ok(this).val();
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;
  
  const indicator = ok('#strength-indicator');
  indicator.css('width', (strength * 25) + '%');
  
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  indicator.removeClass(colors.join(' ')).addClass(colors[strength - 1] || '');
});`,
        live: true
      },
      {
        name: 'Search Components',
        description: 'Search bars with autocomplete',
        demo: 'SearchComponents',
        code: `// Search with autocomplete
const searchData = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango', 'Pineapple'];

ok('#search-input').on('input', function() {
  const query = ok(this).val().toLowerCase();
  const results = searchData.filter(item => 
    item.toLowerCase().includes(query)
  );
  
  const dropdown = ok('#search-results');
  dropdown.empty();
  
  if (query && results.length > 0) {
    results.forEach(item => {
      dropdown.append(\`
        <div class="search-result">
          <strong>\${item}</strong>
        </div>
      \`);
    });
    dropdown.slide_down(200);
  } else {
    dropdown.slide_up(200);
  }
});

// Keyboard navigation
ok('#search-input').on('keydown', function(e) {
  const results = ok('.search-result');
  const active = ok('.search-result.active');
  let index = active.index();
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    active.removeClass('active');
    ok(results[index + 1] || results[0]).addClass('active');
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    active.removeClass('active');
    ok(results[index - 1] || results[results.length - 1]).addClass('active');
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (active.length) {
      ok(this).val(active.text());
      ok('#search-results').slide_up(200);
    }
  }
});`,
        live: true
      }
    ]
  },
  cards: {
    title: 'Card Components',
    description: 'Content cards with various layouts',
    components: [
      {
        name: 'Product Cards',
        description: 'E-commerce product cards with actions',
        demo: 'ProductCards',
        code: `// Product card interactions
ok('.product-card').hover(
  function() {
    ok(this).find('.product-overlay').fade_in(200);
    ok(this).addClass('hovered');
  },
  function() {
    ok(this).find('.product-overlay').fade_out(200);
    ok(this).removeClass('hovered');
  }
);

// Add to wishlist
ok('.wishlist-btn').on('click', function(e) {
  e.stopPropagation();
  const icon = ok(this).find('svg');
  
  if (icon.hasClass('text-red-500')) {
    icon.removeClass('text-red-500').addClass('text-gray-400');
    ok(this).attr('aria-label', 'Add to wishlist');
  } else {
    icon.addClass('text-red-500').removeClass('text-gray-400');
    ok(this).attr('aria-label', 'Remove from wishlist');
    icon.heart_beat(600);
  }
});

// Quick view modal
ok('.quick-view-btn').on('click', function() {
  const productId = ok(this).data('product-id');
  const modal = ok('#quick-view-modal');
  
  // Load product data (simulated)
  modal.find('.modal-title').text('Product ' + productId);
  modal.find('.modal-content').html('<p>Loading product details...</p>');
  
  modal.fade_in(300);
  ok('body').css('overflow', 'hidden');
});

// Close modal
ok('.modal-close, .modal-overlay').on('click', function() {
  ok('#quick-view-modal').fade_out(300);
  ok('body').css('overflow', 'auto');
});`,
        live: true
      },
      {
        name: 'Profile Cards',
        description: 'User profile cards with stats',
        demo: 'ProfileCards',
        code: `// Profile card stats animation
ok('.profile-card').each(function() {
  const card = ok(this);
  const stats = card.find('.stat-number');
  
  // Animate numbers on scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(ok(entry.target).data('target'));
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          ok(entry.target).text(Math.floor(current));
        }, 30);
        
        observer.unobserve(entry.target);
      }
    });
  });
  
  stats.each(function() {
    observer.observe(this);
  });
});

// Follow button
ok('.follow-btn').on('click', function() {
  const btn = ok(this);
  const isFollowing = btn.hasClass('following');
  
  if (isFollowing) {
    btn.removeClass('following bg-red-500 text-white')
       .addClass('bg-blue-500 text-white')
       .text('Follow');
  } else {
    btn.addClass('following bg-red-500 text-white')
       .removeClass('bg-blue-500 text-white')
       .text('Following');
  }
  
  btn.bounce(400);
});`,
        live: true
      }
    ]
  },
  navigation: {
    title: 'Navigation Components',
    description: 'Menus, breadcrumbs, and navigation elements',
    components: [
      {
        name: 'Navigation Menus',
        description: 'Responsive navigation with dropdowns',
        demo: 'NavigationMenus',
        code: `// Mobile menu toggle
ok('#mobile-menu-toggle').on('click', function() {
  const menu = ok('#mobile-menu');
  const isOpen = menu.hasClass('open');
  
  if (isOpen) {
    menu.slide_up(300).removeClass('open');
    ok(this).attr('aria-expanded', 'false');
  } else {
    menu.slide_down(300).addClass('open');
    ok(this).attr('aria-expanded', 'true');
  }
});

// Dropdown navigation
ok('.nav-dropdown').hover(
  function() {
    const dropdown = ok(this).find('.dropdown-menu');
    dropdown.stop().fade_in(200);
    ok(this).addClass('active');
  },
  function() {
    const dropdown = ok(this).find('.dropdown-menu');
    dropdown.stop().fade_out(200);
    ok(this).removeClass('active');
  }
);

// Active state management
ok('.nav-link').on('click', function() {
  ok('.nav-link').removeClass('active');
  ok(this).addClass('active');
});

// Breadcrumb navigation
ok('.breadcrumb a').on('click', function(e) {
  e.preventDefault();
  const href = ok(this).attr('href');
  
  // Add loading state
  ok(this).addClass('loading');
  
  // Simulate navigation
  setTimeout(() => {
    ok(this).removeClass('loading');
    console.log('Navigate to:', href);
  }, 500);
});`,
        live: true
      },
      {
        name: 'Tabs and Pills',
        description: 'Tab navigation and pill menus',
        demo: 'TabsAndPills',
        code: `// Tab switching
ok('.tab-button').on('click', function() {
  const tabId = ok(this).data('tab');
  const tabContainer = ok(this).parent();
  
  // Update active states
  tabContainer.find('.tab-button').removeClass('active');
  ok(this).addClass('active');
  
  // Show corresponding content
  ok('.tab-content').removeClass('active');
  ok(\`#\${tabId}\`).addClass('active').fade_in(300);
  
  // Animate indicator
  const indicator = tabContainer.find('.tab-indicator');
  const offset = ok(this).position().left;
  const width = ok(this).outerWidth();
  
  indicator.animate({
    left: offset,
    width: width
  }, 200, 'easeOutQuart');
});

// Pill navigation
ok('.pill').on('click', function() {
  const pill = ok(this);
  const isActive = pill.hasClass('active');
  
  if (isActive) {
    pill.removeClass('active');
  } else {
    pill.addClass('active');
  }
  
  // Update selected count
  const activeCount = ok('.pill.active').length;
  ok('#selected-count').text(activeCount);
});`,
        live: true
      }
    ]
  },
  feedback: {
    title: 'Feedback Components',
    description: 'Notifications, alerts, and feedback elements',
    components: [
      {
        name: 'Notifications',
        description: 'Toast notifications and alerts',
        demo: 'Notifications',
        code: `// Show notification
const showNotification = (message, type = 'info') => {
  const notification = ok(\`
    <div class="notification notification-\${type}">
      <div class="notification-content">
        <span class="notification-message">\${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    </div>
  \`);
  
  ok('#notification-container').append(notification);
  
  // Animate in
  notification.css({
    transform: 'translateX(100%)',
    opacity: 0
  }).animate({
    transform: 'translateX(0)',
    opacity: 1
  }, 300, 'easeOutQuart');
  
  // Auto dismiss after 5 seconds
  setTimeout(() => {
    notification.animate({
      transform: 'translateX(100%)',
      opacity: 0
    }, 300, 'easeInQuart', () => {
      notification.remove();
    });
  }, 5000);
  
  // Close button
  notification.find('.notification-close').on('click', function() {
    notification.animate({
      transform: 'translateX(100%)',
      opacity: 0
    }, 300, 'easeInQuart', () => {
      notification.remove();
    });
  });
};

// Trigger notifications
ok('#success-btn').on('click', () => {
  showNotification('Operation completed successfully!', 'success');
});

ok('#error-btn').on('click', () => {
  showNotification('Something went wrong!', 'error');
});

ok('#info-btn').on('click', () => {
  showNotification('Here is some information', 'info');
});`,
        live: true
      },
      {
        name: 'Progress Indicators',
        description: 'Progress bars and loading states',
        demo: 'ProgressIndicators',
        code: `// Animated progress bar
const animateProgress = (targetPercent, duration = 2000) => {
  const progressBar = ok('#progress-bar');
  const progressText = ok('#progress-text');
  
  progressBar.css('width', '0%');
  progressText.text('0%');
  
  // Animate to target
  progressBar.animate({
    width: targetPercent + '%'
  }, duration, 'easeOutQuart');
  
  // Update text during animation
  let current = 0;
  const increment = targetPercent / (duration / 50);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= targetPercent) {
      current = targetPercent;
      clearInterval(timer);
    }
    progressText.text(Math.round(current) + '%');
  }, 50);
};

// Circular progress
const animateCircularProgress = (targetPercent) => {
  const circle = ok('#progress-circle');
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  
  circle.css('stroke-dasharray', circumference);
  circle.css('stroke-dashoffset', circumference);
  
  const offset = circumference - (targetPercent / 100) * circumference;
  
  circle.animate({
    'stroke-dashoffset': offset
  }, 2000, 'easeOutQuart');
};

// Step indicator
const updateStepIndicator = (currentStep) => {
  ok('.step').each(function(index) {
    const step = ok(this);
    const stepNumber = index + 1;
    
    if (stepNumber < currentStep) {
      step.addClass('completed').removeClass('active');
    } else if (stepNumber === currentStep) {
      step.addClass('active').removeClass('completed');
    } else {
      step.removeClass('active completed');
    }
  });
  
  // Update progress line
  const progressPercent = ((currentStep - 1) / 3) * 100;
  ok('#step-progress').css('width', progressPercent + '%');
};`,
        live: true
      }
    ]
  }
};

export default function ComponentShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('buttons');
  const [copiedCode, setCopiedCode] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  const copyToClipboard = async (code, id) => {
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
          setCopiedCode(id);
          setTimeout(() => setCopiedCode(null), 2000);
        } else {
          throw new Error('Copy command failed');
        }
      } catch (err) {
        console.error('Failed to copy with fallback method:', err);
        // Still set the copied state to show feedback, even if copy failed
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Still show feedback to user
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const categories = Object.keys(components).map(key => ({
    id: key,
    ...components[key]
  }));

  const currentComponents = viewAll 
    ? Object.values(components).flatMap(category => category.components)
    : components[selectedCategory]?.components || [];

  // Component demo renderer
  const renderComponentDemo = (demoType) => {
    switch (demoType) {
      case 'ButtonVariants':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Primary Button
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                Secondary Button
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Outline Button
              </button>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        );
      
      case 'ButtonGroups':
        return (
          <div className="space-y-4">
            <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
              <button className="px-4 py-2 bg-blue-500 text-white">Day</button>
              <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-50">Week</button>
              <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-50">Month</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-3 py-1 bg-green-500 text-white rounded">+</button>
              <span className="text-2xl font-semibold">0</span>
              <button className="px-3 py-1 bg-red-500 text-white rounded">−</button>
            </div>
          </div>
        );

      case 'InputFields':
        return (
          <div className="space-y-4 max-w-md">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{width: '0%'}}></div>
              </div>
            </div>
          </div>
        );

      case 'SearchComponents':
        return (
          <div className="relative max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg hidden">
              <div className="p-2 hover:bg-gray-50 cursor-pointer">Apple</div>
              <div className="p-2 hover:bg-gray-50 cursor-pointer">Banana</div>
              <div className="p-2 hover:bg-gray-50 cursor-pointer">Orange</div>
            </div>
          </div>
        );

      case 'ProductCards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Product 1', 'Product 2', 'Product 3'].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative">
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product}</h3>
                  <p className="text-gray-600 text-sm mb-4">High-quality product with amazing features</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${(index + 1) * 29}</span>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'ProfileCards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['John Doe', 'Jane Smith'].map((name, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-gray-600">Product Designer</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600" data-target="1234">0</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600" data-target="567">0</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600" data-target="89">0</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        );

      case 'NavigationMenus':
        return (
          <div className="space-y-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-blue-600 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
            <div className="flex items-center space-x-2 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <ChevronDown className="w-4 h-4 text-gray-400" />
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
              <ChevronDown className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">Electronics</span>
            </div>
          </div>
        );

      case 'TabsAndPills':
        return (
          <div className="space-y-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                <button className="pb-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">Overview</button>
                <button className="pb-2 px-1 text-gray-600 hover:text-gray-900">Features</button>
                <button className="pb-2 px-1 text-gray-600 hover:text-gray-900">Pricing</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Vue</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Angular</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Svelte</span>
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="space-y-4">
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                Show Success
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Show Error
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Show Info
              </button>
            </div>
            <div className="space-y-2">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800">Operation completed successfully!</span>
                </div>
                <button className="text-green-600 hover:text-green-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'ProgressIndicators':
        return (
          <div className="space-y-6 max-w-md">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Upload Progress</span>
                <span className="text-sm text-gray-600">75%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{width: '75%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm text-gray-600">60%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{width: '60%'}}></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div className="flex-1 h-1 bg-blue-500"></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">Account</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div className="flex-1 h-1 bg-gray-300"></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">Profile</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <div className="flex-1 h-1 bg-gray-300"></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">Preferences</div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-4 bg-gray-100 rounded">Demo not available</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Eye className="w-4 h-4 mr-2" />
            Component Showcase
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Interactive Component Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore ready-to-use UI components built with OneKit JS. See live demos and copy the code.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => {
            const Icon = category.id === 'buttons' ? Zap :
                        category.id === 'forms' ? Edit :
                        category.id === 'cards' ? Grid :
                        category.id === 'navigation' ? Menu :
                        Bell;
            
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setViewAll(false);
                }}
                className="flex items-center gap-2 px-4 py-2"
              >
                <Icon className="w-4 h-4" />
                {category.title}
              </Button>
            );
          })}
          <Button
            variant={viewAll ? 'default' : 'outline'}
            onClick={() => setViewAll(!viewAll)}
            className="flex items-center gap-2 px-4 py-2"
          >
            <List className="w-4 h-4" />
            View All
          </Button>
        </div>

        {/* Category Description */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {viewAll ? 'All Components' : components[selectedCategory]?.title}
              </CardTitle>
              <CardDescription>
                {viewAll 
                  ? 'All interactive components from all categories. See live demos and copy the code.'
                  : components[selectedCategory]?.description
                }
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Components */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {currentComponents.map((component, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{component.name}</CardTitle>
                      <CardDescription className="text-base">
                        {component.description}
                      </CardDescription>
                    </div>
                    {component.live && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <Play className="w-3 h-3 mr-1" />
                        Live Demo
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Live Demo */}
                  {component.live && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Live Demo
                      </h4>
                      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
                        {renderComponentDemo(component.demo)}
                      </div>
                    </div>
                  )}

                  {/* Code */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Implementation Code
                    </h4>
                    <div className="relative">
                      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono whitespace-pre">
                          <code>{component.code}</code>
                        </pre>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(component.code, `${selectedCategory}-${index}`)}
                          className="flex items-center gap-2"
                        >
                          {copiedCode === `${selectedCategory}-${index}` ? (
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Component Features
              </CardTitle>
              <CardDescription>
                All components come with these built-in features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Reactive Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Components automatically update when state changes
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Palette className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Customizable Styles</h4>
                      <p className="text-sm text-muted-foreground">
                        Easy to customize with CSS variables and classes
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Smooth Animations</h4>
                      <p className="text-sm text-muted-foreground">
                        Built-in animations and transitions for better UX
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Accessible</h4>
                      <p className="text-sm text-muted-foreground">
                        WCAG compliant with proper ARIA labels and keyboard navigation
                      </p>
                    </div>
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