'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  RotateCcw, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Package,
  Phone,
  Mail,
  FileText,
  Truck,
  CreditCard,
  RefreshCw
} from 'lucide-react'

export default function ReturnsPage() {
  const [returnForm, setReturnForm] = useState({
    orderId: '',
    reason: '',
    description: '',
    contactEmail: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReturnForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle return request submission
    alert('Return request submitted successfully! We will contact you within 24 hours.')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-r from-primary/5 to-accent">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Returns & Warranty</h1>
              <p className="text-muted-foreground">
                Easy returns and comprehensive warranty coverage
              </p>
            </div>
          </div>
        </section>

        {/* Return Request Form & Policy */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Return Request Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <RotateCcw className="h-5 w-5" />
                      Request a Return
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="orderId">Order ID *</Label>
                        <Input
                          id="orderId"
                          name="orderId"
                          value={returnForm.orderId}
                          onChange={handleInputChange}
                          placeholder="Enter your order ID"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reason">Return Reason *</Label>
                        <select
                          id="reason"
                          name="reason"
                          value={returnForm.reason}
                          onChange={(e) => setReturnForm(prev => ({ ...prev, reason: e.target.value }))}
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          required
                        >
                          <option value="">Select a reason</option>
                          <option value="defective">Product is defective</option>
                          <option value="wrong_item">Wrong item received</option>
                          <option value="damaged">Item damaged during shipping</option>
                          <option value="not_as_described">Product not as described</option>
                          <option value="changed_mind">Changed mind</option>
                          <option value="incompatible">Product incompatible</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={returnForm.description}
                          onChange={handleInputChange}
                          placeholder="Please describe the issue in detail..."
                          rows={4}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email *</Label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={returnForm.contactEmail}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Submit Return Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Return Policy */}
                <div className="space-y-6">
                  {/* Return Conditions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Return Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">30-Day Return Window</p>
                          <p className="text-sm text-muted-foreground">Returns accepted within 30 days of delivery</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Original Packaging</p>
                          <p className="text-sm text-muted-foreground">Items must be in original packaging with all accessories</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">No Physical Damage</p>
                          <p className="text-sm text-muted-foreground">Products should not show signs of physical damage</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Proof of Purchase</p>
                          <p className="text-sm text-muted-foreground">Valid order ID or receipt required</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Return Process */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-blue-500" />
                        Return Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                        <div>
                          <p className="font-medium">Submit Return Request</p>
                          <p className="text-sm text-muted-foreground">Fill out the return form</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                        <div>
                          <p className="font-medium">Get Approval</p>
                          <p className="text-sm text-muted-foreground">We'll review and approve within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                        <div>
                          <p className="font-medium">Package & Ship</p>
                          <p className="text-sm text-muted-foreground">Pack items securely and ship to our address</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                        <div>
                          <p className="font-medium">Receive Refund</p>
                          <p className="text-sm text-muted-foreground">Refund processed within 5-7 business days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty Information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Warranty Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Manufacturer Warranty */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      Manufacturer Warranty
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">CPU & GPU</p>
                      <p className="text-sm text-muted-foreground">3 years manufacturer warranty</p>
                    </div>
                    <div>
                      <p className="font-medium">Motherboard & RAM</p>
                      <p className="text-sm text-muted-foreground">3 years manufacturer warranty</p>
                    </div>
                    <div>
                      <p className="font-medium">Storage & PSU</p>
                      <p className="text-sm text-muted-foreground">5 years manufacturer warranty</p>
                    </div>
                    <div>
                      <p className="font-medium">Accessories</p>
                      <p className="text-sm text-muted-foreground">1-2 years manufacturer warranty</p>
                    </div>
                  </CardContent>
                </Card>

                {/* IT khzana Warranty */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-500" />
                      IT khzana Warranty
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">Assembly Warranty</p>
                      <p className="text-sm text-muted-foreground">1 year on PC assembly</p>
                    </div>
                    <div>
                      <p className="font-medium">Software Support</p>
                      <p className="text-sm text-muted-foreground">6 months free software support</p>
                    </div>
                    <div>
                      <p className="font-medium">Technical Support</p>
                      <p className="text-sm text-muted-foreground">Lifetime technical assistance</p>
                    </div>
                    <div>
                      <p className="font-medium">Replacement Policy</p>
                      <p className="text-sm text-muted-foreground">Direct replacement for defective items</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Warranty Claims */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-orange-500" />
                      Warranty Claims
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">Claim Process</p>
                      <p className="text-sm text-muted-foreground">Contact us with order details</p>
                    </div>
                    <div>
                      <p className="font-medium">Documentation</p>
                      <p className="text-sm text-muted-foreground">Photos/videos of the issue required</p>
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                    <div>
                      <p className="font-medium">Resolution</p>
                      <p className="text-sm text-muted-foreground">Repair, replace, or refund</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* What's Covered */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      What's Covered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Manufacturing defects</li>
                      <li>• Hardware failures</li>
                      <li>• Compatibility issues</li>
                      <li>• Shipping damage</li>
                      <li>• Wrong items received</li>
                      <li>• Performance issues</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* What's Not Covered */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      What's Not Covered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Physical damage from misuse</li>
                      <li>• Water damage</li>
                      <li>• Overclocking damage</li>
                      <li>• Software issues</li>
                      <li>• Normal wear and tear</li>
                      <li>• Cosmetic damage</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Need Help with Returns or Warranty?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-muted-foreground">+91 7977186317</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">support@itkhzana.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">Mon-Sat, 10 AM - 7 PM</p>
                      </div>
                    </div>
                  </div>
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
