'use client'

import { useCartStore } from '@/store/cart-store'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ClientOnly } from '@/components/providers/client-only'

function CartIconInner() {
  const items = useCartStore((state) => state.items)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <Link href="/cart">
      <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
        <ShoppingCart className="h-4 w-4" />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-bold">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  )
}

export function CartIcon() {
  return (
    <ClientOnly fallback={
      <Link href="/cart">
        <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </Link>
    }>
      <CartIconInner />
    </ClientOnly>
  )
}
