import React from 'react';
import { cn } from '@/lib/utils';

interface CodeProps {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
  language?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
}

export function Code({ 
  children, 
  className, 
  inline = false, 
  language = 'javascript',
  showLineNumbers = false,
  copyable = true 
}: CodeProps) {
  const [copied, setCopied] = React.useState(false);
  const codeContent = typeof children === 'string' ? children : String(children);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (inline) {
    return (
      <code 
        className={cn(
          "relative rounded bg-muted px-1.5 py-0.5 text-sm font-mono transition-colors",
          className
        )}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative group">
      <pre 
        className={cn(
          "relative overflow-x-auto rounded-lg bg-slate-900 text-slate-100 p-4 text-sm",
          "dark:bg-slate-100 dark:text-slate-900",
          className
        )}
      >
        {showLineNumbers && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800 dark:bg-slate-200 text-slate-400 dark:text-slate-600 text-right select-none">
            {codeContent.split('\n').map((_, i) => (
              <div key={i} className="text-xs leading-6">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <code className={`language-${language} block`}>
          {children}
        </code>
      </pre>
      
      {copyable && (
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 dark:bg-slate-300 text-slate-300 dark:text-slate-700 hover:bg-slate-600 dark:hover:bg-slate-400 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L4 5l-4 4M5 13v6l4-4v-6l-4 4" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7h3a5 5 0 015 5v5a5 5 0 01-5 5h-3a5 5 0 01-5-5v-5a5 5 0 015-5h3z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}