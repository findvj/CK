'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart-store'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Heart, Share2 } from 'lucide-react'
import { ProductGallery } from '@/components/product/product-gallery'
import { SpecificationsTable } from '@/components/product/specifications-table'
import { Loading, PageLoading } from '@/components/ui/loading'
import { ProductCard } from '@/components/product/product-card'

export default function ProductDetailClient() {
  const params = useParams()
  const { addItem } = useCartStore()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const [isShareLoading, setIsShareLoading] = useState(false)
  
  // Get recommended products
  const getRecommendedProducts = () => {
    if (!product) return []
    
    // Get products from the same category, excluding current product
    const sameCategory = products.filter(p => 
      p.category === product.category && p.id !== product.id
    ).slice(0, 4)
    
    // If not enough from same category, add random products
    if (sameCategory.length < 4) {
      const otherProducts = products.filter(p => 
        p.category !== product.category && p.id !== product.id
      ).slice(0, 4 - sameCategory.length)
      
      return [...sameCategory, ...otherProducts]
    }
    
    return sameCategory
  }

  const product = products.find(p => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      addItem(product, 1)
      setIsAddedToCart(true)
      setTimeout(() => setIsAddedToCart(false), 2000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWishlist = async () => {
    setIsWishlistLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setIsWishlisted(!isWishlisted)
    } finally {
      setIsWishlistLoading(false)
    }
  }

  const handleShare = async () => {
    setIsShareLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsShareLoading(false)
    }
  }

  const recommendedProducts = getRecommendedProducts()

  // Ensure recommendedProducts is always an array
  const safeRecommendedProducts = Array.isArray(recommendedProducts) ? recommendedProducts : []

  return (
    <div className="min-h-screen flex flex-col">
      {(isLoading || isWishlistLoading || isShareLoading) && (
        <PageLoading text={
          isLoading ? "Adding to cart..." : 
          isWishlistLoading ? "Updating wishlist..." : 
          "Sharing product..."
        } />
      )}
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Product Images */}
              <div>
                <ProductGallery 
                  images={
                    product.images && Array.isArray(product.images) && product.images.length > 0 
                      ? product.images 
                      : product.image 
                        ? [product.image] 
                        : []
                  } 
                  productName={product.name}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{product.brand}</Badge>
                    {product.badge && (
                      <Badge variant="destructive">{product.badge}</Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(product.mrp)}
                        </span>
                        <Badge variant="destructive">
                          {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Inclusive of all taxes
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${
                    product.inStock ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddToCart}
                      disabled={!product.inStock || isLoading}
                      className="flex-1"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loading size="sm" className="mr-2" />
                          Adding...
                        </>
                      ) : isAddedToCart ? (
                        'Added to Cart!'
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleWishlist}
                      disabled={isWishlistLoading}
                    >
                      {isWishlistLoading ? (
                        <Loading size="sm" />
                      ) : (
                        <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleShare}
                      disabled={isShareLoading}
                    >
                      {isShareLoading ? (
                        <Loading size="sm" />
                      ) : (
                        <Share2 className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Free Shipping</div>
                    <div className="text-xs text-muted-foreground">On orders over ₹1000</div>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Warranty</div>
                    <div className="text-xs text-muted-foreground">1 Year Official</div>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Easy Returns</div>
                    <div className="text-xs text-muted-foreground">30 Day Policy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpecificationsTable specifications={product.specifications} />
                </CardContent>
              </Card>
            </div>

            {/* Recommended Products */}
            {safeRecommendedProducts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {safeRecommendedProducts.map((recommendedProduct) => (
                    <ProductCard key={recommendedProduct.id} product={recommendedProduct} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
