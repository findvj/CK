'use client'

import { Product, ProductCategory } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product/product-card'
import { formatPrice } from '@/lib/utils'
import { X } from 'lucide-react'

interface ComponentSelectorProps {
  category: ProductCategory
  products: Product[]
  onSelect: (product: Product) => void
  onClose: () => void
}

export function ComponentSelector({ category, products, onSelect, onClose }: ComponentSelectorProps) {
  const categoryName = {
    cpu: 'Processors',
    gpu: 'Graphics Cards',
    motherboard: 'Motherboards',
    ram: 'Memory',
    storage: 'Storage',
    psu: 'Power Supplies',
    case: 'Cases',
    cooling: 'Cooling',
    accessories: 'Accessories',
    prebuilt: 'Pre-built PCs'
  }[category]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Select {categoryName}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-2 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-8 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-muted-foreground">IMG</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-xs line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 hidden">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-bold text-primary text-xs">
                      {formatPrice(product.price)}
                    </span>
                    <Button 
                      size="sm" 
                      onClick={() => onSelect(product)}
                      disabled={!product.inStock}
                      className="h-6 px-2 text-xs"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
