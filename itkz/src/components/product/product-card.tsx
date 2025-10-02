'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, CheckCircle2 } from 'lucide-react'
import { Product } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import { Loading } from '@/components/ui/loading'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const [added, setAdded] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      addItem(product)
      setAdded(true)
      setTimeout(() => setAdded(false), 1200)
    } finally {
      setIsLoading(false)
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'new': return 'bg-green-100 text-green-800 border-green-200'
      case 'sale': return 'bg-red-100 text-red-800 border-red-200'
      case 'best-deal': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'hot': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'limited': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'trending': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'new': return 'New'
      case 'sale': return 'Sale'
      case 'best-deal': return 'Best Deal'
      case 'hot': return 'Hot'
      case 'limited': return 'Limited'
      case 'trending': return 'Trending'
      default: return ''
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-muted-foreground text-sm">Product Image</span>
          )}
          
          {/* Product Badge */}
          {product.badge && (
            <div className="absolute top-2 left-2">
              <Badge className={`text-xs font-semibold ${getBadgeColor(product.badge)}`}>
                {getBadgeText(product.badge)}
              </Badge>
            </div>
          )}
          
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-1.5">
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.brand}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-xs line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-xs text-muted-foreground line-clamp-1 hidden">
              {product.description}
            </p>
            
            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.mrp)}
                  </span>
                )}
              </div>
              {product.discount && product.discount > 0 && (
                <div className="text-xs text-green-600 font-medium">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-1.5 pt-0">
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="w-full"
            size="sm"
          >
            {isLoading ? (
              <>
                <Loading size="sm" className="mr-1" />
                Adding...
              </>
            ) : added ? (
              <>
                <CheckCircle2 className="h-3 w-3 mr-1" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-3 w-3 mr-1" /> Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
