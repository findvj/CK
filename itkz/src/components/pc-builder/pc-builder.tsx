'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Product, ProductCategory } from '@/types'
import { products, categories } from '@/data/products'
import { usePCBuilderStore } from '@/store/pc-builder-store'
import { formatPrice } from '@/lib/utils'
import { ComponentSelector } from './component-selector'
import { BuildSummary } from './build-summary'

export function PCBuilder() {
  const { currentBuild, addComponent, removeComponent, getTotalPrice, checkCompatibility } = usePCBuilderStore()
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
  const [isMobileCatsOpen, setIsMobileCatsOpen] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const compatibility = checkCompatibility()
  const totalPrice = getTotalPrice()

  const handleComponentSelect = (product: Product) => {
    addComponent(product.category, product)
    setSelectedCategory(null)
  }

  const handleComponentRemove = (category: ProductCategory) => {
    removeComponent(category)
  }

  const handleSaveBuild = () => {
    setShowSaveDialog(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">PC Builder</h1>
        <p className="text-muted-foreground">
          Build your custom PC by selecting compatible components. Our system will check compatibility automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Selection - Left Column */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Select Components</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsMobileCatsOpen((v) => !v)}
                >
                  {isMobileCatsOpen ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`space-y-2 ${isMobileCatsOpen ? '' : 'hidden lg:block'}`}>
                {categories.slice(0, 8).map((category) => (
                  <Button
                    key={category.id}
                    variant={currentBuild[category.id as ProductCategory] ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id as ProductCategory)}
                    className="w-full h-10 flex items-center justify-between px-3"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{category.icon}</span>
                      <span className="text-xs font-medium">{category.name}</span>
                    </div>
                    {currentBuild[category.id as ProductCategory] && (
                      <span className="text-xs text-green-600 font-medium">✓</span>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Component Selector - Middle Column */}
        <div className="space-y-4">
          {selectedCategory ? (
            <ComponentSelector
              category={selectedCategory}
              products={products.filter(p => p.category === selectedCategory)}
              onSelect={handleComponentSelect}
              onClose={() => setSelectedCategory(null)}
            />
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Choose a Component</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Select a component category from the left to browse available products.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Build Summary - Right Column */}
        <div className="space-y-4">
          <BuildSummary
            build={currentBuild}
            totalPrice={totalPrice}
            compatibility={compatibility}
            onRemoveComponent={handleComponentRemove}
            onSaveBuild={handleSaveBuild}
          />
        </div>
      </div>
    </div>
  )
}
