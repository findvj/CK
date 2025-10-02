'use client'

import { useEffect, useState } from 'react'

const reviews = [
  {
    name: 'Rohit Sharma',
    title: 'Great custom PC build! ',
    text: 'IT khzana helped me pick compatible parts and the build is flawless. Delivery was quick and the support was excellent.'
  },
  {
    name: 'Aisha Khan',
    title: 'Best prices in India',
    text: 'Got my RTX GPU at a great deal. Everything came nicely packed. Highly recommend!'
  },
  {
    name: 'Vikram Patel',
    title: 'Fast shipping and support',
    text: 'Customer support answered all my questions and the order arrived in 2 days. Very happy with the experience.'
  }
]

export function ReviewsSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {reviews.map((r, i) => (
        <div key={i} className={`transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
          <div className="py-2">
            <p className="text-sm font-semibold mb-1">{r.title}</p>
            <p className="text-sm text-muted-foreground mb-3">{r.text}</p>
            <p className="text-xs text-primary font-medium">{r.name}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button key={i} aria-label={`Go to review ${i + 1}`} onClick={() => setIndex(i)} className={`h-1.5 w-4 rounded-full ${i === index ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>
    </div>
  )
}


