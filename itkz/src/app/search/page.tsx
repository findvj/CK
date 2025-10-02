import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Loading } from '@/components/ui/loading'
import SearchClient from './search-client'

function SearchFallback() {
  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <Loading size="lg" />
            <p className="mt-4 text-muted-foreground">Loading search...</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<SearchFallback />}>
        <SearchClient />
      </Suspense>
      <Footer />
    </div>
  )
}