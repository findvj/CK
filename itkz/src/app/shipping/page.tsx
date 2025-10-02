'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Search,
  Phone,
  Mail,
  Info
} from 'lucide-react'

// Mock tracking data
const mockTrackingData = {
  'ORD001': {
    orderId: 'ORD001',
    status: 'delivered',
    estimatedDelivery: '2024-01-15',
    actualDelivery: '2024-01-14',
    trackingNumber: 'TRK123456789',
    carrier: 'Blue Dart',
    items: ['Gaming PC Build', 'RGB Keyboard', 'Gaming Mouse'],
    timeline: [
      { status: 'Order Placed', date: '2024-01-10', time: '10:30 AM', completed: true },
      { status: 'Processing', date: '2024-01-10', time: '2:15 PM', completed: true },
      { status: 'Shipped', date: '2024-01-11', time: '9:45 AM', completed: true },
      { status: 'In Transit', date: '2024-01-12', time: '11:20 AM', completed: true },
      { status: 'Out for Delivery', date: '2024-01-14', time: '8:30 AM', completed: true },
      { status: 'Delivered', date: '2024-01-14', time: '3:45 PM', completed: true }
    ]
  },
  'ORD002': {
    orderId: 'ORD002',
    status: 'in_transit',
    estimatedDelivery: '2024-01-20',
    actualDelivery: null,
    trackingNumber: 'TRK987654321',
    carrier: 'DTDC',
    items: ['RTX 4090 GPU', '32GB RAM Kit'],
    timeline: [
      { status: 'Order Placed', date: '2024-01-16', time: '3:20 PM', completed: true },
      { status: 'Processing', date: '2024-01-16', time: '5:45 PM', completed: true },
      { status: 'Shipped', date: '2024-01-17', time: '10:15 AM', completed: true },
      { status: 'In Transit', date: '2024-01-18', time: '2:30 PM', completed: true },
      { status: 'Out for Delivery', date: '', time: '', completed: false },
      { status: 'Delivered', date: '', time: '', completed: false }
    ]
  }
}

export default function ShippingPage() {
  const [orderId, setOrderId] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const data = mockTrackingData[orderId.toUpperCase()]
    if (data) {
      setTrackingData(data)
    } else {
      setError('Order not found. Please check your order ID.')
    }
    
    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500'
      case 'in_transit': return 'bg-blue-500'
      case 'processing': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered'
      case 'in_transit': return 'In Transit'
      case 'processing': return 'Processing'
      default: return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-r from-primary/5 to-accent">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Shipping & Tracking</h1>
              <p className="text-muted-foreground">
                Track your order and get shipping information
              </p>
            </div>
          </div>
        </section>

        {/* Tracking Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Track Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTrackOrder} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderId">Order ID</Label>
                      <Input
                        id="orderId"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter your order ID (e.g., ORD001)"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Tracking...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Track Order
                        </>
                      )}
                    </Button>
                  </form>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tracking Results */}
            {trackingData && (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Order Summary</span>
                      <Badge className={`${getStatusColor(trackingData.status)} text-white`}>
                        {getStatusText(trackingData.status)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order ID</p>
                        <p className="font-medium">{trackingData.orderId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tracking Number</p>
                        <p className="font-medium">{trackingData.trackingNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Carrier</p>
                        <p className="font-medium">{trackingData.carrier}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                        <p className="font-medium">{trackingData.estimatedDelivery}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Items</p>
                      <ul className="space-y-1">
                        {trackingData.items.map((item, index) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Tracking Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Tracking Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingData.timeline.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : (
                              <Clock className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${step.completed ? 'text-green-600' : 'text-gray-500'}`}>
                              {step.status}
                            </p>
                            {step.date && (
                              <p className="text-sm text-muted-foreground">
                                {step.date} at {step.time}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* Shipping Information */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Shipping Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-muted-foreground">5-7 business days</p>
                      <p className="text-sm text-muted-foreground">Free on orders over ₹5,000</p>
                    </div>
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-muted-foreground">2-3 business days</p>
                      <p className="text-sm text-muted-foreground">₹299</p>
                    </div>
                    <div>
                      <p className="font-medium">Same Day Delivery</p>
                      <p className="text-sm text-muted-foreground">Mumbai only</p>
                      <p className="text-sm text-muted-foreground">₹499</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Areas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Delivery Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">Metro Cities</p>
                      <p className="text-sm text-muted-foreground">Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune</p>
                    </div>
                    <div>
                      <p className="font-medium">Tier 2 Cities</p>
                      <p className="text-sm text-muted-foreground">Ahmedabad, Kolkata, Jaipur, Lucknow, Indore</p>
                    </div>
                    <div>
                      <p className="font-medium">Remote Areas</p>
                      <p className="text-sm text-muted-foreground">Additional charges may apply</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Support */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Need Help?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">+91 7977186317</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">support@itkhzana.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Mon-Sat, 10 AM - 7 PM</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Important Notes */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Important Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• All orders are processed within 1-2 business days</li>
                    <li>• Tracking information will be sent via SMS and email</li>
                    <li>• Delivery attempts will be made during business hours</li>
                    <li>• Someone must be available to receive the package</li>
                    <li>• For high-value items, ID verification may be required</li>
                    <li>• Damaged packages should be refused at delivery</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
