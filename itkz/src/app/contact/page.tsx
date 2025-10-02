import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'
import { ContactMap } from '@/components/contact/contact-map'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-r from-primary/5 to-accent">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
              <p className="text-muted-foreground">
                Get in touch with our team for any questions or support
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <ContactInfo />
                <ContactMap />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
