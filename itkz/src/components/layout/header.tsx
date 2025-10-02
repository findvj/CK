'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu, User, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories } from '@/data/products'
import { SearchResults } from '@/components/search/search-results'
import { CartIcon } from '@/components/cart/cart-icon'

// Category to brands mapping
const categoryBrands = {
  motherboard: ['ASUS', 'MSI', 'Gigabyte', 'ASRock', 'EVGA'],
  cpu: ['Intel', 'AMD'],
  ram: ['Corsair', 'G.Skill', 'Kingston', 'Crucial', 'TeamGroup'],
  psu: ['Corsair', 'Seasonic', 'EVGA', 'Cooler Master', 'Thermaltake'],
  monitors: ['Samsung', 'LG', 'ASUS', 'Acer', 'Dell', 'BenQ'],
  cooling: ['Noctua', 'Corsair', 'Cooler Master', 'Arctic', 'be quiet!'],
  case: ['Fractal Design', 'Corsair', 'NZXT', 'Cooler Master', 'Lian Li'],
  accessories: ['Logitech', 'Razer', 'SteelSeries', 'HyperX', 'Corsair'],
  peripherals: ['Logitech', 'Razer', 'SteelSeries', 'HyperX', 'Corsair'],
  gpu: ['NVIDIA', 'AMD', 'ASUS', 'MSI', 'Gigabyte'],
  storage: ['Samsung', 'WD', 'Seagate', 'Crucial', 'Kingston']
}

export function Header() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check for dark mode preference
    const checkDarkMode = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(isDark)
    }
    
    checkDarkMode()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode)
    
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', checkDarkMode)
    }
  }, [])
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={isClient && isDarkMode ? "/main_logo.png" : "/tra_logo.png"}
              alt="Bhupati Info Solution LLP"
              width={140}
              height={48}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/pc-builder" className="text-sm font-medium hover:text-primary transition-colors">
              PC Builder
            </Link>
            <Link href="/prebuilt" className="text-sm font-medium hover:text-primary transition-colors">
              Pre-built PCs
            </Link>
            <Link href="/deals" className="text-sm font-medium hover:text-primary transition-colors">
              Deals
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search products, categories, brands..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setIsSearchOpen(true)
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="pl-10 pr-3 py-2 border rounded-md w-72 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setIsSearchOpen(false)
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              
              <SearchResults
                query={searchQuery}
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1">
            <Link href="/login">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <User className="h-4 w-4" />
            </Button>
            </Link>
            
            <CartIcon />

            {/* Mobile Menu */}
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden h-8 w-8 p-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-t bg-muted/30">
          <div className="flex items-center justify-between py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center space-x-1"
            >
              <span className="text-sm font-medium">Categories</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            <div className="hidden sm:flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="font-bold">Free Shipping on orders over ₹5,000</span>
              <span>•</span>
              <span className="font-bold">30-Day Returns</span>
            </div>
          </div>

          {/* Collapsible Categories */}
          {isCategoriesOpen && (
            <div className="border-t bg-background py-3">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {categories.slice(0, 8).map((category) => (
                  <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <Link
                      href={`/products/${category.id}`}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-accent transition-colors"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </Link>
                    
                    {/* Brand Dropdown */}
                    {hoveredCategory === category.id && categoryBrands[category.id as keyof typeof categoryBrands] && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg z-50">
                        <div className="p-3">
                          <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                            Popular Brands
                          </h4>
                          <div className="grid grid-cols-2 gap-1">
                            {categoryBrands[category.id as keyof typeof categoryBrands].map((brand) => (
                              <Link
                                key={brand}
                                href={`/products/${category.id}?brand=${brand.toLowerCase()}`}
                                className="text-xs p-1 rounded hover:bg-accent transition-colors"
                              >
                                {brand}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background py-4">
            <div className="space-y-2">
              <Link href="/products" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/pc-builder" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                PC Builder
              </Link>
              <Link href="/prebuilt" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Pre-built PCs
              </Link>
              <Link href="/deals" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Deals
              </Link>
              <Link href="/contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
