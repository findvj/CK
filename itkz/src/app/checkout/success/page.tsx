'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Package, ArrowRight, Home, ShoppingBag } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
              <p className="text-lg text-gray-600">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </div>

            {/* Order Details Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order Number</p>
                    <p className="font-medium">#ORD-{Date.now().toString().slice(-6)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Order Date</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment Status</p>
                    <p className="font-medium text-green-600">Paid</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Estimated Delivery</p>
                    <p className="font-medium">3-5 business days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-sm text-gray-600">You'll receive an email confirmation shortly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Order Processing</p>
                      <p className="text-sm text-gray-600">We'll prepare your items for shipment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Shipping & Tracking</p>
                      <p className="text-sm text-gray-600">You'll get tracking information once shipped</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium">Delivery</p>
                      <p className="text-sm text-gray-600">Your order will arrive at your doorstep</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="w-full sm:w-auto">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Package className="h-4 w-4 mr-2" />
                  View Order Details
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Support Information */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@itkhzana.com" className="text-primary hover:underline">
                  support@itkhzana.com
                </a>{' '}
                or call{' '}
                <a href="tel:+919876543210" className="text-primary hover:underline">
                  +91 98765 43210
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
