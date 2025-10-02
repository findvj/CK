import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductGrid } from '@/components/product/product-grid'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { ArrowRight, Zap, Shield, Truck, Headphones, Clock } from 'lucide-react'
import { HeroSlider } from '@/components/home/hero-slider'
import { ReviewsSlider } from '@/components/home/reviews-slider'
import { BrandsSlider } from '@/components/home/brands-slider'
import { BackToTop } from '@/components/common/back-to-top'

export default function Home() {
  // Create different product sections
  const featuredProducts = products.slice(0, 4)
  const bestDeals = products.slice(4, 8).map(product => ({
    ...product,
    originalPrice: product.price,
    price: product.price * 0.85, // 15% off
    discount: 15
  }))
  const newArrivals = products.slice(8, 12)

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: 'High Performance',
      description: 'Top-tier components from leading manufacturers for maximum performance.'
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Quality Guaranteed',
      description: 'All products come with manufacturer warranty and our quality guarantee.'
    },
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $100 with same-day processing.'
    },
    {
      icon: <Headphones className="h-6 w-6 text-primary" />,
      title: 'Expert Support',
      description: '24/7 customer support from PC building experts.'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-0">
          <HeroSlider />
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Featured Products</h2>
                <p className="text-muted-foreground">Handpicked components for the best performance</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/products">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <ProductGrid products={featuredProducts} />
          </div>
        </section>

        {/* Best Deals */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Best Deals</h2>
                <p className="text-muted-foreground">Limited time offers on premium hardware</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/deals">
                  View All Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bestDeals.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow relative">
                  <Badge variant="destructive" className="absolute top-2 right-2 z-10 text-xs">
                    {product.discount}% OFF
                  </Badge>
                  <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
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
                  </div>
                  <CardContent className="p-1.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{product.brand}</Badge>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-2.5 w-2.5 text-orange-500" />
                          <span className="text-xs text-orange-500">Limited</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-xs line-clamp-1">{product.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-primary">{formatPrice(product.price)}</span>
                        <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">New Arrivals</h2>
                <p className="text-muted-foreground">Latest products just added to our store</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/products">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <ProductGrid products={newArrivals} />
          </div>
        </section>

        {/* Reviews + Why Choose Us */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-4">What our customers say</h3>
                <ReviewsSlider />
              </div>
              <div className="lg:col-span-2">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Why Bhupati Info Solutions ? </h2>
                  <p className="text-muted-foreground">We provide the best PC building experience</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-2 p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-colors"
                    >
                      <div className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold leading-tight mb-0.5 text-xs">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Slider */}
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold mb-4">Top Computer & Electronics Brands</h3>
            <BrandsSlider />
        </div>
        </section>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  )
}
