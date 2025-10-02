'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Tag, 
  Package,
  MoreHorizontal,
  Eye,
  Settings
} from 'lucide-react'

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '', icon: '' })

  // Mock categories data
  const categories = [
    {
      id: 1,
      name: 'Graphics Cards',
      description: 'High-performance graphics cards for gaming and professional work',
      icon: '🎮',
      productCount: 25,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Processors',
      description: 'CPU processors for all computing needs',
      icon: '⚡',
      productCount: 18,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-14'
    },
    {
      id: 3,
      name: 'Memory',
      description: 'RAM modules for enhanced system performance',
      icon: '💾',
      productCount: 32,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-13'
    },
    {
      id: 4,
      name: 'Storage',
      description: 'SSDs and HDDs for data storage',
      icon: '💿',
      productCount: 28,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-12'
    },
    {
      id: 5,
      name: 'Power Supplies',
      description: 'PSU units for reliable power delivery',
      icon: '🔌',
      productCount: 15,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-11'
    },
    {
      id: 6,
      name: 'Motherboards',
      description: 'Mainboards for system connectivity',
      icon: '🔧',
      productCount: 22,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10'
    },
    {
      id: 7,
      name: 'Cooling',
      description: 'CPU coolers and case fans',
      icon: '❄️',
      productCount: 19,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-09'
    },
    {
      id: 8,
      name: 'Cases',
      description: 'PC cases and enclosures',
      icon: '📦',
      productCount: 12,
      status: 'inactive',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-08'
    }
  ]

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      // TODO: Add category to API
      console.log('Adding category:', newCategory)
      setNewCategory({ name: '', description: '', icon: '' })
      setIsAddingCategory(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
              <p className="text-gray-600">Organize products into categories</p>
            </div>
            <Button onClick={() => setIsAddingCategory(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Add Category Modal */}
        {isAddingCategory && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category Name *</label>
                  <Input
                    placeholder="Enter category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Icon</label>
                  <Input
                    placeholder="🎮"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="active"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Enter category description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCategory}>
                  Add Category
                </Button>
                <Button variant="outline" onClick={() => setIsAddingCategory(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge className={getStatusColor(category.status)}>
                        {category.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Products:</span>
                    <span className="font-medium">{category.productCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Created:</span>
                    <span className="font-medium">{category.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Updated:</span>
                    <span className="font-medium">{category.updatedAt}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first category'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsAddingCategory(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
