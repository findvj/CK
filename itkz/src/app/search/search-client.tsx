'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, X } from 'lucide-react'
import { products, categories } from '@/data/products'
import { formatPrice } from '@/lib/utils'

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
  rating?: number
  reviewCount?: number
}

export default function SearchClient() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
    
    if (q.trim()) {
      performSearch(q)
    } else {
      setResults([])
    }
  }, [searchParams])

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const searchResults: SearchResult[] = []
    const lowerQuery = searchQuery.toLowerCase()

    // Search products
    products.forEach(product => {
      const matchScore = calculateMatchScore(product, lowerQuery)
      if (matchScore > 0) {
        searchResults.push({
          type: 'product',
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          category: product.category,
          brand: product.brand,
          price: product.price,
          rating: product.rating,
          reviewCount: product.reviewCount
        })
      }
    })

    // Search categories
    categories.forEach(category => {
      if (category.name.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: 'category',
          id: category.id,
          name: category.name,
          icon: category.icon
        })
      }
    })

    // Search brands
    const brands = [...new Set(products.map(p => p.brand))]
    brands.forEach(brand => {
      if (brand.toLowerCase().includes(lowerQuery)) {
        const brandProducts = products.filter(p => p.brand === brand)
        searchResults.push({
          type: 'brand',
          id: brand,
          name: brand,
          description: `${brandProducts.length} products available`
        })
      }
    })

    // Sort by relevance (products first, then categories, then brands)
    searchResults.sort((a, b) => {
      const typeOrder = { product: 0, category: 1, brand: 2 }
      return typeOrder[a.type] - typeOrder[b.type]
    })

    setResults(searchResults)
    setIsLoading(false)
  }

  const calculateMatchScore = (product: any, query: string): number => {
    let score = 0
    
    // Exact name match
    if (product.name.toLowerCase().includes(query)) score += 10
    
    // Description match
    if (product.description?.toLowerCase().includes(query)) score += 5
    
    // Brand match
    if (product.brand.toLowerCase().includes(query)) score += 3
    
    // Category match
    if (product.category.toLowerCase().includes(query)) score += 2
    
    // Specifications match
    Object.values(product.specifications || {}).forEach((spec: any) => {
      if (spec.toLowerCase().includes(query)) score += 1
    })
    
    return score
  }

  const getResultIcon = (result: SearchResult) => {
    switch (result.type) {
      case 'product':
        return result.image ? (
          <Image
            src={result.image}
            alt={result.name}
            width={40}
            height={40}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
            <span className="text-xs text-muted-foreground">IMG</span>
          </div>
        )
      case 'category':
        return (
          <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
            <span className="text-primary text-sm">{result.icon}</span>
          </div>
        )
      case 'brand':
        return (
          <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center">
            <span className="text-secondary-foreground text-xs font-bold">
              {result.name.charAt(0)}
            </span>
          </div>
        )
    }
  }

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'product':
        return `/products/${result.id}`
      case 'category':
        return `/products?category=${result.id}`
      case 'brand':
        return `/products?brand=${result.id}`
      default:
        return '#'
    }
  }

  if (!query.trim()) {
    return (
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h1 className="text-2xl font-bold mb-2">Search Products</h1>
              <p className="text-muted-foreground">
                Enter a search term to find products, categories, or brands
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              Search Results for "{query}"
            </h1>
            <p className="text-muted-foreground">
              {isLoading ? 'Searching...' : `Found ${results.length} results`}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-muted rounded" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Link key={`${result.type}-${result.id}-${index}`} href={getResultLink(result)}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {getResultIcon(result)}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold truncate">{result.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {result.type}
                            </Badge>
                            {result.brand && result.type === 'product' && (
                              <Badge variant="secondary" className="text-xs">
                                {result.brand}
                              </Badge>
                            )}
                          </div>
                          
                          {result.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {result.description}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            {result.category && (
                              <span>Category: {result.category}</span>
                            )}
                            {result.rating && (
                              <span>★ {result.rating} ({result.reviewCount} reviews)</span>
                            )}
                          </div>
                        </div>
                        
                        {result.price && (
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              {formatPrice(result.price)}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && results.length === 0 && query.trim() && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground mb-4">
                We couldn't find anything matching "{query}". Try different keywords or check the spelling.
              </p>
              
              {/* Suggestions */}
              <div className="max-w-md mx-auto">
                <h3 className="font-medium mb-3">Popular Categories</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.slice(0, 6).map((category) => (
                    <Link key={category.id} href={`/products?category=${category.id}`}>
                      <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                        {category.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
