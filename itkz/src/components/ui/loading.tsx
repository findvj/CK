'use client'

import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
  fullScreen?: boolean
}

export function Loading({ 
  size = 'md', 
  className, 
  text = 'Loading...',
  fullScreen = false 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center space-y-3',
      fullScreen && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      className
    )}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-primary border-t-transparent',
        sizeClasses[size]
      )} />
      {text && (
        <p className={cn(
          'text-muted-foreground font-medium',
          textSizeClasses[size]
        )}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        {content}
      </div>
    )
  }

  return content
}

// Page loading component with blur effect
export function PageLoading({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur background */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />
      
      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-lg font-medium text-foreground">{text}</p>
      </div>
    </div>
  )
}

// Inline loading component
export function InlineLoading({ text, size = 'sm' }: { text?: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <div className={cn(
        'animate-spin rounded-full border-2 border-primary border-t-transparent',
        size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'
      )} />
      {text && (
        <span className={cn(
          'text-muted-foreground',
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
        )}>
          {text}
        </span>
      )}
    </div>
  )
}

// Button loading state
export function ButtonLoading({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className={cn(
      'animate-spin rounded-full border-2 border-current border-t-transparent',
      size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'
    )} />
  )
}
