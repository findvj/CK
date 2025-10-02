'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Ensure images is always an array and filter out any falsy values
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : []

  // Ensure selectedImage is within bounds
  const validSelectedImage = safeImages.length > 0 ? Math.min(selectedImage, safeImages.length - 1) : 0

  const nextImage = () => {
    if (safeImages.length > 0) {
      setSelectedImage((prev) => (prev + 1) % safeImages.length)
    }
  }

  const prevImage = () => {
    if (safeImages.length > 0) {
      setSelectedImage((prev) => (prev - 1 + safeImages.length) % safeImages.length)
    }
  }

  if (!safeImages || safeImages.length === 0) {
    return (
      <div className="space-y-4">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground text-lg">No Images Available</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden group">
        <Image
          src={safeImages[validSelectedImage]}
          alt={`${productName} - Image ${validSelectedImage + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Navigation Arrows */}
        {safeImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        {/* Image Counter */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {validSelectedImage + 1} / {safeImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-1">
          {safeImages.map((image, index) => (
            <button
              key={index}
              className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={safeImages[validSelectedImage]}
              alt={`${productName} - Zoomed`}
              width={800}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsZoomed(false)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
