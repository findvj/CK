'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
import { products, categories } from '@/data/products'
import { Card, CardContent } from '@/components/ui/card'

interface SearchResult {
  type: 'product' | 'category' | 'brand'
  id: string
  name: string
  description?: string
  image?: string
  category?: string
  brand?: string
  price?: number
  icon?: string
}

interface SearchResultsProps {
  query: string
  isOpen: boolean
  onClose: () => void
}

export function SearchResults({ query, isOpen, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchTerm = query.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search products
    products.forEach(product => {
      if (
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          type: 'product',
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          category: product.category,
          brand: product.brand,
          price: product.price
        })
      }
    })

    // Search categories
    categories.forEach(category => {
      if (category.name.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          type: 'category',
          id: category.id,
          name: category.name,
          icon: category.icon
        })
      }
    })

    // Search brands
    const allBrands = [...new Set(products.map(p => p.brand))]
    allBrands.forEach(brand => {
      if (brand.toLowerCase().includes(searchTerm)) {
        const brandProducts = products.filter(p => p.brand === brand)
        searchResults.push({
          type: 'brand',
          id: brand.toLowerCase(),
          name: brand,
          description: `${brandProducts.length} products available`
        })
      }
    })

    // Sort results: products first, then categories, then brands
    searchResults.sort((a, b) => {
      if (a.type === 'product' && b.type !== 'product') return -1
      if (a.type !== 'product' && b.type === 'product') return 1
      if (a.type === 'category' && b.type === 'brand') return -1
      if (a.type === 'brand' && b.type === 'category') return 1
      return 0
    })

    setResults(searchResults.slice(0, 8)) // Limit to 8 results
  }, [query])

  if (!isOpen || !query.trim()) return null

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'product':
        return `/products/${result.id}`
      case 'category':
        return `/products/${result.id}`
      case 'brand':
        return `/products?brand=${result.id}`
      default:
        return '#'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
      {results.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No results found for "{query}"</p>
        </div>
      ) : (
        <div className="p-2">
          {results.map((result, index) => (
            <Link
              key={`${result.type}-${result.id}-${index}`}
              href={getResultLink(result)}
              onClick={onClose}
              className="block"
            >
              <Card className="mb-2 hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    {/* Icon/Image */}
                    <div className="flex-shrink-0">
                      {result.type === 'category' && result.icon ? (
                        <span className="text-2xl">{result.icon}</span>
                      ) : result.type === 'product' && result.image ? (
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={result.image}
                            alt={result.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                          <Search className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm truncate">{result.name}</h3>
                        {result.price && (
                          <span className="text-sm font-semibold text-primary">
                            {formatPrice(result.price)}
                          </span>
                        )}
                      </div>
                      
                      {result.description && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {result.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">
                          {result.type}
                        </span>
                        {result.brand && (
                          <span className="text-xs text-muted-foreground">
                            {result.brand}
                          </span>
                        )}
                        {result.category && (
                          <span className="text-xs text-muted-foreground">
                            {result.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          
          {/* Show all results link */}
          <div className="text-center py-2">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-sm text-primary hover:underline"
            >
              View all results for "{query}"
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
