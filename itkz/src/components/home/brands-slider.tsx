'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Use image logos instead of plain text, including main logo as an icon
const brandLogos = [
  { src: '/brands/intel.png', alt: 'Intel' },
  { src: '/brands/amd.png', alt: 'AMD' },
  { src: '/brands/asus.png', alt: 'ASUS' },
  { src: '/brands/msi.png', alt: 'MSI' },
  { src: '/brands/nvidia.png', alt: 'NVIDIA' },
  { src: '/brands/corsair.png', alt: 'Corsair' },
  { src: '/brands/samsung.png', alt: 'Samsung' },
  { src: '/brands/wd.png', alt: 'Western Digital' },
  { src: '/brands/gigabyte.png', alt: 'Gigabyte' },
  { src: '/brands/seagate.png', alt: 'Seagate' }
]

export function BrandsSlider() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setOffset((o) => (o + 1) % 2000), 20)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        className="whitespace-nowrap will-change-transform"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {Array.from({ length: 3 }).map((_, loop) => (
          <span key={loop} className="inline-flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 pr-4 sm:pr-6 md:pr-8 lg:pr-10">
            {brandLogos.map((logo, i) => (
              <span
                key={`${logo.alt}-${loop}-${i}`}
                className="inline-flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded border bg-card/60 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="h-6 w-auto object-contain sm:h-7 md:h-8"
                  priority={i < 3}
                />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}


