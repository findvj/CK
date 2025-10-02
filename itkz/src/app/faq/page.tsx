'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  Package,
  Truck,
  RotateCcw,
  Shield,
  CreditCard,
  Wrench,
  HelpCircle
} from 'lucide-react'

const faqData = [
  {
    category: 'General',
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        question: 'What is IT khzana?',
        answer: 'IT khzana is your trusted source for premium PC hardware and custom-built computers. We specialize in providing high-quality components and expert guidance to help you build your dream PC.'
      },
      {
        question: 'Do you have a physical store?',
        answer: 'Yes, we have a physical store located at 2nd Floor, Patel Mansion, Topiwala Lane, Lamington Road, Grant Road (E), Mumbai - 400069. You can visit us for personalized service and expert advice.'
      },
      {
        question: 'What are your business hours?',
        answer: 'Our store is open Monday to Saturday from 10:00 AM to 7:00 PM. We are closed on Sundays and public holidays.'
      },
      {
        question: 'Do you offer technical support?',
        answer: 'Yes, we provide comprehensive technical support for all our products. Our experts are available to help with installation, troubleshooting, and optimization.'
      }
    ]
  },
  {
    category: 'Products',
    icon: <Package className="h-5 w-5" />,
    questions: [
      {
        question: 'What brands do you carry?',
        answer: 'We carry top brands including Intel, AMD, NVIDIA, ASUS, MSI, Gigabyte, Corsair, G.Skill, Samsung, WD, Seagate, and many more leading manufacturers.'
      },
      {
        question: 'Do you sell pre-built PCs?',
        answer: 'Yes, we offer a range of pre-built gaming and workstation PCs. You can also use our PC Builder tool to customize your own system with our expert guidance.'
      },
      {
        question: 'Are your products genuine?',
        answer: 'Absolutely! All our products are 100% genuine and come with manufacturer warranty. We are authorized dealers for all the brands we carry.'
      },
      {
        question: 'Do you offer product recommendations?',
        answer: 'Yes, our experts can help you choose the right components based on your budget, requirements, and intended use. Visit our store or contact us for personalized recommendations.'
      }
    ]
  },
  {
    category: 'Shipping',
    icon: <Truck className="h-5 w-5" />,
    questions: [
      {
        question: 'What are your shipping options?',
        answer: 'We offer Standard Shipping (5-7 days, free on orders over ₹5,000), Express Shipping (2-3 days, ₹299), and Same Day Delivery (Mumbai only, ₹499).'
      },
      {
        question: 'Do you ship nationwide?',
        answer: 'Yes, we ship to all major cities in India including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and many more. Remote areas may have additional charges.'
      },
      {
        question: 'How can I track my order?',
        answer: 'You can track your order using the order ID on our shipping page. We also send tracking information via SMS and email once your order is shipped.'
      },
      {
        question: 'What if my package is damaged?',
        answer: 'If your package arrives damaged, please refuse delivery and contact us immediately. We will arrange for a replacement at no extra cost.'
      }
    ]
  },
  {
    category: 'Returns',
    icon: <RotateCcw className="h-5 w-5" />,
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return window for most products. Items must be in original packaging with all accessories and show no signs of physical damage.'
      },
      {
        question: 'How do I return a product?',
        answer: 'Submit a return request through our returns page with your order ID and reason for return. We will review and approve within 24 hours, then provide return instructions.'
      },
      {
        question: 'Are there any return charges?',
        answer: 'Return shipping charges depend on the reason for return. We cover shipping costs for defective or wrong items. Customer preference returns may incur shipping charges.'
      },
      {
        question: 'How long does it take to process a refund?',
        answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned items. The refund will be credited to your original payment method.'
      }
    ]
  },
  {
    category: 'Warranty',
    icon: <Shield className="h-5 w-5" />,
    questions: [
      {
        question: 'What warranty do you offer?',
        answer: 'All products come with manufacturer warranty (1-5 years depending on the product). We also provide 1-year assembly warranty and 6 months of free software support.'
      },
      {
        question: 'How do I claim warranty?',
        answer: 'Contact us with your order details and description of the issue. We may require photos or videos. We will respond within 24 hours and arrange for repair, replacement, or refund.'
      },
      {
        question: 'What is covered under warranty?',
        answer: 'Warranty covers manufacturing defects, hardware failures, compatibility issues, and shipping damage. It does not cover physical damage from misuse, water damage, or overclocking damage.'
      },
      {
        question: 'Do you provide warranty for custom builds?',
        answer: 'Yes, we provide 1-year warranty on the entire assembly and individual component warranties as per manufacturer terms. We also offer lifetime technical support for our builds.'
      }
    ]
  },
  {
    category: 'Payment',
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery (for select areas). We also accept EMI options through various banks.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use industry-standard encryption and secure payment gateways to protect your payment information. We never store your card details on our servers.'
      },
      {
        question: 'Do you offer EMI options?',
        answer: 'Yes, we offer EMI options through various banks and financial institutions. EMI availability depends on your bank and the purchase amount.'
      },
      {
        question: 'Can I pay in installments?',
        answer: 'Yes, we offer flexible payment options including EMI and installment plans. Contact us to discuss the best payment option for your purchase.'
      }
    ]
  },
  {
    category: 'PC Building',
    icon: <Wrench className="h-5 w-5" />,
    questions: [
      {
        question: 'Do you build custom PCs?',
        answer: 'Yes, we specialize in custom PC building. You can use our PC Builder tool online or visit our store for personalized consultation and assembly.'
      },
      {
        question: 'How long does PC assembly take?',
        answer: 'Standard PC assembly takes 2-3 business days. Rush assembly is available for an additional fee and can be completed within 24 hours.'
      },
      {
        question: 'Do you test the PC before delivery?',
        answer: 'Yes, we thoroughly test all custom builds including stress testing, temperature monitoring, and performance benchmarks before delivery.'
      },
      {
        question: 'Can you help with PC upgrades?',
        answer: 'Absolutely! We can help upgrade your existing PC with new components. We also offer compatibility checking and optimization services.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const [selectedCategory, setSelectedCategory] = useState('All')

  const toggleExpanded = (category: string, questionIndex: number) => {
    const key = `${category}-${questionIndex}`
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const filteredFAQs = faqData.filter(category => 
    selectedCategory === 'All' || category.category === selectedCategory
  ).map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  const categories = ['All', ...faqData.map(cat => cat.category)]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-r from-primary/5 to-accent">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
              <p className="text-muted-foreground">
                Find answers to common questions about our products and services
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No FAQs found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or browse all categories.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredFAQs.map((category) => (
                    <Card key={category.category}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {category.icon}
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {category.questions.map((faq, index) => {
                          const isExpanded = expandedItems[`${category.category}-${index}`]
                          return (
                            <div key={index} className="border-b border-muted last:border-b-0 pb-4 last:pb-0">
                              <button
                                onClick={() => toggleExpanded(category.category, index)}
                                className="w-full text-left flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors"
                              >
                                <h3 className="font-medium pr-4">{faq.question}</h3>
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                )}
                              </button>
                              {isExpanded && (
                                <div className="mt-2 p-2 text-muted-foreground">
                                  {faq.answer}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Still have questions?</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Can't find what you're looking for? Our support team is here to help!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Search className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Search Help</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Try different keywords or browse all categories
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <HelpCircle className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Contact Support</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Phone: +91 7977186317<br />
                        Email: support@itkhzana.com
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Visit Store</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Get personalized help from our experts
                      </p>
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
