'use client'

import { useMemo, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductGrid } from '@/components/product/product-grid'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { products, categories } from '@/data/products'
import { ProductCategory } from '@/types'
import { Filter, SortAsc } from 'lucide-react'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)
  const [showSortMobile, setShowSortMobile] = useState(false)

  // Additional filters
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState<string>('')
  const [priceMax, setPriceMax] = useState<string>('')
  const [minRating, setMinRating] = useState<string>('')

  const allBrands = useMemo(() => {
    const set = new Set<string>()
    products.forEach(p => set.add(p.brand))
    return Array.from(set).sort()
  }, [])

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product => selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    .filter(product => {
      const minOk = priceMin === '' || product.price >= Number(priceMin)
      const maxOk = priceMax === '' || product.price <= Number(priceMax)
      return minOk && maxOk
    })
    .filter(product => minRating === '' || product.rating >= Number(minRating))
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  function clearAllFilters() {
    setSelectedCategory('all')
    setSelectedBrands([])
    setPriceMin('')
    setPriceMax('')
    setMinRating('')
    setSortBy('name')
    setSortOrder('asc')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">
              Browse our complete selection of PC hardware and components
            </p>
          </div>

          {/* Mobile Controls */}
          <div className="mb-4 flex items-center gap-2 lg:hidden">
            <Button variant="outline" onClick={() => { setShowFiltersMobile(v => !v); if (showSortMobile) setShowSortMobile(false) }}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" onClick={() => { setShowSortMobile(v => !v); if (showFiltersMobile) setShowFiltersMobile(false) }}>
              <SortAsc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>

          {/* Mobile Filters Panel */}
          {showFiltersMobile && (
            <div className="lg:hidden mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Category Filter */}
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Categories
                      </h3>
                      <div className="space-y-2">
                        <Button
                          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory('all')}
                        >
                          All Products ({products.length})
                        </Button>
                        {categories.slice(0, 8).map((category) => (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setSelectedCategory(category.id as ProductCategory)}
                          >
                            <span className="mr-2">{category.icon}</span>
                            {category.name} ({products.filter(p => p.category === category.id).length})
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Brand Filter */}
                    <div>
                      <h3 className="font-semibold mb-4">Brand</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {allBrands.map(brand => {
                          const checked = selectedBrands.includes(brand)
                          return (
                            <label key={brand} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  if (e.target.checked) setSelectedBrands(prev => [...prev, brand])
                                  else setSelectedBrands(prev => prev.filter(b => b !== brand))
                                }}
                              />
                              <span>{brand}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <h3 className="font-semibold mb-4">Price</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder="Min"
                          className="border rounded-md px-3 py-2"
                          value={priceMin}
                          onChange={(e) => setPriceMin(e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="border rounded-md px-3 py-2"
                          value={priceMax}
                          onChange={(e) => setPriceMax(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <h3 className="font-semibold mb-4">Minimum Rating</h3>
                      <select
                        className="border rounded-md px-3 py-2 w-full"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                      >
                        <option value="">Any</option>
                        <option value="4.5">4.5+</option>
                        <option value="4.0">4.0+</option>
                        <option value="3.5">3.5+</option>
                        <option value="3.0">3.0+</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full" onClick={clearAllFilters}>Clear Filters</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Mobile Sort Panel */}
          {showSortMobile && (
            <div className="lg:hidden mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <SortAsc className="h-4 w-4 mr-2" />
                      Sort By
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={sortBy === 'name' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSortBy('name')}
                      >
                        Name
                      </Button>
                      <Button
                        variant={sortBy === 'price' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSortBy('price')}
                      >
                        Price
                      </Button>
                      <Button
                        variant={sortBy === 'rating' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSortBy('rating')}
                      >
                        Rating
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      >
                        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <Card>
                <CardContent className="p-3">
                  <div className="space-y-3">
                    {/* Category Filter */}
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center text-xs">
                        <Filter className="h-3 w-3 mr-1" />
                        Categories
                      </h3>
                      <div className="space-y-1">
                        <Button
                          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => setSelectedCategory('all')}
                        >
                          All Products ({products.length})
                        </Button>
                        {categories.slice(0, 8).map((category) => (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? 'default' : 'ghost'}
                            size="sm"
                            className="w-full justify-start text-xs"
                            onClick={() => setSelectedCategory(category.id as ProductCategory)}
                          >
                            <span className="mr-1">{category.icon}</span>
                            {category.name} ({products.filter(p => p.category === category.id).length})
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center text-xs">
                        <SortAsc className="h-3 w-3 mr-1" />
                        Sort By
                      </h3>
                      <div className="space-y-1">
                        <Button
                          variant={sortBy === 'name' ? 'default' : 'ghost'}
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => setSortBy('name')}
                        >
                          Name
                        </Button>
                        <Button
                          variant={sortBy === 'price' ? 'default' : 'ghost'}
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => setSortBy('price')}
                        >
                          Price
                        </Button>
                        <Button
                          variant={sortBy === 'rating' ? 'default' : 'ghost'}
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => setSortBy('rating')}
                        >
                          Rating
                        </Button>
                      </div>
                      
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        </Button>
                      </div>
                    </div>

                    {/* Desktop additional filters */}
                    <div>
                      <h3 className="font-semibold mb-2 text-xs">Brand</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {allBrands.map(brand => {
                          const checked = selectedBrands.includes(brand)
                          return (
                            <label key={brand} className="flex items-center gap-1 text-xs">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  if (e.target.checked) setSelectedBrands(prev => [...prev, brand])
                                  else setSelectedBrands(prev => prev.filter(b => b !== brand))
                                }}
                              />
                              <span>{brand}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-xs">Price</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="border rounded-md px-2 py-1 text-xs"
                          value={priceMin}
                          onChange={(e) => setPriceMin(e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="border rounded-md px-2 py-1 text-xs"
                          value={priceMax}
                          onChange={(e) => setPriceMax(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-xs">Minimum Rating</h3>
                      <select
                        className="border rounded-md px-2 py-1 w-full text-xs"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                      >
                        <option value="">Any</option>
                        <option value="4.5">4.5+</option>
                        <option value="4.0">4.0+</option>
                        <option value="3.5">3.5+</option>
                        <option value="3.0">3.0+</option>
                      </select>
                    </div>

                    <div className="pt-1">
                      <Button variant="outline" size="sm" className="w-full text-xs" onClick={clearAllFilters}>Clear Filters</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                  {selectedCategory !== 'all' && (
                    <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
                  )}
                </p>
              </div>
              
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
