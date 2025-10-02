'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart, Star, Zap, Gamepad2, Monitor } from 'lucide-react'
import { Loading } from '@/components/ui/loading'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart-store'

interface PrebuiltPC {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: 'gaming' | 'workstation' | 'budget' | 'premium'
  specs: {
    cpu: string
    gpu: string
    ram: string
    storage: string
    psu: string
  }
  rating: number
  reviewCount: number
  inStock: boolean
}

const prebuiltPCs: PrebuiltPC[] = [
  {
    id: 'gaming-1',
    name: 'Gaming Beast Pro',
    description: 'High-performance gaming PC with RTX 4090 and Intel i9-13900K',
    price: 249999,
    originalPrice: 289999,
    image: '/images/gaming-beast-pro.jpg',
    category: 'gaming',
    specs: {
      cpu: 'Intel Core i9-13900K',
      gpu: 'NVIDIA RTX 4090 24GB',
      ram: '32GB DDR5-6000',
      storage: '2TB NVMe SSD',
      psu: '1000W 80+ Gold'
    },
    rating: 4.9,
    reviewCount: 156,
    inStock: true
  },
  {
    id: 'workstation-1',
    name: 'Professional Workstation',
    description: 'Powerful workstation for content creation and professional work',
    price: 207999,
    image: '/images/pro-workstation.jpg',
    category: 'workstation',
    specs: {
      cpu: 'AMD Ryzen 9 7950X',
      gpu: 'NVIDIA RTX 4080 16GB',
      ram: '64GB DDR5-5600',
      storage: '4TB NVMe SSD',
      psu: '850W 80+ Gold'
    },
    rating: 4.8,
    reviewCount: 89,
    inStock: true
  },
  {
    id: 'budget-1',
    name: 'Budget Gaming Starter',
    description: 'Affordable gaming PC perfect for 1080p gaming',
    price: 74999,
    originalPrice: 91999,
    image: '/images/budget-gaming.jpg',
    category: 'budget',
    specs: {
      cpu: 'AMD Ryzen 5 7600X',
      gpu: 'NVIDIA RTX 4060 Ti 8GB',
      ram: '16GB DDR5-5200',
      storage: '1TB NVMe SSD',
      psu: '650W 80+ Bronze'
    },
    rating: 4.6,
    reviewCount: 234,
    inStock: true
  },
  {
    id: 'premium-1',
    name: 'Ultimate Performance',
    description: 'Top-of-the-line PC with the latest components',
    price: 414999,
    image: '/images/ultimate-performance.jpg',
    category: 'premium',
    specs: {
      cpu: 'Intel Core i9-14900K',
      gpu: 'NVIDIA RTX 4090 24GB',
      ram: '64GB DDR5-6400',
      storage: '4TB NVMe SSD',
      psu: '1200W 80+ Platinum'
    },
    rating: 5.0,
    reviewCount: 45,
    inStock: true
  }
]

const categoryIcons = {
  gaming: <Gamepad2 className="h-5 w-5" />,
  workstation: <Monitor className="h-5 w-5" />,
  budget: <Zap className="h-5 w-5" />,
  premium: <Star className="h-5 w-5" />
}

export default function PrebuiltPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | PrebuiltPC['category']>('all')
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const { addItem } = useCartStore()

  const filteredPCs = selectedCategory === 'all' 
    ? prebuiltPCs 
    : prebuiltPCs.filter(pc => pc.category === selectedCategory)

  const handleAddToCart = async (pc: PrebuiltPC) => {
    setLoadingStates(prev => ({ ...prev, [pc.id]: true }))
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Convert PrebuiltPC to Product format for cart
      const product = {
        id: pc.id,
        name: pc.name,
        price: pc.price,
        image: pc.image,
        brand: pc.specs.cpu.split(' ')[0], // Use CPU brand as main brand
        category: 'prebuilt' as const,
        rating: pc.rating,
        reviewCount: pc.reviewCount,
        inStock: pc.inStock,
        stockQuantity: pc.inStock ? 10 : 0, // Default stock quantity
        description: pc.description,
        specifications: pc.specs,
        compatibility: undefined
      }
      
      addItem(product)
    } finally {
      setLoadingStates(prev => ({ ...prev, [pc.id]: false }))
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Pre-built PCs</h1>
            <p className="text-muted-foreground">
              Ready-to-use computers assembled by our experts with guaranteed compatibility
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                All PCs ({prebuiltPCs.length})
              </Button>
              <Button
                variant={selectedCategory === 'gaming' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('gaming')}
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                Gaming ({prebuiltPCs.filter(pc => pc.category === 'gaming').length})
              </Button>
              <Button
                variant={selectedCategory === 'workstation' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('workstation')}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Workstation ({prebuiltPCs.filter(pc => pc.category === 'workstation').length})
              </Button>
              <Button
                variant={selectedCategory === 'budget' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('budget')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Budget ({prebuiltPCs.filter(pc => pc.category === 'budget').length})
              </Button>
              <Button
                variant={selectedCategory === 'premium' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('premium')}
              >
                <Star className="h-4 w-4 mr-2" />
                Premium ({prebuiltPCs.filter(pc => pc.category === 'premium').length})
              </Button>
            </div>
          </div>

          {/* Pre-built PCs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPCs.map((pc) => (
              <Card key={pc.id} className="hover:shadow-md transition-shadow group">
                <div className="relative">
                  <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    {pc.image ? (
                      <Image
                        src={pc.image}
                        alt={pc.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">PC Image</span>
                    )}
                  </div>
                  
                  {pc.originalPrice && (
                    <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
                      {Math.round(((pc.originalPrice - pc.price) / pc.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                  
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 left-2 flex items-center space-x-1 text-xs"
                  >
                    {categoryIcons[pc.category]}
                    <span className="capitalize">{pc.category}</span>
                  </Badge>
                </div>
                
                <CardContent className="p-3 space-y-3">
                  {/* Title and Description */}
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {pc.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {pc.description}
                    </p>
                  </div>
                  
                  {/* Key Specs */}
                  <div className="space-y-1">
                    <div className="text-xs">
                      <span className="text-muted-foreground">CPU:</span>
                      <span className="ml-1 font-medium">{pc.specs.cpu.split(' ')[0]} {pc.specs.cpu.split(' ')[1]}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">GPU:</span>
                      <span className="ml-1 font-medium">{pc.specs.gpu.split(' ')[0]} {pc.specs.gpu.split(' ')[1]}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">RAM:</span>
                      <span className="ml-1 font-medium">{pc.specs.ram}</span>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{pc.rating}</span>
                    <span className="text-xs text-muted-foreground">({pc.reviewCount})</span>
                  </div>
                  
                  {/* Price and Button */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(pc.price)}
                      </span>
                      {pc.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(pc.originalPrice)}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      size="sm"
                      className="w-full text-xs" 
                      disabled={!pc.inStock || loadingStates[pc.id]}
                      onClick={() => handleAddToCart(pc)}
                    >
                      {loadingStates[pc.id] ? (
                        <>
                          <Loading size="sm" className="mr-1" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    
                    {!pc.inStock && (
                      <p className="text-destructive text-xs text-center">Out of Stock</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Build CTA */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Don&apos;t See What You Need?</h2>
                <p className="text-muted-foreground mb-6">
                  Build your own custom PC with our PC Builder tool. Choose every component 
                  and get automatic compatibility checking.
                </p>
                <Button size="lg" asChild>
                  <Link href="/pc-builder">
                    Start Building Your PC
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
