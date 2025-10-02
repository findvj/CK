'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductGrid } from '@/components/product/product-grid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Clock, Percent, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function DealsPage() {
  // Create some deals by reducing prices
  const deals = products.map(product => ({
    ...product,
    originalPrice: product.price,
    price: product.price * 0.85, // 15% off
    discount: 15
  })).slice(0, 6)

  const flashDeals = deals.slice(0, 3)
  const weeklyDeals = deals.slice(3, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Special Deals</h1>
            <p className="text-muted-foreground">
              Don't miss out on these amazing deals on premium PC hardware
            </p>
          </div>

          {/* Flash Deals */}
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Zap className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Flash Deals</h2>
              <Badge variant="destructive">Limited Time</Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {flashDeals.map((deal) => (
                <Card key={deal.id} className="relative overflow-hidden">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge variant="destructive" className="animate-pulse text-xs">
                      {deal.discount}% OFF
                    </Badge>
                  </div>
                  
                  <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                    {deal.image ? (
                      <Image
                        src={deal.image}
                        alt={deal.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">IMG</span>
                    )}
                  </div>
                  
                  <CardContent className="p-2">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm line-clamp-2">{deal.name}</h3>
                      <p className="text-xs text-muted-foreground">{deal.brand}</p>
                      
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-bold text-primary">
                          {formatPrice(deal.price)}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(deal.originalPrice)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>2 days left</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Weekly Deals */}
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Percent className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-bold">Weekly Deals</h2>
            </div>
            
            <ProductGrid products={weeklyDeals} />
          </section>

          {/* Deal Categories */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Deal Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Link href="/products/cpu">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="font-semibold mb-2">CPU Deals</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Up to 20% off processors
                    </p>
                    <Badge variant="secondary">Save up to ₹20,000</Badge>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/products/gpu">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🎮</div>
                    <h3 className="font-semibold mb-2">GPU Deals</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Graphics card discounts
                    </p>
                    <Badge variant="secondary">Save up to ₹30,000</Badge>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/products/ram">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">💾</div>
                    <h3 className="font-semibold mb-2">Memory Deals</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      RAM and storage offers
                    </p>
                    <Badge variant="secondary">Save up to ₹8,000</Badge>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/products/case">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">📦</div>
                    <h3 className="font-semibold mb-2">Case Deals</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      PC cases and cooling
                    </p>
                    <Badge variant="secondary">Save up to ₹4,000</Badge>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="mt-12">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Get Deal Alerts</h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter and be the first to know about exclusive deals and discounts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button>Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
