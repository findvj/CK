'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const slides = [
  { id: 1, src: '/hero1.jpg', headline: 'Build Your Dream PC', sub: 'Custom PCs with guaranteed compatibility' },
  { id: 2, src: '/hero2.jpg', headline: 'Top Brands. Best Prices.', sub: 'Premium components at Indian prices' },
  { id: 3, src: '/hero3.jpg', headline: 'Power. Performance. Precision.', sub: 'From budget to extreme performance' },
]

export function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-[360px] md:h-[440px] lg:h-[520px] overflow-hidden rounded-none">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.headline}
            fill
            priority={i === 0}
            className="object-cover blur-[3px]"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow">{slide.headline}</h1>
              <p className="text-sm md:text-lg text-white/90 mb-6 drop-shadow">{slide.sub}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <Link href="/pc-builder">
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${index === i ? 'bg-primary w-6' : 'bg-white/60 hover:bg-white'}`}
          />
        ))}
      </div>

      {/* Gradient overlay for better contrast at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  )
}


