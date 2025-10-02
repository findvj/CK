'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  Filter,
  MoreHorizontal
} from 'lucide-react'
import Link from 'next/link'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'NVIDIA RTX 4080 Graphics Card',
      category: 'GPU',
      price: 125000,
      mrp: 150000,
      discount: 17,
      badge: 'hot',
      stock: 15,
      status: 'active',
      image: '/placeholder-gpu.jpg',
      sku: 'GPU-RTX4080-001',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'Intel Core i7-13700K Processor',
      category: 'CPU',
      price: 45000,
      mrp: 50000,
      discount: 10,
      badge: 'best-deal',
      stock: 8,
      status: 'active',
      image: '/placeholder-cpu.jpg',
      sku: 'CPU-I7-13700K-001',
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      name: '32GB DDR5 RAM Kit (2x16GB)',
      category: 'RAM',
      price: 18000,
      mrp: 20000,
      discount: 10,
      badge: 'new',
      stock: 0,
      status: 'out_of_stock',
      image: '/placeholder-ram.jpg',
      sku: 'RAM-DDR5-32GB-001',
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      name: '1TB NVMe SSD',
      category: 'Storage',
      price: 12000,
      mrp: 15000,
      discount: 20,
      badge: 'sale',
      stock: 25,
      status: 'active',
      image: '/placeholder-ssd.jpg',
      sku: 'SSD-NVME-1TB-001',
      createdAt: '2024-01-03'
    },
    {
      id: 5,
      name: '850W 80+ Gold Power Supply',
      category: 'PSU',
      price: 15000,
      mrp: 18000,
      discount: 17,
      badge: 'trending',
      stock: 12,
      status: 'active',
      image: '/placeholder-psu.jpg',
      sku: 'PSU-850W-GOLD-001',
      createdAt: '2024-01-01'
    }
  ]

  const categories = ['all', 'GPU', 'CPU', 'RAM', 'Storage', 'PSU', 'Motherboard', 'Cooling']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'out_of_stock': return 'bg-red-100 text-red-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'text-red-600'
    if (stock < 10) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'new': return 'bg-green-100 text-green-800'
      case 'sale': return 'bg-red-100 text-red-800'
      case 'best-deal': return 'bg-blue-100 text-blue-800'
      case 'hot': return 'bg-orange-100 text-orange-800'
      case 'limited': return 'bg-purple-100 text-purple-800'
      case 'trending': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case 'new': return 'New'
      case 'sale': return 'Sale'
      case 'best-deal': return 'Best Deal'
      case 'hot': return 'Hot'
      case 'limited': return 'Limited'
      case 'trending': return 'Trending'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600">Manage your product inventory and catalog</p>
            </div>
            <Link href="/admin/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Products ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Product</th>
                    <th className="text-left p-4 font-medium">SKU</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">Pricing</th>
                    <th className="text-left p-4 font-medium">Badge</th>
                    <th className="text-left p-4 font-medium">Stock</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">Added {product.createdAt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {product.sku}
                        </code>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="font-medium">₹{product.price.toLocaleString()}</div>
                          {product.mrp && product.mrp > product.price && (
                            <div className="text-sm text-muted-foreground line-through">
                              MRP: ₹{product.mrp.toLocaleString()}
                            </div>
                          )}
                          {product.discount && product.discount > 0 && (
                            <div className="text-xs text-green-600 font-medium">
                              {product.discount}% OFF
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {product.badge ? (
                          <Badge className={getBadgeColor(product.badge)}>
                            {getBadgeText(product.badge)}
                          </Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">No badge</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${getStockColor(product.stock)}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(product.status)}>
                          {product.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
