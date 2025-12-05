import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loading({ className, size = 'md', text = 'Loading...' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        className
      )}
      role="status"
      aria-label={text}
    >
      <div 
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-transparent",
          sizeClasses[size]
        )}
      >
        <svg 
          className="w-full h-full text-muted-foreground" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4" 
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8v4a8 8 0 018 8v4a8 8 0 01-8 8H4z" 
          />
        </svg>
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export function Skeleton({ className, lines = 3, height = 'h-4' }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)} role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className={cn(
            "bg-muted rounded animate-pulse",
            height
          )}
        />
      ))}
    </div>
  );
}

interface ButtonLoadingProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ButtonLoading({ loading = false, children, className }: ButtonLoadingProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={loading}
    >
      {loading && (
        <Loading size="sm" className="mr-2" />
      )}
      {children}
    </button>
  );
}