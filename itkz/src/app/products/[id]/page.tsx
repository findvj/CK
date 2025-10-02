import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { products } from '@/data/products'
import ProductDetailClient from './product-detail-client'

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ProductDetailClient />
      <Footer />
    </div>
  )
}