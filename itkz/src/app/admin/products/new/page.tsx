'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft, 
  Save, 
  Upload,
  Package,
  DollarSign,
  Hash,
  Tag,
  Image as ImageIcon,
  Table,
  Video,
  Bold,
  Italic,
  List,
  Link as LinkIcon
} from 'lucide-react'
import { Loading, PageLoading } from '@/components/ui/loading'
import Link from 'next/link'

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mrp: '',
    discount: '',
    sku: '',
    category: '',
    brand: '',
    stock: '',
    status: 'active',
    badge: '',
    specifications: '',
    features: '',
    detailedDescription: '',
    images: [] as string[],
    videos: [] as string[]
  })

  const categories = [
    'GPU', 'CPU', 'RAM', 'Storage', 'PSU', 'Motherboard', 
    'Cooling', 'Case', 'Monitor', 'Accessories', 'Peripherals'
  ]

  const brands = [
    'NVIDIA', 'AMD', 'Intel', 'ASUS', 'MSI', 'Gigabyte', 
    'Corsair', 'Samsung', 'WD', 'Seagate', 'Cooler Master'
  ]

  const badgeOptions = [
    { value: '', label: 'No Badge' },
    { value: 'new', label: 'New' },
    { value: 'sale', label: 'Sale' },
    { value: 'best-deal', label: 'Best Deal' },
    { value: 'hot', label: 'Hot Product' },
    { value: 'limited', label: 'Limited Edition' },
    { value: 'trending', label: 'Trending' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let newFormData = { ...formData, [name]: value }

    // Auto-calculate discount when MRP or selling price changes
    if (name === 'mrp' || name === 'price') {
      const mrp = parseFloat(name === 'mrp' ? value : formData.mrp)
      const sellingPrice = parseFloat(name === 'price' ? value : formData.price)
      
      if (mrp > 0 && sellingPrice > 0 && mrp > sellingPrice) {
        const discount = Math.round(((mrp - sellingPrice) / mrp) * 100)
        newFormData.discount = discount.toString()
      } else if (mrp > 0 && sellingPrice > 0 && mrp <= sellingPrice) {
        newFormData.discount = '0'
      }
    }

    setFormData(newFormData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Placeholder: simulate product creation
      await new Promise(resolve => setTimeout(resolve, 1000))
      // TODO: Integrate with real API
      router.push('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <PageLoading text="Creating product..." />}
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600">Create a new product for your store</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="e.g., GPU-RTX4080-001"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <select
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing and Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mrp">MRP (₹) *</Label>
                  <Input
                    id="mrp"
                    name="mrp"
                    type="number"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Selling Price (₹) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      value={formData.discount}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      max="100"
                      step="1"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const mrp = parseFloat(formData.mrp)
                        const sellingPrice = parseFloat(formData.price)
                        if (mrp > 0 && sellingPrice > 0 && mrp > sellingPrice) {
                          const discount = Math.round(((mrp - sellingPrice) / mrp) * 100)
                          setFormData(prev => ({ ...prev, discount: discount.toString() }))
                        }
                      }}
                    >
                      Auto
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Auto-calculated when MRP and selling price are entered
                  </p>
                  {formData.mrp && formData.price && formData.discount && (
                    <div className="text-xs text-green-600 font-medium">
                      You save: ₹{(parseFloat(formData.mrp) - parseFloat(formData.price)).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge">Product Badge</Label>
                  <select
                    id="badge"
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {badgeOptions.map(badge => (
                      <option key={badge.value} value={badge.value}>{badge.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specifications">Specifications</Label>
                <Textarea
                  id="specifications"
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleInputChange}
                  placeholder="Enter technical specifications (one per line)"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Key Features</Label>
                <Textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="Enter key features (one per line)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload product images</p>
                  <p className="text-sm text-gray-500 mb-4">Drag and drop images here, or click to select</p>
                  <Button type="button" variant="outline">
                    Choose Images
                  </Button>
                </div>
                
                {/* Image Gallery Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                        <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index)
                            }))
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Rich Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Detailed Description & Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="detailedDescription">Rich Content Description</Label>
                <div className="border rounded-lg">
                  {/* Toolbar */}
                  <div className="border-b p-2 flex items-center gap-1">
                    <Button type="button" variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    <Button type="button" variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    <Button type="button" variant="ghost" size="sm">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                      <Table className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Rich Content Editor */}
                  <div
                    contentEditable
                    id="detailedDescription"
                    className="min-h-[200px] p-3 border-0 resize-none focus:outline-none focus:ring-0"
                    style={{ minHeight: '200px' }}
                    onInput={(e) => {
                      const content = e.currentTarget.innerHTML
                      setFormData(prev => ({ ...prev, detailedDescription: content }))
                    }}
                    onPaste={(e) => {
                      // Allow rich content pasting
                      e.preventDefault()
                      const clipboardData = e.clipboardData
                      const htmlData = clipboardData.getData('text/html')
                      const textData = clipboardData.getData('text/plain')
                      
                      if (htmlData) {
                        // Paste HTML content (tables, images, etc.)
                        document.execCommand('insertHTML', false, htmlData)
                      } else {
                        // Paste plain text
                        document.execCommand('insertText', false, textData)
                      }
                    }}
                    dangerouslySetInnerHTML={{ __html: formData.detailedDescription }}
                    suppressContentEditableWarning={true}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports HTML, images, tables, and videos. You can paste rich content directly here.
                </p>
              </div>

              {/* Video URLs */}
              <div className="space-y-2">
                <Label>Product Videos (YouTube/Vimeo URLs)</Label>
                <div className="space-y-2">
                  {formData.videos.map((video, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={video}
                        onChange={(e) => {
                          const newVideos = [...formData.videos]
                          newVideos[index] = e.target.value
                          setFormData(prev => ({ ...prev, videos: newVideos }))
                        }}
                        placeholder="https://youtube.com/watch?v=..."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            videos: prev.videos.filter((_, i) => i !== index)
                          }))
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        videos: [...prev.videos, '']
                      }))
                    }}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href="/admin/products">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loading size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
