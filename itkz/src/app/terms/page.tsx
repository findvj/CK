import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Scale, AlertTriangle, Shield, CreditCard, Truck, RotateCcw } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-r from-primary/5 to-accent">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
              <p className="text-muted-foreground">
                Please read these terms carefully before using our services.
              </p>
            </div>
          </div>
        </section>

        {/* Terms of Service Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Last Updated */}
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>Last Updated:</strong> January 1, 2024
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    These Terms of Service ("Terms") govern your use of IT khzana's website and services. By accessing or using our services, you agree to be bound by these Terms.
                  </p>
                </CardContent>
              </Card>

              {/* Acceptance of Terms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    By accessing, browsing, or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
                  </p>
                </CardContent>
              </Card>

              {/* Description of Service */}
              <Card>
                <CardHeader>
                  <CardTitle>Description of Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    IT khzana provides the following services:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Sale of computer hardware and components</li>
                    <li>Custom PC building and assembly services</li>
                    <li>Technical support and consultation</li>
                    <li>Warranty and repair services</li>
                    <li>Online platform for product browsing and ordering</li>
                  </ul>
                </CardContent>
              </Card>

              {/* User Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle>User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Account Creation</h3>
                    <p className="text-sm text-muted-foreground">
                      You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Account Information</h3>
                    <p className="text-sm text-muted-foreground">
                      You agree to provide accurate, current, and complete information when creating your account and to update such information to keep it accurate, current, and complete.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Account Security</h3>
                    <p className="text-sm text-muted-foreground">
                      You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Orders and Payment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Orders and Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Order Acceptance</h3>
                    <p className="text-sm text-muted-foreground">
                      All orders are subject to acceptance by IT khzana. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, pricing errors, or suspected fraud.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Pricing and Payment</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>All prices are subject to change without notice</li>
                      <li>Payment is due at the time of order placement</li>
                      <li>We accept major credit cards, UPI, and other approved payment methods</li>
                      <li>All payments are processed securely through third-party payment processors</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Order Modifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Order modifications may be possible before shipment. Contact our customer service team to request changes. We cannot guarantee that modifications can be accommodated.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping and Delivery */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping and Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Terms</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Shipping costs and delivery times vary by location and service level</li>
                      <li>Risk of loss and title pass to you upon delivery</li>
                      <li>You are responsible for providing accurate shipping information</li>
                      <li>Delivery attempts will be made during business hours</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Issues</h3>
                    <p className="text-sm text-muted-foreground">
                      If you experience delivery issues, contact us immediately. We will work with you and the shipping carrier to resolve the matter.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">International Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      International shipping may be subject to customs duties, taxes, and other fees. These are the responsibility of the recipient.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Returns and Refunds */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RotateCcw className="h-5 w-5" />
                    Returns and Refunds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Return Policy</h3>
                    <p className="text-sm text-muted-foreground">
                      Returns are subject to our Return Policy, which is incorporated into these Terms by reference. Please review our Return Policy for detailed information about return eligibility, procedures, and timelines.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Refund Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Refunds will be processed to the original payment method within 5-7 business days after we receive and inspect returned items.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Non-Returnable Items</h3>
                    <p className="text-sm text-muted-foreground">
                      Certain items may not be eligible for return, including customized products, software licenses, and items damaged by misuse.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Warranty and Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Warranty and Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Product Warranty</h3>
                    <p className="text-sm text-muted-foreground">
                      Products are covered by manufacturer warranties as specified in product descriptions. We also provide additional warranty coverage for assembly and support services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Technical Support</h3>
                    <p className="text-sm text-muted-foreground">
                      We provide technical support for products and services we sell. Support availability and scope are subject to the terms of the specific warranty or service agreement.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Warranty Claims</h3>
                    <p className="text-sm text-muted-foreground">
                      Warranty claims must be submitted according to the procedures outlined in our Warranty Policy. We reserve the right to inspect products and determine warranty eligibility.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Prohibited Uses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Prohibited Uses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our services. Prohibited uses include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Violating any applicable laws or regulations</li>
                    <li>Infringing on intellectual property rights</li>
                    <li>Transmitting harmful or malicious code</li>
                    <li>Attempting to gain unauthorized access to our systems</li>
                    <li>Interfering with the proper functioning of our services</li>
                    <li>Using our services for commercial purposes without permission</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Intellectual Property */}
              <Card>
                <CardHeader>
                  <CardTitle>Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Our Content</h3>
                    <p className="text-sm text-muted-foreground">
                      All content on our website, including text, graphics, logos, images, and software, is the property of IT khzana or its licensors and is protected by copyright and other intellectual property laws.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">User Content</h3>
                    <p className="text-sm text-muted-foreground">
                      You retain ownership of any content you submit to us, but you grant us a license to use, modify, and display such content in connection with our services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Trademarks</h3>
                    <p className="text-sm text-muted-foreground">
                      All trademarks, service marks, and trade names used on our website are the property of their respective owners.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Disclaimer of Warranties</h3>
                    <p className="text-sm text-muted-foreground">
                      Our services are provided "as is" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Limitation of Damages</h3>
                    <p className="text-sm text-muted-foreground">
                      In no event shall IT khzana be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Maximum Liability</h3>
                    <p className="text-sm text-muted-foreground">
                      Our total liability to you for any claims arising out of or relating to these Terms or our services shall not exceed the amount you paid us for the specific product or service giving rise to the claim.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Indemnification */}
              <Card>
                <CardHeader>
                  <CardTitle>Indemnification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You agree to indemnify and hold harmless IT khzana, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising out of or relating to your use of our services, violation of these Terms, or infringement of any rights of another party.
                  </p>
                </CardContent>
              </Card>

              {/* Termination */}
              <Card>
                <CardHeader>
                  <CardTitle>Termination</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Termination by You</h3>
                    <p className="text-sm text-muted-foreground">
                      You may terminate your account at any time by contacting us or using the account deletion features on our website.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Termination by Us</h3>
                    <p className="text-sm text-muted-foreground">
                      We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including if you breach these Terms.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Effect of Termination</h3>
                    <p className="text-sm text-muted-foreground">
                      Upon termination, your right to use our services will cease immediately. Provisions of these Terms that by their nature should survive termination shall survive.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card>
                <CardHeader>
                  <CardTitle>Governing Law and Dispute Resolution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Governing Law</h3>
                    <p className="text-sm text-muted-foreground">
                      These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                    <p className="text-sm text-muted-foreground">
                      Any disputes arising out of or relating to these Terms or our services shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 2015.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Jurisdiction</h3>
                    <p className="text-sm text-muted-foreground">
                      Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the courts of Mumbai, India.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Changes to Terms */}
              <Card>
                <CardHeader>
                  <CardTitle>Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes acceptance of the updated Terms.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>Email: legal@itkhzana.com</div>
                    <div>Phone: +91 7977186317</div>
                    <div>Address: 2nd Floor, Patel Mansion, Topiwala Lane, Lamington Road, Grant Road (E), Mumbai - 400069</div>
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
