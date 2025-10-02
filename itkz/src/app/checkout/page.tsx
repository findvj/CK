'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Lock,
  ShoppingCart,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import { Loading, PageLoading } from '@/components/ui/loading'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [checkoutType, setCheckoutType] = useState<'login' | 'guest'>('login')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Guest checkout form state
  const [guestData, setGuestData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: '',
    fullAddress: '',
    pincode: '',
    state: '',
    landmark: '',
    alternatePhone: ''
  })

  // Payment and order state
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderNotes, setOrderNotes] = useState('')

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    if (!loginData.email || !loginData.password) {
      setErrors({ general: 'Please enter both email and password.' })
      return
    }

    setIsProcessing(true)
    try {
      // TODO: Implement login API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Redirect to payment/confirmation
      router.push('/checkout/success')
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const requiredFields = ['fullName', 'email', 'mobileNumber', 'city', 'fullAddress', 'pincode', 'state']
    const newErrors: Record<string, string> = {}

    requiredFields.forEach(field => {
      if (!guestData[field as keyof typeof guestData]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      }
    })

    // Email validation
    if (guestData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Mobile validation
    if (guestData.mobileNumber && !/^[6-9]\d{9}$/.test(guestData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number'
    }

    // Pincode validation
    if (guestData.pincode && !/^\d{6}$/.test(guestData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsProcessing(true)
    try {
      // TODO: Implement guest checkout API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      clearCart()
      router.push('/checkout/success')
    } catch (error) {
      setErrors({ general: 'Checkout failed. Please try again.' })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (checkoutType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }))
    } else {
      setGuestData(prev => ({ ...prev, [name]: value }))
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-4">
              Add some items to your cart before checkout.
            </p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {isProcessing && <PageLoading text="Processing your order..." />}
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Link href="/cart">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Cart
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Checkout</h1>
                <p className="text-muted-foreground">Complete your order</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <div className="space-y-6">
                {/* Checkout Type Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Checkout Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={checkoutType === 'login' ? 'default' : 'outline'}
                        onClick={() => setCheckoutType('login')}
                        className="h-20 flex flex-col items-center justify-center"
                      >
                        <User className="h-6 w-6 mb-2" />
                        <span>Login & Checkout</span>
                      </Button>
                      <Button
                        variant={checkoutType === 'guest' ? 'default' : 'outline'}
                        onClick={() => setCheckoutType('guest')}
                        className="h-20 flex flex-col items-center justify-center"
                      >
                        <ShoppingCart className="h-6 w-6 mb-2" />
                        <span>Guest Checkout</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Login Form */}
                {checkoutType === 'login' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Login to Continue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        {errors.general && (
                          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {errors.general}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={loginData.email}
                              onChange={handleInputChange}
                              className="pl-9"
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={loginData.password}
                              onChange={handleInputChange}
                              className="pl-9"
                              placeholder="Enter your password"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Link href="/login" className="text-sm text-primary hover:underline">
                            Don't have an account? Sign up
                          </Link>
                          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>

                        <Button type="submit" className="w-full" disabled={isProcessing}>
                          {isProcessing ? (
                            <>
                              <Loading size="sm" className="mr-2" />
                              Logging in...
                            </>
                          ) : (
                            'Login & Continue'
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Guest Checkout Form */}
                {checkoutType === 'guest' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Guest Checkout Details</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Please provide your details to complete the order
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleGuestSubmit} className="space-y-4">
                        {errors.general && (
                          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {errors.general}
                          </div>
                        )}

                        {/* Personal Information */}
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Personal Information</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Full Name *</Label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="fullName"
                                  name="fullName"
                                  value={guestData.fullName}
                                  onChange={handleInputChange}
                                  className="pl-9"
                                  placeholder="Enter your full name"
                                  required
                                />
                              </div>
                              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address *</Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={guestData.email}
                                  onChange={handleInputChange}
                                  className="pl-9"
                                  placeholder="Enter your email"
                                  required
                                />
                              </div>
                              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="mobileNumber">Mobile Number *</Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="mobileNumber"
                                  name="mobileNumber"
                                  type="tel"
                                  value={guestData.mobileNumber}
                                  onChange={handleInputChange}
                                  className="pl-9"
                                  placeholder="Enter 10-digit mobile number"
                                  required
                                />
                              </div>
                              {errors.mobileNumber && <p className="text-sm text-red-600">{errors.mobileNumber}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="alternatePhone"
                                  name="alternatePhone"
                                  type="tel"
                                  value={guestData.alternatePhone}
                                  onChange={handleInputChange}
                                  className="pl-9"
                                  placeholder="Alternate contact number"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address Information */}
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Delivery Address</h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="fullAddress">Full Address *</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Textarea
                                id="fullAddress"
                                name="fullAddress"
                                value={guestData.fullAddress}
                                onChange={handleInputChange}
                                className="pl-9"
                                placeholder="Enter your complete address"
                                rows={3}
                                required
                              />
                            </div>
                            {errors.fullAddress && <p className="text-sm text-red-600">{errors.fullAddress}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City *</Label>
                              <Input
                                id="city"
                                name="city"
                                value={guestData.city}
                                onChange={handleInputChange}
                                placeholder="Enter city"
                                required
                              />
                              {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="state">State *</Label>
                              <Input
                                id="state"
                                name="state"
                                value={guestData.state}
                                onChange={handleInputChange}
                                placeholder="Enter state"
                                required
                              />
                              {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="pincode">Pincode *</Label>
                              <Input
                                id="pincode"
                                name="pincode"
                                value={guestData.pincode}
                                onChange={handleInputChange}
                                placeholder="Enter 6-digit pincode"
                                required
                              />
                              {errors.pincode && <p className="text-sm text-red-600">{errors.pincode}</p>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="landmark">Landmark (Optional)</Label>
                            <Input
                              id="landmark"
                              name="landmark"
                              value={guestData.landmark}
                              onChange={handleInputChange}
                              placeholder="Nearby landmark for easy delivery"
                            />
                          </div>
                        </div>

                        {/* Order Notes */}
                        <div className="space-y-2">
                          <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                          <Textarea
                            id="orderNotes"
                            name="orderNotes"
                            value={orderNotes}
                            onChange={(e) => setOrderNotes(e.target.value)}
                            placeholder="Any special instructions for delivery"
                            rows={2}
                          />
                        </div>

                        <Button type="submit" className="w-full" disabled={isProcessing}>
                          {isProcessing ? (
                            <>
                              <Loading size="sm" className="mr-2" />
                              Processing...
                            </>
                          ) : (
                            'Continue to Payment'
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.product.name}</h4>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatPrice(getTotalPrice())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>{formatPrice(getTotalPrice() * 0.18)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatPrice(getTotalPrice() * 1.18)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
