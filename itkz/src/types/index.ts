export interface Product {
  id: string
  name: string
  description: string
  price: number
  mrp?: number
  discount?: number
  badge?: string
  image: string
  images?: string[]
  videos?: string[]
  detailedDescription?: string
  category: ProductCategory
  brand: string
  specifications: Record<string, string>
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  compatibility?: CompatibilityInfo
}

export interface CompatibilityInfo {
  socket?: string
  formFactor?: string
  memoryType?: string
  powerRequirement?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
}

export type ProductCategory = 
  | 'cpu'
  | 'gpu'
  | 'motherboard'
  | 'ram'
  | 'storage'
  | 'psu'
  | 'case'
  | 'cooling'
  | 'accessories'
  | 'prebuilt'

export interface CartItem {
  product: Product
  quantity: number
}

export interface PCBuild {
  id: string
  name: string
  components: {
    cpu?: Product
    gpu?: Product
    motherboard?: Product
    ram?: Product
    storage?: Product
    psu?: Product
    case?: Product
    cooling?: Product
  }
  totalPrice: number
  compatibility: boolean
  warnings: string[]
}

export interface User {
  id: string
  email: string
  name: string
  builds: PCBuild[]
}
