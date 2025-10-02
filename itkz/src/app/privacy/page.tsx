import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Lock, Database, Mail, Phone, MapPin } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-r from-primary/5 to-accent">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-muted-foreground">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
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
                    This Privacy Policy describes how IT khzana ("we," "our," or "us") collects, uses, and shares your personal information when you visit our website or use our services.
                  </p>
                </CardContent>
              </Card>

              {/* Information We Collect */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Name, email address, and phone number</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                      <li>Order history and preferences</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Technical Information</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Pages visited and time spent on our website</li>
                      <li>Referring website information</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Cookies and Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* How We Use Your Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Service Provision</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Process and fulfill your orders</li>
                      <li>Provide customer support and technical assistance</li>
                      <li>Send order confirmations and shipping updates</li>
                      <li>Process returns and warranty claims</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Communication</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Send promotional emails and newsletters (with your consent)</li>
                      <li>Respond to your inquiries and feedback</li>
                      <li>Notify you about important updates to our services</li>
                      <li>Send security alerts and account notifications</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Improvement and Analytics</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Analyze website usage and performance</li>
                      <li>Improve our products and services</li>
                      <li>Develop new features and functionality</li>
                      <li>Conduct market research and customer surveys</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Information Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Information Sharing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">We Do Not Sell Your Information</h3>
                    <p className="text-sm text-muted-foreground">
                      We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Service Providers</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      We may share your information with trusted third-party service providers who assist us in:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Payment processing and fraud prevention</li>
                      <li>Shipping and logistics</li>
                      <li>Customer support and communication</li>
                      <li>Website analytics and performance monitoring</li>
                      <li>Email marketing and communication</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Legal Requirements</h3>
                    <p className="text-sm text-muted-foreground">
                      We may disclose your information if required by law, court order, or to protect our rights, property, or safety, or that of our customers or others.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Security Measures</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>SSL encryption for all data transmission</li>
                      <li>Secure servers and databases</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and authentication</li>
                      <li>Employee training on data protection</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Payment Security</h3>
                    <p className="text-sm text-muted-foreground">
                      All payment information is processed securely through PCI DSS compliant payment processors. We do not store your complete payment card information on our servers.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Data Retention</h3>
                    <p className="text-sm text-muted-foreground">
                      We retain your personal information only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Rights and Choices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Access and Control</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Access and update your personal information</li>
                      <li>Request a copy of your data</li>
                      <li>Correct inaccurate information</li>
                      <li>Delete your account and associated data</li>
                      <li>Opt-out of marketing communications</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Cookie Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our website.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Data Portability</h3>
                    <p className="text-sm text-muted-foreground">
                      You have the right to receive your personal information in a structured, commonly used format and to transmit it to another service provider.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Children's Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle>Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                  </p>
                </CardContent>
              </Card>

              {/* Changes to Privacy Policy */}
              <Card>
                <CardHeader>
                  <CardTitle>Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Email: privacy@itkhzana.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone: +91 7977186317</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Address: 2nd Floor, Patel Mansion, Topiwala Lane, Lamington Road, Grant Road (E), Mumbai - 400069</span>
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
