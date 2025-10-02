'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    // Show loading bar when pathname changes
    setIsLoading(true)
    
    // Hide loading bar after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname, isClient])

  if (!isClient || !isLoading) return null

  return (
    <div className="fixed top-14 left-0 right-0 z-50">
      <div className="h-0.5 bg-orange-500">
        <div className="h-full bg-orange-500 animate-[loading_0.8s_ease-out_forwards]"></div>
      </div>
    </div>
  )
}
