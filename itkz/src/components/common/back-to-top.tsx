'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isClient])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isClient) return null

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed z-50 bottom-6 right-6 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} animate-bounce-slow`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  )
}


